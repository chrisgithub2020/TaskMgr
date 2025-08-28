from fastapi import FastAPI, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from uuid import uuid4
from datetime import datetime, timedelta
import schedule
import time
from threading import Thread

## Field Validation Classes
from utility.validators import SignUp, LogIn, ChangeInfo, TaskInfo, FetchTokenCred

##Database
from utility.database import HandleDB
from utility.tables import Users, Tasks, Sessions

## utils
# from utility.almost_time_checker import setup_for_email, check_and_send
from utility.sendEmails import SendEmail

## OAuth
from utility.OAuth import OAuth
oauth = OAuth()



db = HandleDB(users=Users, tasks=Tasks, sessions=Sessions)
app = FastAPI()
app.add_middleware(CORSMiddleware,allow_origins=["http://localhost:5173", "https://taskmgr-static.onrender.com"], allow_headers=["Content-Type", "Set-Cookie", "Access-Control-Allow-Origin", "Authorization"], allow_methods=["GET", "POST"],allow_credentials=True)

# def scheduler():
#     users_for_email = db.get_every_user_for_email() #users for email
#     tasks = db.get_close_tasks()
#     print(tasks)

#     # get users for have opted in for emails
#     ref = setup_for_email(users_for_email)

#     ## scheduliing to send emaill reminders to tasks getting close to due date
#     schedule.every(1).minutes.do(lambda: Thread(target=check_and_send, args=(tasks, ref), daemon=True).start())
#     while True:
#         schedule.run_pending()
#         time.sleep(1)


@app.on_event("startup")
async def startUp(): 
    pass   

    ## start thread that schedules the sending
    # thread = Thread(target=scheduler)
    # thread.start()

    

@app.get("/oauth_google")
def oauth_google():
    return {"url":oauth.authorize()}

@app.post("/fetch_token_google")
def fetch_token_google(cred: FetchTokenCred, response: Response):
    try:
        # fetch token and get user details
        info = oauth.fetch_token(code=cred.code, state=cred.state)

        #temp password for the user
        password = info["email"].split("@")[0]+info["given_name"]

        #session id
        session_id = str(uuid4())

        ##time that takes the session to expire
        expiry_time = datetime.today() + timedelta(hours=1)

        user = db.get_user(info["email"])
        print(info["email"])
        if user:
            print("user exist")
            return {"success":False, "result":"!account"}
        
        # adding session
        response.set_cookie(key="session_id", value=session_id, secure=True, httponly=True, samesite='none')
        db.add_session(id=session_id, time=expiry_time)

        #adding user
        user_id = db.add_user(info["name"].strip(), info["email"].strip(), None, password.strip(), False, False)
        response.set_cookie(key="unknown", value=user_id, secure=True, samesite="none", httponly=True) 
    except Exception as err:
        return False
    mail = SendEmail(body=f"Your new TaskMgr password is {password}", to=info["email"])
    lambda: Thread(target=mail.send(), daemon=True).start()
    return {"success":True, "data":user_id}

    

@app.post("/signup")
def sign_up (details: SignUp, response: Response):
    user_id = ""  ## dummy pointer (will be given actual value)
    ## set cookie if user has none
    session_id = str(uuid4())

    ##time that takes the session to expire
    expiry_time = datetime.today() + timedelta(hours=1)
    try:
        user = db.get_user(details.email)
        if user:
            return {"success":False, "result":"!account"}
        response.set_cookie(key="session_id", value=session_id, secure=True, httponly=True, samesite='none')
        db.add_session(id=session_id, time=expiry_time)
        user_id = db.add_user(details.username.strip(), details.email.strip(), details.phone.strip(), details.password, details.sendEmail, details.sendSMS)
        response.set_cookie(key="unknown", value=user_id, secure=True, samesite="none", httponly=True)
    except Exception as err:
        print("there was an error",err)
    return {"success":True, "data":user_id}

@app.post("/login")
def login(details: LogIn, response: Response):
    ##id for new session
    session_id = str(uuid4())

    ## expiry time of new session
    session_expiry_time = datetime.today() + timedelta(hours=1)

    try:
        user_details = db.get_user(details.email)
        print(user_details)
        if user_details:
            if details.password == user_details.password:
                response.set_cookie(key="session_id", value=session_id, httponly=True, samesite="none", secure=True)
                db.add_session(id=session_id,time=session_expiry_time)
                response.set_cookie(key="unknown", value=user_details.id, secure=True, samesite="none", httponly=True)
                return {"id":user_details.id, "success":True}
            else:
                return {"success":False,"result":'!password'}
        else:
            return {"success":False,"result":"!user"}
    except Exception as err:
        print(err)

@app.get("/check_sessions")
def check_sessions(request: Request):
    """
    Logs user in if already has session
    """
    session_id = request.cookies.get("session_id")
    if session_id:
        try:
            session_details = db.get_session(session_id)
            if session_details:
                user_id = request.cookies.get("unknown")
                session_expiry_date = datetime.strptime(session_details.expiry_time, "%Y-%m-%d %H:%M:%S.%f")
                right_now = datetime.today()

                if right_now < session_expiry_date:
                    return user_id
        except:
            pass
 
    return False

@app.get("/dashboard")
def dashboard(req: Request):
    id = req.cookies.get("unknown")
    data = db.get_dashboard(id)
    return data

@app.post("/change_info")
def changeInfo(info: ChangeInfo, req: Request):
    info_dict = info.dict()
    filter = req.cookies.get("unknown")
    db.save_changes(filter, info_dict)
    return True

@app.post("/add_task")
def addTask(info: TaskInfo, req: Request):
    task_owner = req.cookies.get("unknown")
    res = db.add_task(task_owner, info.dict())
    return res

@app.get("/get_tasks")
def getTask(req: Request):
    owner = req.cookies.get("unknown")
    res = db.get_task(owner)
    if len(res) < 1:
        return False
    return res

@app.get("/complete_task/{id}")
def completeTask(id: str):
    result = db.complete_task(id)
    return True if result else False
