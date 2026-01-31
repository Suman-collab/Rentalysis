from fastapi import FastAPI
from contextlib import asynccontextmanager



@asynccontextmanager
async def life_span(
    app: FastAPI
):
    print(f'Server is starting...')

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