
from utility.sendEmails import SendEmail

def setup_for_email(users: list) -> dict:
    tracker = {}
    for user in users:
        tracker[user.id] = user.email
    return tracker


def check_and_send(tasks: list, ref: dict):
    for task in tasks:
        if task[0] in ref:
            mail = SendEmail(body="almost there", to=ref[task[0]])
            mail.send()
