from pydantic import BaseModel
from typing import List
from fastapi import UploadFile,Form


class CreateProduct(BaseModel):
    name: str 
    category: str
    brand: str
    quantity: int
    daily_price: int | None
    weekly_price: int | None
    monthly_price: int | None
    image_urls: List[str] 


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






