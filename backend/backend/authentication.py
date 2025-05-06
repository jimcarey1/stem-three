from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from django.conf import settings
from django.utils import timezone
from rest_framework import exceptions

class CookieJWTAuthentication(JWTAuthentication):
    def authenticate(self, request):
        access_token:str = request.COOKIES.get('access_token')
        refresh_token:str = request.COOKIES.get('refresh_token')

        if access_token is None:
            return None 

        try:
            validated_token = self.get_validated_token(access_token)
            return self.get_user(validated_token), validated_token

        except InvalidToken:
            if refresh_token is None:
                raise exceptions.AuthenticationFailed('Refresh token not provided.')

            try:
                refresh = RefreshToken(refresh_token)
                new_access_token = refresh.access_token
                # Optionally, set the new access token in the response cookies
                # Note: You'll need to handle setting cookies in your views or middleware
                return self.get_user(new_access_token), new_access_token
            except TokenError:
                raise exceptions.AuthenticationFailed('Refresh token is invalid or expired.')
