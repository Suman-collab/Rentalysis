from fastapi import APIRouter,Depends
from sqlmodel.ext.asyncio.session import AsyncSession
from db.main import get_session
from auth.schemas import CreateUser,LoginUser,EmailModel,PasswordResetConfirmModel,PasswordResetRequestModel,CustomerModel
from auth.service import AuthService
from .dependencies import RoleChecker,AccessTokenBearer,RefreshTokenBearer,get_current_user
from .utils import create_url_safe_token
from utils.Config import get_config
from utils.celery_tasks import send_email
from pathlib import Path
from templates.Verification_Template import verification_template
from utils.errors import UserNotFound,InvalidCredentials,InvalidToken
from fastapi.responses import JSONResponse
from fastapi import status
from auth.utils import decode_url_safe_token
from db.redis_db import add_jti_to_blocklist
from utils.errors import UserAlreadyExists
from .utils import verify_password,create_access_token,create_url_safe_token,generate_pass_hash
from datetime import timedelta
from fastapi.exceptions import HTTPException
from datetime import datetime

auth_router = APIRouter()

auth_service = AuthService()

REFRESH_TOKEN_EXPIRY  = 7

admin_role_checker = RoleChecker(['admin'])
vendor_role_checker = RoleChecker(['vendor'])
user_role_checker = RoleChecker(['user'])
role_checker = RoleChecker(['admin','vendor','user'])

config = get_config()

@auth_router.post('/send_mail')
async def send_mail(
    emails: EmailModel,
):
    emails = emails.addresses
    html = '<h1>Welcome to the app</h1>'

    subject = 'Welcome to Bookly'


    send_email.delay(emails,subject,html)
    return {
        'message' : 'Email sent sucessfully'
    }

    


@auth_router.post(
        '/customer/signup',
        status_code = status.HTTP_201_CREATED
)
async def create_customer_account(
    user_data: CreateUser,
    session: AsyncSession = Depends(get_session)
):
    email = user_data.email
    

    user_exists = await auth_service.user_exists(email,session)

    if user_exists:
        raise  UserAlreadyExists()
    
    new_user = await auth_service.create_customer(user_data,session)

    token = create_url_safe_token({
        "email" : email
    })

    link = f"http://{config.DOMAIN}/auth/verfiy/{token}"
    html_message = f"""
        <h1> Verify your Email</h1>
        <p>Please click this <a href="{link}">link</a> to verify your email</p>

    """
    subject = 'Verify your email'
    send_email.delay([email],subject,html_message)


    return {
        'message' : 'Account Created! Check email to verify your account',
        'user' : new_user
    }

@auth_router.post(
        '/vendor/signup',
        status_code = status.HTTP_201_CREATED
)
async def create_vendor_account(
    user_data: CreateUser,
    session: AsyncSession = Depends(get_session)
):
    email = user_data.email
    

    user_exists = await auth_service.user_exists(email,session)

    if user_exists:
        raise  UserAlreadyExists()
    
    new_user = await auth_service.create_vendor(user_data,session)

    token = create_url_safe_token({
        "email" : email
    })

    link = f"http://{config.DOMAIN}/auth/verfiy/{token}"
    html_message = f"""
        <h1> Verify your Email</h1>
        <p>Please click this <a href="{link}">link</a> to verify your email</p>

    """
    subject = 'Verify your email'
    send_email.delay([email],subject,html_message)


    return {
        'message' : 'Account Created! Check email to verify your account',
        'user' : new_user
    }

@auth_router.post('/login')
async def login_users(
    login_data: LoginUser,
    session: AsyncSession = Depends(get_session)
):
    email = login_data.email
    password = login_data.password
    user = await auth_service.get_user_by_email(email,session)

    if user is not None:
        password_valid = verify_password(password,user.password)

        if password_valid:
            access_token = create_access_token(
                user_data={
                    'email' : user.email,
                    'uid' : str(user.uid),
                    'role' : user.role
                }
            )
            refresh_token = create_access_token(
                user_data={
                    'email' : user.email,
                    'uid' : str(user.uid)
                },
                refresh=True,
                expiry=timedelta(days=REFRESH_TOKEN_EXPIRY)
            )
            
            response = JSONResponse(
                status_code=status.HTTP_200_OK,
                content={
                    'message' : 'Login Sucessfull',
                    'access_token' : access_token,
                    'refresh_token' : refresh_token,
                    'user' : {
                        'email' : user.email,
                        'uid' : str(user.uid)
                    }
                }
            )
            response.set_cookie(
                key='access_token',
                value=access_token,
                httponly=True,
                samesite='lax',
                max_age=60*60
            )
            response.set_cookie(
                key='refres_token',
                value=refresh_token,
                httponly=True,
                samesite='lax',
                max_age=60 * 60 * 24 * REFRESH_TOKEN_EXPIRY
            )
            return response

            
            
        

    raise InvalidCredentials()



@auth_router.post('/password_reset_confirm/{token}')
async def reset_account_password(
    token: str,
    password: PasswordResetConfirmModel,
    session: AsyncSession = Depends(get_session)
):
    if password.new_password != password.confirm_password:
        raise HTTPException(
            detail='Passwords do not match',
            status_code=status.HTTP_400_BAD_REQUEST
        )
    new_password_hash = generate_pass_hash(password.new_password)
    token_data = decode_url_safe_token(token)
    user_email = token_data['email']

    if user_email:
        user = await auth_service.get_user_by_email(user_email,session)

        if not user:
            raise UserNotFound()
        


        await auth_service.update_user(user,{'password' : new_password_hash},session)

        return JSONResponse(
            content={
                'message' : 'Password reset sucessfully'
            
            },
            status_code=status.HTTP_200_OK
        )
    

    return JSONResponse(
        content={
            'message' : 'Error occured during verification'
        },
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR
    )


@auth_router.get('/refresh_token')
async def get_new_access_token(
    token_details: dict = Depends(RefreshTokenBearer())
):
    
    expiry_timestamp = token_details['exp']

    if datetime.fromtimestamp(expiry_timestamp) > datetime.now():
        new_access_token = create_access_token(
            user_data=token_details['user'],
            refresh=False
        )
        return JSONResponse(
            content={
                'access_token' : new_access_token
            }
        )
    raise InvalidToken()


@auth_router.get('/me',response_model = CustomerModel)
async def get_current_user_det(
    user = Depends(get_current_user)
):
    return user


@auth_router.get('/logout')
async def revoke_token(
    token_details: dict = Depends(AccessTokenBearer()),
    _ : bool = Depends(role_checker)
):
    jti = token_details['jti']
    await add_jti_to_blocklist(jti)

    return JSONResponse(
        content={
            'msg' : 'Logged Out Sucessfully'
        },
        status_code=status.HTTP_200_OK
    )

@auth_router.get('/verfiy/{token}')
async def verify_user_account(
    token: str,
    session: AsyncSession = Depends(get_session)
):
    token_data = decode_url_safe_token(token)
    user_email = token_data['email']

    if user_email:
        user = await auth_service.get_user_by_email(user_email,session)

        if not user:
            raise UserNotFound()
        

        await auth_service.update_user(user,{'is_verified' : True},session)

        return JSONResponse(
            content={
                'message' : 'Account verified sucessfully'
            
            },
            status_code=status.HTTP_200_OK
        )
    

    return JSONResponse(
        content={
            'message' : 'Error occured during verification'
        },
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR
    )

@auth_router.post('/password_reset')
async def password_reset_request(
    email_data: PasswordResetRequestModel
):
    email = email_data.email


    token = create_url_safe_token({
        "email" : email
    })

    link = f"http://{config.DOMAIN}/auth/password_reset_confirm/{token}"
    html_message = f"""
        <h1> Reset your password</h1>
        <p>Please click this <a href="{link}">link</a> to Reset your password</p>

    """
    subject = 'Reset your password'
    send_email.delay([email],subject,html_message)


    return JSONResponse(
        status_code=status.HTTP_200_OK,
        content= {
            'message' : 'Please check you email for instructions to reset your password'
        }

    )



@auth_router.delete('/remove_customer')
async def remove_customer(
    email: str,
    session: AsyncSession = Depends(get_session),
    _: bool = Depends(admin_role_checker)
):
    remove_user = await auth_service.remove_customer_by_email(email,session)

    if remove_user:
        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content={
                'message' : 'User removed sucessfully'
            }
        )
    return UserNotFound()



@auth_router.delete('/remove_vendor')
async def remove_user(
    email: str,
    session: AsyncSession = Depends(get_session),
    _: bool = Depends(admin_role_checker)
):
    remove_user = await auth_service.remove_customer_by_email(email,session)

    if remove_user:
        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content={
                'message' : 'User removed sucessfully'
            }
        )
    return UserNotFound()

    
    
@auth_router.get('/customers')
async def get_all_users(
    session: AsyncSession = Depends(get_session),
    _: bool = Depends(admin_role_checker)
):
    users = await auth_service.get_all_customers(session)

    return users