from fastapi_mail import FastMail

from fastapi_mail import FastMail,ConnectionConfig,MessageSchema,MessageType
from pydantic import SecretStr
from utils.Config import get_config
from pathlib import Path
from typing import List

BASE_DIR = Path(__file__).resolve().parent


settings = get_config()

mail_config = ConnectionConfig(
    MAIL_USERNAME=settings.MAIL_USERNAME,
    MAIL_FROM=settings.MAIL_FROM,
    MAIL_FROM_NAME=settings.MAIL_FROM_NAME,
    MAIL_PASSWORD=SecretStr(settings.MAIL_PASSWORD),
    MAIL_PORT=settings.MAIL_PORT,
    MAIL_SSL_TLS=settings.MAIL_SSL_TLS,
    MAIL_STARTTLS=settings.MAIL_STARTTLS,
    MAIL_SERVER=settings.MAIL_SERVER,
    USE_CREDENTIALS=settings.USE_CREDENTIALS,
    VALIDATE_CERTS=settings.VALIDATE_CERTS,
    TEMPLATE_FOLDER=Path(BASE_DIR)
)

mail = FastMail(
    config=mail_config
)

def create_message(
    recipients: List[str],
    subject: str,
    body: str
):
    print(recipients, subject, body)

    message = MessageSchema(
        recipients=recipients,
        subject=subject,
        body=body,
        subtype=MessageType.html
    )
    return message

async def send_message(message: MessageSchema):
    await mail.send_message(message)