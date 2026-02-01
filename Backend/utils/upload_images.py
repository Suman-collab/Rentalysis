import cloudinary
from fastapi import UploadFile
from cloudinary.uploader import upload
from utils.Config import get_config
from fastapi.exceptions import HTTPException
from fastapi import status
import asyncio


config = get_config()

cloudinary.config(
    cloud_name = config.CLOUDINARY_CLOUD_NAME, 
    api_key = config.CLOUDINARY_API_KEY, 
    api_secret = config.CLOUDINARY_API_SECRET
)


async def upload_images(
    images: list[UploadFile]
):
    urls = []
    for img in images:
        try:
            upload_result = upload(img.file)
            file_url = upload_result['secure_url']
            urls.append(file_url)
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=str(e)
            )
    return urls

