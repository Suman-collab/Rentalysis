from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import select, delete, func
from typing import List, Optional, Sequence
from uuid import UUID
from datetime import datetime

from db.models import Order, OrderProduct, Product, User
from .schema import CreateOrder, UpdateOrder
from utils.errors import OrderNotFound


class OrderService:
    # Get all orders with pagination
    async def get_orders(
        self,
        session: AsyncSession,
        offset: int = 0,
        limit: int = 10
    ) -> Sequence[Order]:
        query = select(Order).offset(offset).limit(limit)
        result = await session.exec(query)
        return result.all()

    # Get order by ID
    async def get_order_by_id(
        self,
        oid: str,
        session: AsyncSession
    ) -> Order:
        query = select(Order).where(Order.oid == oid)
        result = await session.exec(query)
        order = result.first()
        if not order:
            raise OrderNotFound()
        return order

    # Get orders by user
    async def get_orders_by_user(
        self,
        user_id: str,
        session: AsyncSession
    ) -> Sequence[Order]:
        query = select(Order).where(Order.user_id == user_id)
        result = await session.exec(query)
        return result.all()

    # Add a new order
    async def add_order(
        self,
        user_id: str,
        order_data: CreateOrder,
        session: AsyncSession
    ) -> Order:
        new_order = Order(
            user_id=user_id,
            coupon_code=order_data.coupon_code,
            status=order_data.status,
            total_amount=order_data.total_amount,
            discount_amount=order_data.discount_amount,
            final_amount=order_data.final_amount,
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow()
        )
        session.add(new_order)
        await session.commit()
        await session.refresh(new_order)

        # Add linked products
        for p in order_data.products:
            order_product = OrderProduct(
                order_id=new_order.oid,
                product_id=p.product_id,
                quantity=p.quantity,
                price_at_time=p.price_at_time
            )
            session.add(order_product)
        await session.commit()
        return new_order

    # Update order
    async def update_order(
        self,
        oid: str,
        order_data: UpdateOrder,
        session: AsyncSession
    ) -> Order:
        order = await self.get_order_by_id(oid, session)

        for field, value in order_data.model_dump(exclude_unset=True).items():
            setattr(order, field, value)
        order.updated_at = datetime.utcnow()

        session.add(order)
        await session.commit()
        await session.refresh(order)
        return order

    # Delete order
    async def delete_order(
        self,
        oid: str,
        session: AsyncSession
    ) -> bool:
        query = delete(Order).where(Order.oid == oid)
        result = await session.exec(query)
        await session.commit()
        return True if result.rowcount > 0 else False

    # Get orders filtered by status, date, or amount
    async def get_orders_filtered(
        self,
        session: AsyncSession,
        status: Optional[str] = None,
        min_amount: Optional[float] = None,
        max_amount: Optional[float] = None,
        start_date: Optional[datetime] = None,
        end_date: Optional[datetime] = None,
        limit: int = 10,
        offset: int = 0,
    ) -> Sequence[Order]:
        stmt = select(Order)

        if status:
            stmt = stmt.where(Order.status == status)
        if min_amount is not None:
            stmt = stmt.where(Order.final_amount >= min_amount)
        if max_amount is not None:
            stmt = stmt.where(Order.final_amount <= max_amount)
        if start_date:
            stmt = stmt.where(Order.created_at >= start_date)
        if end_date:
            stmt = stmt.where(Order.created_at <= end_date)

        stmt = stmt.offset(offset).limit(limit)
        result = await session.exec(stmt)
        return result.all()