from sqlmodel.ext.asyncio.session import AsyncSession
from .schema import CreateProduct,Updateproduct
from db.models import Product
from uuid import UUID
from sqlmodel import select,delete,func
from typing import List,Optional, Sequence
class ProductService: 
    async def get_products(
        self,
        session: AsyncSession,
        offset: int,
        limit: int
    ):
        query = select(Product).offset(offset).limit(limit)
        result = await session.exec(query)

        return result.all()


    async def get_product_by_id(
        self,
        pid: str,
        session: AsyncSession
    ):
        pass

    async def get_products_by_vendor_id(
        self,
        vid: str,
        session: AsyncSession
    ):
        query = select(Product).where(Product.vid == vid)

        products = await session.exec(query)

        return products.all()

    async def get_products_by_category(
        self,
        category: str,
        limit: str,
        offset: str,
        session: AsyncSession
    ):
        query = select(Product).where(Product.category == category).offset(offset).limit(limit)

        result = await session.exec(query)

        return result.all()
    

    async def update_product(
        self,
        product: Updateproduct,
        session: AsyncSession
    ):
        pass

    async def delete_product(
        self,
        pid: str,
        session: AsyncSession
    ):
        query = delete(Product).where(Product.pid == pid)
        result = await session.exec(query)
        await session.commit()

        return True if result.rowcount > 0 else False
        

    async def get_user_rented_products(self):
        pass

    async def add_product(
        self,
        vid: str,
        product: CreateProduct,
        images: list[str],
        session: AsyncSession
    ):
        new_product = Product(**product.model_dump())
        new_product.vid = vid
        new_product.imageUrl = images

        session.add(new_product)
        await session.commit()
        await session.refresh(new_product)

        return new_product
    
    async def get_products_filtered(
        self,
        session: AsyncSession,
        name: Optional[str] = None,
        category: Optional[str] = None,
        brand: Optional[str] = None,
        min_daily_price: Optional[int] = None,
        max_daily_price: Optional[int] = None,
        in_stock: Optional[bool] = None,
        limit: int = 10,
        offset: int = 0,
    ) -> Sequence[Product]:
        stmt = select(Product)

        if name:
            stmt = stmt.where(func.lower(Product.name).contains(name.lower()))

        if category:
            stmt = stmt.where(Product.category == category)

        if brand:
            stmt = stmt.where(Product.brand == brand)


        if min_daily_price is not None:
            stmt = stmt.where(Product.daily_price >= min_daily_price)

        if max_daily_price is not None:
            stmt = stmt.where(Product.daily_price <= max_daily_price)

        if in_stock is not None:
            if in_stock:
                stmt = stmt.where(Product.quantity > 0)
            else:
                stmt = stmt.where(Product.quantity == 0)

        # 🔹 pagination
        stmt = stmt.offset(offset).limit(limit)

        result = await session.exec(stmt)
        return result.all()