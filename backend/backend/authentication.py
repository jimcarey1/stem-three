from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.request import Request

from utils.auth import check_token_expiry

class CookieJWTAuthentication(JWTAuthentication):
    def authenticate(self, request:Request):
        access_token:str = request.COOKIES.get('access_token')
        refresh_token:str = request.COOKIES.get('refresh_token')

        if access_token is None:
            return None
        
        if check_token_expiry(access_token):
            return None, None
        
        validated_token = self.get_validated_token(access_token)
        return self.get_user(validated_token), validated_token
