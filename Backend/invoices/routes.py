from fastapi import APIRouter, Depends, status
from fastapi.responses import JSONResponse
from sqlmodel.ext.asyncio.session import AsyncSession
from typing import List

from db.main import get_session
from auth.dependencies import get_current_user, RoleChecker
from db.models import User
from utils.errors import InvoiceNotFound

from .schema import CreateInvoice, UpdateInvoice, InvoiceRead
from .service import InvoiceService


invoice_router = APIRouter(
    prefix="/invoices",
    tags=["Invoices"]
)

invoice_service = InvoiceService()

admin_role_checker = RoleChecker(["admin"])
user_role_checker = RoleChecker(["user", "admin"])


# -------------------------
# Create Invoice (after order payment)
# -------------------------
@invoice_router.post(
    "/",
    response_model=InvoiceRead,
    status_code=status.HTTP_201_CREATED
)
async def create_invoice(
    invoice_data: CreateInvoice,
    session: AsyncSession = Depends(get_session),
    current_user: User = Depends(get_current_user),
    _: bool = Depends(user_role_checker)
):
    invoice = await invoice_service.create_invoice(
        user_id=current_user.uid,
        invoice_data=invoice_data,
        session=session
    )
    return invoice


# -------------------------
# Get Invoice by ID
# -------------------------
@invoice_router.get(
    "/{invoice_id}",
    response_model=InvoiceRead
)
async def get_invoice_by_id(
    invoice_id: str,
    session: AsyncSession = Depends(get_session),
    current_user: User = Depends(get_current_user),
    _: bool = Depends(user_role_checker)
):
    invoice = await invoice_service.get_invoice_by_id(
        invoice_id,
        session
    )

    # user can see only their invoice
    if invoice.user_id != current_user.uid and current_user.role != "admin":
        return JSONResponse(
            status_code=status.HTTP_403_FORBIDDEN,
            content={"message": "Access denied"}
        )

    return invoice


# -------------------------
# Get Invoices of Current User
# -------------------------
@invoice_router.get(
    "/",
    response_model=List[InvoiceRead]
)
async def get_my_invoices(
    session: AsyncSession = Depends(get_session),
    current_user: User = Depends(get_current_user),
    _: bool = Depends(user_role_checker)
):
    invoices = await invoice_service.get_invoices_by_user(
        current_user.uid,
        session
    )
    return invoices


# -------------------------
# Admin: Get All Invoices
# -------------------------
@invoice_router.get(
    "/admin/all",
    response_model=List[InvoiceRead]
)
async def get_all_invoices(
    session: AsyncSession = Depends(get_session),
    _: bool = Depends(admin_role_checker)
):
    return await invoice_service.get_all_invoices(session)


# -------------------------
# Update Invoice (admin only)
# -------------------------
@invoice_router.put(
    "/{invoice_id}",
    response_model=InvoiceRead
)
async def update_invoice(
    invoice_id: str,
    invoice_data: UpdateInvoice,
    session: AsyncSession = Depends(get_session),
    _: bool = Depends(admin_role_checker)
):
    return await invoice_service.update_invoice(
        invoice_id,
        invoice_data,
        session
    )


# -------------------------
# Delete Invoice (admin only)
# -------------------------
@invoice_router.delete(
    "/{invoice_id}",
    status_code=status.HTTP_200_OK
)
async def delete_invoice(
    invoice_id: str,
    session: AsyncSession = Depends(get_session),
    _: bool = Depends(admin_role_checker)
):
    deleted = await invoice_service.delete_invoice(invoice_id, session)

    if not deleted:
        raise InvoiceNotFound()

    return {"message": "Invoice deleted successfully"}
