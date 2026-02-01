from fastapi import APIRouter



order_router = APIRouter()


from fastapi import APIRouter, Depends, status, Query
from fastapi.responses import JSONResponse
from sqlmodel.ext.asyncio.session import AsyncSession
from typing import List, Optional
from uuid import UUID
from datetime import datetime

from db.main import get_session
from .service import OrderService
from .schema import CreateOrder, UpdateOrder, OrderRead
from auth.dependencies import RoleChecker, AccessTokenBearer, get_current_user
from utils.errors import OrderNotFound

# Role checkers
vendor_role_checker = RoleChecker(['vendor'])
role_checker = RoleChecker(['vendor', 'admin'])

access_token_bearer = AccessTokenBearer()
order_service = OrderService()

order_router = APIRouter()


@order_router.get('/all', response_model=List[OrderRead])
async def get_all_orders(
    limit: int = Query(10, ge=1, le=50),
    offset: int = Query(0, ge=0),
    session: AsyncSession = Depends(get_session)
):
    orders = await order_service.get_orders(session=session, limit=limit, offset=offset)
    return orders


@order_router.get('/{oid}', response_model=OrderRead)
async def get_order_by_id(
    oid: str,
    session: AsyncSession = Depends(get_session)
):
    order = await order_service.get_order_by_id(oid, session)
    return order


@order_router.get('/user/{user_id}', response_model=List[OrderRead])
async def get_orders_by_user(
    user_id: str,
    session: AsyncSession = Depends(get_session)
):
    orders = await order_service.get_orders_by_user(user_id=user_id, session=session)
    return orders


@order_router.post('/add', response_model=OrderRead, status_code=status.HTTP_201_CREATED)
async def add_order(
    order: CreateOrder,
    session: AsyncSession = Depends(get_session),
    user_details = Depends(get_current_user)
):
    new_order = await order_service.add_order(user_details.uid, order, session=session)
    return new_order


# Update an order
@order_router.patch('/{oid}', response_model=OrderRead)
async def update_order(
    oid: str,
    updated_order: UpdateOrder,
    session: AsyncSession = Depends(get_session)
):
    order = await order_service.update_order(oid, updated_order, session)
    return order


# Delete an order
@order_router.delete('/{oid}')
async def delete_order(
    oid: str,
    session: AsyncSession = Depends(get_session)
):
    result = await order_service.delete_order(oid, session)
    if result:
        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content={"message": "Order deleted successfully"}
        )
    raise OrderNotFound()


# Filter orders (status, amount, date)
@order_router.get('/filter', response_model=List[OrderRead])
async def filter_orders(
    status: Optional[str] = Query(None),
    min_amount: Optional[float] = Query(None),
    max_amount: Optional[float] = Query(None),
    start_date: Optional[datetime] = Query(None),
    end_date: Optional[datetime] = Query(None),
    limit: int = Query(10, ge=1, le=50),
    offset: int = Query(0, ge=0),
    session: AsyncSession = Depends(get_session)
):
    orders = await order_service.get_orders_filtered(
        session=session,
        status=status,
        min_amount=min_amount,
        max_amount=max_amount,
        start_date=start_date,
        end_date=end_date,
        limit=limit,
        offset=offset
    )
    return orders
