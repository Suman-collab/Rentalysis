from sqlmodel import SQLModel, Field
from typing import List, Optional
from uuid import UUID
from datetime import datetime


class OrderProductBase(SQLModel):
    product_id: UUID
    quantity: int = 1
    price_at_time: float


class OrderProductCreate(OrderProductBase):
    pass


class OrderProductRead(OrderProductBase):
    created_at: datetime


class CreateOrder(SQLModel):
    coupon_code: Optional[str] = None
    status: str = "pending"
    total_amount: float
    discount_amount: float = 0.0
    final_amount: float
    products: List[OrderProductCreate]


class UpdateOrder(SQLModel):
    coupon_code: Optional[str] = None
    status: Optional[str] = None
    total_amount: Optional[float] = None
    discount_amount: Optional[float] = None
    final_amount: Optional[float] = None
    # optional: update products? usually separate endpoint handles product updates
    # products: Optional[List[OrderProductCreate]] = None


class OrderRead(SQLModel):
    oid: UUID
    user_id: UUID
    coupon_code: Optional[str] = None
    status: str
    total_amount: float
    discount_amount: float
    final_amount: float
    created_at: datetime
    updated_at: datetime
    products: List[OrderProductRead] = []

