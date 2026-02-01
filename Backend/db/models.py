from sqlmodel import SQLModel
import uuid
from typing import List
from sqlmodel import Field,Column,Relationship,ARRAY,VARCHAR
from typing import Optional
import sqlalchemy.dialects.postgresql as pg
from datetime import datetime

class Coupon(SQLModel, table=True):
    __tablename__ = "coupons"
    code: str = Field(
        sa_column=Column(pg.VARCHAR, primary_key=True, nullable=False)
    )
    description: Optional[str] = Field(default=None)
    discount_percentage: Optional[float] = Field(default=0.0)
    max_discount_amount: Optional[float] = Field(default=None)
    valid_from: datetime = Field(default_factory=datetime.utcnow)
    valid_to: datetime
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    orders: list["Order"] = Relationship(back_populates="coupon")


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
    orders: List[Order] = Relationship(back_populates="user")
    invoices: List["Invoice"] = Relationship()


class OrderProduct(SQLModel, table=True):
    __tablename__ = "order_products"
    order_id: uuid.UUID = Field(
        foreign_key="orders.oid", primary_key=True
    )
    product_id: uuid.UUID = Field(
        foreign_key="product.pid", primary_key=True
    )
    quantity: int = Field(default=1)
    price_at_time: int = Field(nullable=False)
    created_at: datetime = Field(default_factory=datetime.utcnow)


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
            nullable=False,
            default=list
        )
    )
    users: List[User] = Relationship(
        back_populates="products",
        link_model=UserProduct
    )
    orders: List[Order] = Relationship(
        back_populates="products",
        link_model=OrderProduct
    )



class Order(SQLModel,table=True):
    __tablename__ = "orders"
    oid: uuid.UUID = Field(
        sa_column = Column(
        pg.UUID,
        nullable=False,
        primary_key=True,
        default=uuid.uuid4,
        )
    )
    user_id: uuid.UUID = Field(foreign_key="users.uid", nullable=False)
    coupon_code: Optional[str] = Field(foreign_key="coupons.code", default=None)
    status: str = Field(default="pending") 
    total_amount: float = Field(default=0.0)
    discount_amount: float = Field(default=0.0)
    final_amount: float = Field(default=0.0)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    products: List["Product"] = Relationship(
        back_populates="orders",
        link_model=OrderProduct
    )
    user: "User" = Relationship(back_populates="orders")
    coupon: Optional["Coupon"] = Relationship(back_populates="orders")
    invoice: Optional["Invoice"] = Relationship()



class Invoice(SQLModel, table=True):
    __tablename__ = "invoices"

    invoice_id: uuid.UUID = Field(
        sa_column=Column(
            pg.UUID,
            nullable=False,
            primary_key=True,
            default=uuid.uuid4
        )
    )

    order_id: uuid.UUID = Field(
        foreign_key="orders.oid",
        nullable=False,
        unique=True   # IMPORTANT: one invoice per order
    )

    user_id: uuid.UUID = Field(
        foreign_key="users.uid",
        nullable=False
    )

    subtotal_amount: float = Field(nullable=False)
    discount_amount: float = Field(default=0.0)
    tax_amount: float = Field(default=0.0)
    final_amount: float = Field(nullable=False)

    payment_method: str = Field(nullable=False)  # UPI / Card / NetBanking
    payment_status: str = Field(default="paid") # paid / refunded

    issued_at: datetime = Field(default_factory=datetime.utcnow)

    # Relationships
    order: "Order" = Relationship()
    user: "User" = Relationship()
