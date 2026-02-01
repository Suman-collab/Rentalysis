from pydantic import BaseModel, Field
from uuid import UUID
from typing import Optional
from datetime import datetime


class InvoiceBase(BaseModel):
    order_id: UUID
    payment_method: str = Field(..., description="UPI / Card / NetBanking")
    tax_amount: float = Field(default=0.0, ge=0)
    payment_status: str = Field(default="paid")



class CreateInvoice(InvoiceBase):
    pass

class UpdateInvoice(BaseModel):
    payment_method: Optional[str] = None
    payment_status: Optional[str] = None
    tax_amount: Optional[float] = None

    class Config:
        extra = "forbid"



class InvoiceRead(BaseModel):
    invoice_id: UUID
    order_id: UUID
    user_id: UUID

    subtotal_amount: float
    discount_amount: float
    tax_amount: float
    final_amount: float

    payment_method: str
    payment_status: str
    issued_at: datetime

    class Config:
        from_attributes = True
