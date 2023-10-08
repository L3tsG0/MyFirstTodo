from fastapi import APIRouter

from sqlalchemy import create_engine,select

from sqlalchemy.ext.asyncio import async_sessionmaker,create_async_engine,AsyncSession
from sqlalchemy.orm import DeclarativeBase,Mapped,mapped_column
from sqlalchemy.types import String
from typing import Optional

engine = create_async_engine("sqlite+aiosqlite:///todo.db")
AsyncSession = async_sessionmaker(engine)


class Base(DeclarativeBase):
    pass

class todo_items(Base):
    __tablename__ = "todo_items"

    id : Mapped[int] = mapped_column(primary_key=True,autoincrement=True)
    title : Mapped[str] = mapped_column(String(30),nullable=False)
    detail : Mapped[Optional[str]]
    complete : Mapped[bool] = mapped_column(default=False)

    def __repr__(self) -> str:
        return f"Todo_items(id = {self.id!r},title={self.title!r},detail = {self.detail!r},complete = {self.complete})"





# engine = create_engine("sqlite:///:memory:")



