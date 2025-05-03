import requests
from django.conf import settings

GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token"
GOOGLE_USERINFO_URL = "https://www.googleapis.com/oauth2/v1/userinfo"

def get_google_tokens(code: str):
    data = {
        'code':          code,
        'client_id':     settings.GOOGLE_CLIENT_ID,
        'client_secret': settings.GOOGLE_CLIENT_SECRET,
        'redirect_uri':  settings.GOOGLE_REDIRECT_URI,
        'grant_type':    'authorization_code',
    }
    resp = requests.post(GOOGLE_TOKEN_URL, data=data)
    resp.raise_for_status()
    print(resp.json())
    return resp.json()  # contains access_token, refresh_token, expires_in

def get_google_userinfo(access_token: str):
    resp = requests.get(GOOGLE_USERINFO_URL,
                        params={'access_token': access_token})
    resp.raise_for_status()
    print(resp.json())
    return resp.json()  # contains email, name, picture…
