from pydantic import BaseModel, EmailStr, Field,model_validator
from typing import List
import uuid
from datetime import datetime

class CreateUser(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    mobile_no: str = Field(min_length=10,max_length=15)
    password: str
    confirm_password: str

    @model_validator(mode='before')
    def passwords_match(cls, values):
        pw = values.get('password')
        cpw = values.get('confirm_password')
        if pw != cpw:
            raise ValueError('Password and Confirm Password do not match')
        return values


class CustomerModel(BaseModel):
    uid: uuid.UUID
    email: EmailStr
    first_name: str 
    last_name: str 
    mobile_no: str 
    gstin: str | None
    is_verified: bool 
    created_at: datetime 


class LoginUser(BaseModel):
    email: EmailStr
    password: str

class CreateVendor(CreateUser):
    gstin: str 

class PasswordResetConfirmModel(BaseModel):
    new_password: str
    confirm_password: str

class EmailModel(BaseModel):
    addresses: List[str]



class PasswordResetRequestModel(BaseModel):
    email: str