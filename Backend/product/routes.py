from fastapi import APIRouter,Depends,status,UploadFile,Form,Query,File
from fastapi.responses import JSONResponse
from db.main import get_session
from product.service import ProductService
from sqlmodel.ext.asyncio.session import AsyncSession
from auth.dependencies import RoleChecker,AccessTokenBearer,get_current_user
from .schema import CreateProduct,Updateproduct
from typing import List
from utils.upload_images import upload_images
from utils.errors import ProductNotFound
vendor_role_checker = RoleChecker(['vendor'])
role_checker = RoleChecker(['vendor','admin'])

access_token_bearer = AccessTokenBearer()
product_service = ProductService()

product_router = APIRouter()


@product_router.get('/all')
async def get_all_products(
    limit: int = Query(10, ge=1, le=50),
    offset: int = Query(0, ge=0),
    session:AsyncSession = Depends(get_session)
):
    return await product_service.get_products(session=session,offset=offset,limit=limit)



@product_router.post("/add")
async def add_product(
    product: CreateProduct,
    session: AsyncSession = Depends(get_session),
    user_details = Depends(get_current_user),
    _: bool = Depends(vendor_role_checker),
):
    await product_service.add_product(
        user_details.uid,
        product,
        session
    )
    return {"message": "Product added successfully"}




@product_router.delete('/{uid}')
async def remove_product(
    uid: str,
    _: bool = Depends(vendor_role_checker),
    session: AsyncSession = Depends(get_session)

):
    result = await product_service.delete_product(uid,session)
    if result:
        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content={
                'message' : 'Product removed sucessfully'
            }
        )
    raise ProductNotFound()


@product_router.get('/category')
async def get_by_category(
    category: str,
    limit: int,
    offset: int,
    session: AsyncSession = Depends(get_session),
    _ : bool = Depends(dependency=access_token_bearer)
):
    result = await product_service.get_products_by_category(category,session=session,limit=limit,offset=offset)

    if result:
        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content={
                'products' : result
            }
        )
    raise ProductNotFound()

@product_router.get('/filter')
async def get_by_filter(
    name: str | None = Query(None),
    category: str | None = Query(None),
    brand: str | None = Query(None),
    min_daily_price: int | None = Query(default=None),
    max_daily_price: int | None = Query(default = None),
    in_stock: bool| None = Query(default=None),
    limit: int = Query(10, ge=1, le=50),
    offset: int = Query(0, ge=0),
    _ : bool = Depends(dependency=access_token_bearer),
    session: AsyncSession = Depends(get_session)

):
    products = await ProductService.get_products_filtered(
        session=session,
        name=name,
        category=category,
        brand=brand,
        min_daily_price=min_daily_price,
        in_stock=in_stock,
        limit=limit,
        offset=offset
    )
    return products

@product_router.patch('/')
async def update_product(
    updated_prod: Updateproduct,
    session: AsyncSession = Depends(get_session)
):
    pass

@product_router.get('/{id}')
async def get_product_by_id(
    pid: str,
    session: AsyncSession = Depends(get_session)
):
    result = product_service.get_product_by_id(pid,session=session)

    return result



@product_router.post('/image')
async def upload_image(
    images: List[UploadFile]
):
    result = await upload_images(images)
    return result
