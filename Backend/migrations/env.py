import asyncio
from logging.config import fileConfig
from sqlalchemy import pool
from sqlalchemy.ext.asyncio import create_async_engine # Use async engine
from alembic import context

# Your imports
from db.models import User
from sqlmodel import SQLModel
from utils.Config import get_config

get_settings = get_config()
database_url = get_settings.DATABASE_URL

config = context.config
config.set_main_option('sqlalchemy.url', database_url)

if config.config_file_name is not None:
    fileConfig(config.config_file_name)

target_metadata = SQLModel.metadata

def run_migrations_offline() -> None:
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()

# 1. New helper function to run migrations synchronously within an async context
def do_run_migrations(connection):
    context.configure(connection=connection, target_metadata=target_metadata)

    with context.begin_transaction():
        context.run_migrations()

# 2. Refactored online migration for Async
async def run_migrations_online() -> None:
    """Run migrations in 'online' mode using an async engine."""
    
    connectable = create_async_engine(
        config.get_main_option("sqlalchemy.url"),
        poolclass=pool.NullPool,
    )

    async with connectable.connect() as connection:
        # bridge the async connection to the sync alembic code
        await connection.run_sync(do_run_migrations)

    await connectable.dispose()

if context.is_offline_mode():
    run_migrations_offline()
else:
    # 3. Use asyncio to run the online migration
    asyncio.run(run_migrations_online())