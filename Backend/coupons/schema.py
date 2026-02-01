from sqlmodel import SQLModel
from datetime import datetime
from typing import Optional

class CreateCoupon(SQLModel):
    code: str
    description: Optional[str] = None
    discount_percentage: float = 0.0
    max_discount_amount: Optional[float] = None
    valid_from: Optional[datetime] = None
    valid_to: datetime

class UpdateCoupon(SQLModel):
    description: Optional[str] = None
    discount_percentage: Optional[float] = None
    max_discount_amount: Optional[float] = None
    valid_from: Optional[datetime] = None
    valid_to: Optional[datetime] = None

class CouponRead(SQLModel):
    code: str
    description: Optional[str]
    discount_percentage: float
    max_discount_amount: Optional[float]
    valid_from: datetime
    valid_to: datetime
    created_at: datetime
    updated_at: datetime