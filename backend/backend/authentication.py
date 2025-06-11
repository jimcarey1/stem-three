from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.request import Request
from rest_framework_simplejwt.tokens import RefreshToken, TokenError

from utils.auth import check_token_expiry

class CookieJWTAuthentication(JWTAuthentication):
    '''
    Custom AuthBackend(JWT) leveraging cookies
    for more security. 
    '''
    def authenticate(self, request:Request):
        access_token:str = request.COOKIES.get('access_token')
        refresh_token:str = request.COOKIES.get('refresh_token')

        if access_token is None:
            return None
        
        #Here if the token is expired, then we try to create
        #new token from the refresh token.
        if check_token_expiry(access_token):
            try:
                refresh = RefreshToken(refresh_token)
            except TokenError:
                return None
            new_access_token = str(refresh.access_token)

            try:
                validated_token = self.get_validated_token(new_access_token)
                user = self.get_user(validated_token)
                return user, validated_token
            except TokenError:
                return None
        
        try:
            validated_token = self.get_validated_token(access_token)
            return self.get_user(validated_token), validated_token
        except TokenError:
            return None
