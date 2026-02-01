from fastapi import Request,status,Depends
from fastapi.security import HTTPBearer
from fastapi.security.http import HTTPAuthorizationCredentials
from .utils import decode_token
from fastapi.exceptions import HTTPException
from db.main import get_session
from sqlmodel.ext.asyncio.session  import AsyncSession
from .service import AuthService
from typing import List
from db.models import User
from db.redis_db import add_jti_to_blocklist,token_in_blocklist
from utils.errors import (
    InvalidToken,
    RefreshTokenRequired,
    AccessTokenRequired,
    InSufficientPermission,
    AccountNotVerified,
    UserNotFound
)


auth_service = AuthService()






class TokenBearer(HTTPBearer):
    
    def __init__(self,auto_error = True):
        super().__init__(auto_error=auto_error)


    async def __call__(self, request: Request) -> HTTPAuthorizationCredentials | None:
        creds = await super().__call__(request)

        token = creds.credentials

        token_data = decode_token(token)


        if not self.token_valid(token):
            raise InvalidToken()
        
        if await token_in_blocklist(token_data['jti']):
            raise InvalidToken()
        
        self.verify_token_data(token_data)
        return token_data
    
    def token_valid(self,token: str):
        return decode_token(token) is not None
    

    def verify_token_data(self,token_data):
        raise NotImplementedError('Please override this method inside classes')


class AccessTokenBearer(TokenBearer):
    def verify_token_data(self,token_data: dict):
        if token_data and token_data['refresh']:
            raise AccessTokenRequired()
    



class RefreshTokenBearer(TokenBearer):
    def verify_token_data(self,token_data: dict):
        if token_data and not token_data['refresh']:
            raise RefreshTokenRequired()


async def get_current_user(
    token_detiails: dict = Depends(AccessTokenBearer()),
    session: AsyncSession = Depends(get_session)
):
    user_email = token_detiails['user']['email']
    user = await auth_service.get_user_by_email(user_email,session)
    if user:
        return user
    
    raise UserNotFound()

class RoleChecker:
    def __init__(self,allowed_roless: List[str]) -> None:
        self.allowed_roles = allowed_roless
    
    def __call__(self,curr_user: User = Depends(get_current_user)):

        if not curr_user.is_verified:
            raise AccountNotVerified()
        if curr_user.role in self.allowed_roles:
            return True
        raise InSufficientPermission()








        


