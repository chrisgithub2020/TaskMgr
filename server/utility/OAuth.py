from oauthlib.oauth2 import WebApplicationClient
import requests
from dotenv import load_dotenv
import os
import uuid

load_dotenv()

class OAuth:
    headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
    }
    def __init__(self):
        self.endpoint = os.getenv("AUTH_ENDPOINT")
        self.client = WebApplicationClient(os.getenv("CLIENT_ID"))
        self.state = str(uuid.uuid4())

    def authorize(self):
        try:
            url = self.client.prepare_request_uri(
                uri=self.endpoint,
                redirect_uri="http://localhost:5173/signinauth",
                scope=["email", "profile"],
                state=self.state
            )
            return url
        except Exception as err:
            print(err)
            return False

    def fetch_token(self, code, state):
        try:            
            data = self.client.prepare_request_body(
                code=code,
                redirect_uri="http://localhost:5173/signinauth",
                include_client_id=True,
                state=state,
                client_secret=os.getenv("CLIENT_SECRET")
            )
            response = requests.post(url=os.getenv("TOKEN_URL"),data=data, headers=self.headers)
            self.client.parse_request_body_response(response.text)
            return self.fetch_info()
        except Exception as err:
            print(err)
            return False

    def fetch_info(self):
        try:
            header = {
                'Authorization': 'Bearer {}'.format(self.client.token['access_token'])
            }
            response = requests.get(url='https://www.googleapis.com/oauth2/v3/userinfo', headers=header)
            return response
        except Exception as err:
            return False