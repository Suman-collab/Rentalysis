from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import select, delete
from typing import Optional, Sequence
from uuid import UUID
from datetime import datetime

from db.models import Invoice, Order
from .schema import CreateInvoice, UpdateInvoice
from utils.errors import InvoiceNotFound, OrderNotFound


class InvoiceService:

    # ---------------------------
    # Get all invoices
    # ---------------------------
    async def get_invoices(
        self,
        session: AsyncSession,
        offset: int,
        limit: int
    ):
        query = select(Invoice).offset(offset).limit(limit)
        result = await session.exec(query)
        return result.all()

    # ---------------------------
    # Get invoice by invoice_id
    # ---------------------------
    async def get_invoice_by_id(
        self,
        invoice_id: UUID,
        session: AsyncSession
    ):
        query = select(Invoice).where(Invoice.invoice_id == invoice_id)
        result = await session.exec(query)

        invoice = result.first()
        if not invoice:
            raise InvoiceNotFound()

        return invoice

    # ---------------------------
    # Get invoice by order_id
    # ---------------------------
    async def get_invoice_by_order_id(
        self,
        order_id: UUID,
        session: AsyncSession
    ):
        query = select(Invoice).where(Invoice.order_id == order_id)
        result = await session.exec(query)

        invoice = result.first()
        if not invoice:
            raise InvoiceNotFound()

        return invoice

    # ---------------------------
    # Get invoices by user
    # ---------------------------
    async def get_invoices_by_user(
        self,
        user_id: UUID,
        session: AsyncSession
    ):
        query = select(Invoice).where(Invoice.user_id == user_id)
        result = await session.exec(query)
        return result.all()

    # ---------------------------
    # Create invoice
    # ---------------------------
    async def create_invoice(
        self,
        invoice_data: CreateInvoice,
        session: AsyncSession
    ):
        # Fetch order
        order_query = select(Order).where(Order.oid == invoice_data.order_id)
        order_result = await session.exec(order_query)
        order = order_result.first()

        if not order:
            raise OrderNotFound()

        # Create invoice (amounts come from order)
        new_invoice = Invoice(
            order_id=order.oid,
            user_id=order.user_id,
            subtotal_amount=order.total_amount,
            discount_amount=order.discount_amount,
            tax_amount=invoice_data.tax_amount,
            final_amount=order.final_amount + invoice_data.tax_amount,
            payment_method=invoice_data.payment_method,
            payment_status=invoice_data.payment_status,
            issued_at=datetime.utcnow()
        )

        session.add(new_invoice)
        await session.commit()
        await session.refresh(new_invoice)

        return new_invoice

    # ---------------------------
    # Update invoice
    # ---------------------------
    async def update_invoice(
        self,
        invoice_id: UUID,
        invoice_data: UpdateInvoice,
        session: AsyncSession
    ):
        invoice = await self.get_invoice_by_id(invoice_id, session)

        for field, value in invoice_data.model_dump(exclude_unset=True).items():
            setattr(invoice, field, value)

        session.add(invoice)
        await session.commit()
        await session.refresh(invoice)

        return invoice

    # ---------------------------
    # Delete invoice
    # ---------------------------
    async def delete_invoice(
        self,
        invoice_id: UUID,
        session: AsyncSession
    ):
        query = delete(Invoice).where(Invoice.invoice_id == invoice_id)
        result = await session.exec(query)
        await session.commit()

        return True if result.rowcount > 0 else False
