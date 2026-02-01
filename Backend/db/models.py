from sqlmodel import SQLModel
import uuid
from typing import List
from sqlmodel import Field,Column,Relationship,ARRAY,VARCHAR
import sqlalchemy.dialects.postgresql as pg
from datetime import datetime


class UserProduct(SQLModel,table=True):
    __tablename__ = 'user_products'

    user_id: uuid.UUID = Field(

        foreign_key='users.uid',
        primary_key=True
    )

    product_id: uuid.UUID = Field(
        foreign_key='product.pid',
        primary_key=True
    )
    quantity: int = Field(default=1)
    price_at_time: int
    created_at: datetime = Field(default_factory=datetime.utcnow)


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
    products: List['Product'] = Relationship(
        back_populates='users',
        link_model=UserProduct
    )


class Product(SQLModel,table=True):
    __tablename__ = 'product'
    name: str = Field(nullable=False)
    category: str = Field(nullable=False)
    brand: str | None = Field(default=None,nullable=True)
    pid: uuid.UUID = Field(
        sa_column = Column(
        pg.UUID,
        nullable=False,
        primary_key=True,
        default=uuid.uuid4,
        )
    )
    quantity: int = Field(nullable=False)
    daily_price: int | None
    weekly_price: int | None
    monthly_price: int | None
    vid: uuid.UUID = Field(nullable=False,foreign_key='users.uid')
    imageUrl: List[str] = Field(
        sa_column=Column(
            ARRAY(VARCHAR),
            nullable=False
        )
    )
    users: List[User] = Relationship(
        back_populates="products",
        link_model=UserProduct
    )