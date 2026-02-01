from fastapi import APIRouter

from fastapi import APIRouter, Depends, status, Query
from fastapi.responses import JSONResponse
from sqlmodel.ext.asyncio.session import AsyncSession
from typing import List, Optional
from datetime import datetime

from db.main import get_session
from .service import CouponService
from .schema import CreateCoupon, UpdateCoupon, CouponRead
from auth.dependencies import RoleChecker, AccessTokenBearer, get_current_user
from utils.errors import CouponNotFound

# Role checkers
admin_role_checker = RoleChecker(["admin"])

access_token_bearer = AccessTokenBearer()
coupon_service = CouponService()

coupon_router = APIRouter()


# Get all coupons with pagination
@coupon_router.get("/all", response_model=List[CouponRead])
async def get_all_coupons(
    limit: int = Query(10, ge=1, le=50),
    offset: int = Query(0, ge=0),
    session: AsyncSession = Depends(get_session)
):
    coupons = await coupon_service.get_coupons(session=session, limit=limit, offset=offset)
    return coupons


# Get coupon by code
@coupon_router.get("/{code}", response_model=CouponRead)
async def get_coupon_by_code(
    code: str,
    session: AsyncSession = Depends(get_session)
):
    coupon = await coupon_service.get_coupon_by_code(code=code, session=session)
    return coupon


# Create a new coupon (admin only)
@coupon_router.post("/add", response_model=CouponRead, status_code=status.HTTP_201_CREATED)
async def add_coupon(
    coupon: CreateCoupon,
    session: AsyncSession = Depends(get_session),
    current_user=Depends(get_current_user)
):
    new_coupon = await coupon_service.create_coupon(
        admin_user=current_user,
        coupon_data=coupon,
        session=session
    )
    return new_coupon


# Update a coupon (admin only)
@coupon_router.patch("/{code}", response_model=CouponRead)
async def update_coupon(
    code: str,
    updated_coupon: UpdateCoupon,
    session: AsyncSession = Depends(get_session),
    current_user=Depends(get_current_user)
):
    coupon = await coupon_service.update_coupon(
        admin_user=current_user,
        code=code,
        coupon_data=updated_coupon,
        session=session
    )
    return coupon


# Delete a coupon (admin only)
@coupon_router.delete("/{code}")
async def delete_coupon(
    code: str,
    session: AsyncSession = Depends(get_session),
    current_user=Depends(get_current_user)
):
    result = await coupon_service.delete_coupon(
        admin_user=current_user,
        code=code,
        session=session
    )
    if result:
        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content={"message": "Coupon deleted successfully"}
        )
    raise CouponNotFound(f"Coupon with code '{code}' not found")
