from smtplib import SMTP
import ssl
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

class SendEmail:
    sender_email = "agyemanchris0@gmail.com"
    to = ""
    provider = "smtp.gmail.com"
    password = "zwdd vvvz lgre qheg"
    custome_name = "TaskMgr"
    context = ssl.create_default_context()
    body = ""

    def __init__(self, body: str, to: str):
        self.body = body
        self.to = to

    def setDetails(self):
        self.message = MIMEMultipart()
        self.message["From"] = f'"{self.custome_name}" <{self.sender_email}>'
        self.message["To"] = self.to
        self.message["Subject"] = "You Have a task to complete"
        self.message.attach(MIMEText(self.body, "plain"))

    def send(self):
        self.setDetails()
        with SMTP(self.provider,587, timeout=60) as s:
            s.starttls(context=self.context)
            s.login(self.sender_email, self.password)
            s.sendmail(self.sender_email, self.to, self.message.as_string())

