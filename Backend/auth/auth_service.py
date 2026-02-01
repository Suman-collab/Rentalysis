from .schemas import CreateUser, LoginUser
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession
from db.models import User
from fastapi.exceptions import HTTPException
from fastapi import status
from utils.password_hash import HashPassword
from sqlalchemy.ext.

hash_password = HashPassword()

class AuthService:
    async def create_user(
        self,
        user: CreateUser,
        session: Asy
    )
