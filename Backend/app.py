from fastapi import FastAPI
from db.main import init_db
from contextlib import asynccontextmanager
from utils.errors import register_all_errors
from auth.routes import auth_router
from product.routes import product_router
from order.routes import order_router
from coupons.routes import coupon_router
from invoices.routes import invoice_router



@asynccontextmanager
async def life_span(
    app: FastAPI
):
    print(f'Server is starting...')
    await init_db()
    yield
    print(f'Server has been stopped...')
    



app = FastAPI(
    title='Rentalysis',
    description='A REST API for a Rental Management System',
    contact={
        'email' : 'subham.sahu.cs@gmail.com'
    },
    lifespan=life_span
)



app.include_router(
    router=auth_router,
    prefix='/api/auth',
    tags=['Auth']
)
app.include_router(
    router=product_router,
    prefix='/api/product',
    tags=['Product']
)
app.include_router(
    router = order_router,
    prefix='/api/order',
    tags=['Order']
)
app.include_router(
    router=coupon_router,
    prefix='/api/order',
    tags=['Coupon']

)
app.include_router(
    router=invoice_router,
    prefix='/api/invoice',
    tags=['Invoice']
)


@app.get('/')
def greet():
    return {'message' : 'Welcome to Rentalysis'}


register_all_errors(app)