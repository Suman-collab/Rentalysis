from pydantic import BaseModel
from typing import List
from fastapi import UploadFile,Form


class CreateProduct(BaseModel):
    name: str = Form(...)
    category: str = Form(...)
    brand: str= Form(...)
    quantity: int= Form(...)
    daily_price: int | None= Form(...)
    weekly_price: int | None= Form(...)
    monthly_price: int | None= Form(...)


class Updateproduct(BaseModel):
    category: str
    brand: str
    quantity: int
    daily_price: int | None
    weekly_price: int | None
    monthly_price: int | None
    images: List[UploadFile]

class ProductModel(CreateProduct):
    pass






