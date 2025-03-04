import re
from typing import Annotated, Any
from pydantic import BaseModel, field_validator

## validating sent emails and phone
EMAIL_RE = r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'
PHONE_RE = r"^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$"



## end

class SignUp(BaseModel):
    """
    Sign Up data validation
    """
    username: str
    email: str
    phone: str
    password: str
    sendEmail: bool
    sendSMS: bool

    @field_validator('email')
    @classmethod
    def email_validator(cls, val):
        """
        CHECK IF EMAIL MATCHES REGULAR EXPRESSION
        """
        if not bool(re.match(EMAIL_RE, val)):
            print("wrong")
            raise ValueError("Invalid Email")
        return val
    

    @field_validator('phone')
    @classmethod
    def phone_validator(cls, val):
        """
        CHECK IF PHONE NUMBER MATCHES REGULAR EXPRESSION
        """
        if not bool(re.match(PHONE_RE, val)):
            raise ValueError("Invalid Phone Number")
        return val
    
class LogIn(BaseModel):
    email: str
    password: str

    @field_validator("email")
    @classmethod
    def email_validator(cls, val):
        """
        CHECK IF EMAIL MATCHES REGULAR EXPRESSION
        """
        if not bool(re.match(EMAIL_RE, val)):
            print("wrong")
            raise ValueError("Invalid Email")
        return val
    

class ChangeInfo(BaseModel):
    email: str
    phone: str
    first_name: str
    other_name: str
    password: str
    sendEmail: bool
    sendSMS: bool

class TaskInfo(BaseModel):
    title: str
    desc: str
    date: str
    time: str
    image: Any
    
    
class FetchTokenCred(BaseModel):
    code: str
    state: str