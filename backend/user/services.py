import requests
from django.conf import settings
from google.oauth2 import id_token
from google.auth.transport import requests as google_auth_requests
import os
from typing import Dict, Any

_GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token"
_GOOGLE_USERINFO_URL = "https://www.googleapis.com/oauth2/v2/userinfo"

def get_google_tokens(code: str):
    '''
    Exchange authorization code for access token.
    '''
    data = {
        'code':          code,
        'client_id':     settings.GOOGLE_CLIENT_ID,
        'client_secret': settings.GOOGLE_CLIENT_SECRET,
        'redirect_uri':  settings.GOOGLE_REDIRECT_URI,
        'grant_type':    'authorization_code',
        'prompt':        'consent',
    }
    resp = requests.post(_GOOGLE_TOKEN_URL, data=data)
    resp.raise_for_status()
    return resp.json()  # contains access_token, refresh_token, expires_in


def get_google_userinfo(access_token: str):
    '''
    Getting user info from the access token.
    '''
    resp = requests.get(_GOOGLE_USERINFO_URL,
                        params={'access_token': access_token})
    resp.raise_for_status()
    return resp.json()  # contains email, name, picture…


def verify_openid_token(token:str)->Dict[str,Any]:
    '''
    Extracted from the official documentation.
    https://googleapis.dev/python/google-auth/latest/_modules/google/oauth2/id_token.html
    It takes an openid connect token and decodes it.
    '''
    request = google_auth_requests.Request()
    GOOGLE_CLIENT_ID = settings.GOOGLE_CLIENT_ID
    try:
        id_info = id_token.verify_oauth2_token(token, request, GOOGLE_CLIENT_ID, clock_skew_in_seconds=10)
    except Exception as e:
        raise Exception(e)
    return id_info