from passlib.context import CryptContext
from datetime import timedelta, datetime
from uuid import uuid4
import logging
from itsdangerous import URLSafeTimedSerializer, BadSignature, SignatureExpired
from utils.Config import get_config
import jwt
ACCESS_TOKEN_EXPIRY = 3600




config = get_config()

password_context = CryptContext(schemes=["argon2"], deprecated="auto")

serializer = URLSafeTimedSerializer(config.JWT_SECRET_KEY)



def generate_pass_hash(password: str) -> str:
    return password_context.hash(password)


def verify_password(password: str, hashed_password: str) -> bool:
    return password_context.verify(password, hashed_password)


def create_access_token(
        user_data: dict,
        expiry: timedelta = timedelta(seconds=ACCESS_TOKEN_EXPIRY),
        refresh: bool = False
):
    payload = {}
    payload['user'] = user_data
    payload['exp'] = datetime.now() + expiry
    payload['jti'] = str(uuid4())

    payload['refresh' \
    ''] = refresh
    token = jwt.encode(
        payload= payload,
        key=config.JWT_SECRET_KEY,
        algorithm=config.JWT_ALGORITHM
    )
    return token


def decode_token(token: str) :
    try:
        token_data = jwt.decode(
        jwt=token,
        key=config.JWT_SECRET_KEY,
        algorithms=[config.JWT_ALGORITHM]
        )
        return token_data
    except jwt.PyJWTError as e:
        logging.exception(e)
        return None



# ---------------- URL SAFE TOKEN (EMAIL / VERIFY) ----------------

def create_url_safe_token(data: dict) -> str:
    return serializer.dumps(data, salt="email-configuration")


def decode_url_safe_token(token: str, max_age: int = 3600) -> dict | None:
    try:
        return serializer.loads(
            token,
            salt="email-configuration",
            max_age=max_age  # seconds
        )
    except SignatureExpired:
        logging.error("URL token expired")
    except BadSignature:
        logging.error("Invalid URL token")
    except Exception as e:
        logging.error(str(e))

    return None
