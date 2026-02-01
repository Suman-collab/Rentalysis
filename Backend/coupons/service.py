from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import select, delete
from typing import Sequence, Optional
from uuid import UUID
from datetime import datetime

from db.models import Coupon, User
from .schema import CreateCoupon, UpdateCoupon
from utils.errors import CouponNotFound


class CouponService:
    
    # Create a new coupon (admin only)
    async def create_coupon(
        self,
        admin_user: User,
        coupon_data: CreateCoupon,
        session: AsyncSession
    ) -> Coupon:
        # Check if user is admin
        # if admin_user.role != "admin":
        #     raise UnauthorizedAction("Only admins can create coupons")

        new_coupon = Coupon(
            code=coupon_data.code,
            description=coupon_data.description,
            discount_percentage=coupon_data.discount_percentage,
            max_discount_amount=coupon_data.max_discount_amount,
            valid_from=coupon_data.valid_from or datetime.utcnow(),
            valid_to=coupon_data.valid_to,
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow()
        )
        session.add(new_coupon)
        await session.commit()
        await session.refresh(new_coupon)
        return new_coupon

    # Get all coupons with pagination
    async def get_coupons(
        self,
        session: AsyncSession,
        offset: int = 0,
        limit: int = 10
    ) -> Sequence[Coupon]:
        query = select(Coupon).offset(offset).limit(limit)
        result = await session.exec(query)
        return result.all()

    # Get a coupon by code
    async def get_coupon_by_code(
        self,
        code: str,
        session: AsyncSession
    ) -> Coupon:
        query = select(Coupon).where(Coupon.code == code)
        result = await session.exec(query)
        coupon = result.first()
        if not coupon:
            raise CouponNotFound(f"Coupon with code '{code}' not found")
        return coupon

    # Update a coupon (admin only)
    async def update_coupon(
        self,
        admin_user: User,
        code: str,
        coupon_data: UpdateCoupon,
        session: AsyncSession
    ) -> Coupon:
        if admin_user.role != "admin":
            raise UnauthorizedAction("Only admins can update coupons")

        coupon = await self.get_coupon_by_code(code, session)

        for field, value in coupon_data.model_dump(exclude_unset=True).items():
            setattr(coupon, field, value)
        coupon.updated_at = datetime.utcnow()

        session.add(coupon)
        await session.commit()
        await session.refresh(coupon)
        return coupon

    # Delete a coupon (admin only)
    async def delete_coupon(
        self,
        admin_user: User,
        code: str,
        session: AsyncSession
    ) -> bool:
        if admin_user.role != "admin":
            raise UnauthorizedAction("Only admins can delete coupons")

        query = delete(Coupon).where(Coupon.code == code)
        result = await session.exec(query)
        await session.commit()
        return True if result.rowcount > 0 else False
