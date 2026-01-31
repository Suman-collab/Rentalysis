from sqlmodel import SQLModel
import uuid
from sqlmodel import Field,Column
import sqlalchemy.dialects.postgresql as pg
from datetime import datetime

class User(SQLModel,table=True):
    __tablename__ = 'users'
    uid: uuid.UUID = Field(
        sa_column = Column(
        pg.UUID,
        nullable=False,
        primary_key=True,
        default=uuid.uuid4
    )
    )
    email: str
    first_name: str = Field(nullable=False)
    last_name: str = Field(nullable=False)
    mobile_no: str = Field(nullable=False)
    password: str = Field(exclude=True)
    gstin: str | None = Field(default=None, nullable=True)    
    is_verified: bool = Field(default=False)
    created_at: datetime = Field(
        sa_column=Column(
            pg.TIMESTAMP,
            nullable=False,
            default=datetime.now()
        )
    )
    updated_at: datetime = Field(
        sa_column=Column(
            pg.TIMESTAMP,
            nullable=False,
            default=datetime.now()
        ) 
    )
    role: str = Field(
        sa_column = Column(
            pg.VARCHAR,
            nullable = False,
            default = 'customer'
        )
    )