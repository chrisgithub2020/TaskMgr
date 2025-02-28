from sqlmodel import Field, SQLModel
from sqlalchemy import Column, String

class Users(SQLModel, table=True):
    __tablename__ = "Users"
    id: str = Field(primary_key=True)
    username: str
    email: str = Field(index=True)
    phone: str
    password: str
    sendEmail: bool
    sendSMS: bool


class Tasks(SQLModel, table=True):
    __tablename__ = "Tasks"
    id: str = Field(primary_key=True)
    owner: str
    time: str
    date: str
    description: str
    title: str
    pic: str | None
    status: bool

class Sessions(SQLModel, table=True):
    __tablename__ = "Sessions"
    session_id: str = Field(primary_key=True, index=True)
    expiry_time: str