from sqlmodel import SQLModel, Session, create_engine, select, text
from fastapi import Depends
from typing import Annotated
from uuid import uuid4
from dotenv import load_dotenv
import os

load_dotenv()


class HandleDB:
    sqlite_file_name = os.getenv("DB_NAME")
    sqlite_url = f"sqlite:///{sqlite_file_name}"

    connect_args = {"check_same_thread": False}
    engine = create_engine(sqlite_url, connect_args=connect_args)
    def __init__(self, **tables):
        # SQLModel.metadata.drop_all(self.engine) 
        SQLModel.metadata.create_all(self.engine)
        ## TABLES
        self.users_table = tables["users"]
        self.tasks_table = tables["tasks"]
        self.sessions_table = tables["sessions"]
        #####
    
    def add_user(self, username, email, phone, password, sendEmail, sendSMS):
        id = uuid4()
        new_user = self.users_table(id=str(id),email=email, username=username, phone=phone, password=password, sendEmail=sendEmail, sendSMS=sendSMS)
        with Session(self.engine) as session:
            session.add(new_user)
            session.commit() 
            session.refresh(new_user)
        return id
    
    def add_session(self, id, time):
        new_session = self.sessions_table(session_id=id, expiry_time=str(time))
        with Session(self.engine) as session:
            session.add(new_session)
            session.commit()
            session.refresh(new_session)
    
    def get_session(self,id):
        session_data = False
        with Session(self.engine) as session:
            session_data = session.get(self.sessions_table, id)
        
        return session_data
    
    def get_user(self, email: str):
        """
        GET USER FOR LOG IN
        """
        with Session(self.engine) as session:
            statement = select(self.users_table).where(self.users_table.email == email)
            return session.exec(statement=statement).first()
        
    def get_dashboard(self, id:str):
        with Session(self.engine) as session:
            details = session.get(self.users_table,id.strip())
            return details
    
    def save_changes(self,filter, info:dict[str, str]):
        username = info["first_name"] + info["other_name"]
        query = 'UPDATE Users SET '
        dummy = len(query)

        for key, val in info.items():
            print(dummy)
            if len(query) > dummy and query[-1] != ",":
                query += ","
            if key == "password" and val.strip() != '':
                query += f'password="{info["password"]}"'
            elif key == "email" and val.strip() != '':
                query += f'email="{info["email"]}"'
            elif key == "phone" and val.strip() != '':
                query += f'phone="{info["phone"]}"'
            elif key == "sendEmail":
                query += f'sendEmail={info["sendEmail"]}'
            elif key == "sendSMS":
                query += f'sendSMS={info["sendSMS"]}'

        if username.strip() != "":
            if len(query) > dummy and query[-1] != ",":
                    query += ","
            query += f'username="{username}"'
        
        query += f' WHERE id="{filter}"'


        try:
            with Session(self.engine) as session:
                session.exec(text(query))
                session.commit()
        except Exception as err:
            print(err)
        
    def add_task(self,filter, info) -> bool:
        id = str(uuid4())
        new_task = self.tasks_table(id=id, owner=filter,time=info["time"], date=info["date"], description=info["desc"], title=info["title"], pic=info["image"], status=False)
        try:
            with Session(self.engine) as session:
                session.add(new_task)
                session.commit()
                session.refresh(new_task)
        except Exception as err:
            print(err)
            return False
        return True

    def get_task(self, owner):
        try:
            with Session(self.engine) as session:
                statement = select(self.tasks_table).where(self.tasks_table.owner==owner)
                return session.exec(statement=statement).all()
        except Exception as err:
            print(err)

    def complete_task(self, task: str):
        try:
            with Session(self.engine)  as session:
                statement = select(self.tasks_table).where(self.tasks_table.id==task)
                task = session.exec(statement=statement).one()
                task.status = True
                session.add(task)
                session.commit()
                session.refresh(task)
        except Exception as err:
            print(err)
            return False
        return True

    def get_every_user_for_email(self):
        try:
            with Session(self.engine) as session:
                statement = select(self.users_table.email, self.users_table.id).where(self.users_table.sendEmail==False)
                return session.exec(statement=statement).all()
        except Exception as err:
            print(err)
    
    def get_close_tasks(self):
        try:
            query = "SELECT owner FROM Tasks WHERE date BETWEEN DATE('now', '-10 days') AND DATE('now');"
            with Session(self.engine) as session:
                return session.exec(text(query)).all()
        except Exception as err:
            print(err)
