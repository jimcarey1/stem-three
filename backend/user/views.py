from urllib.parse import urlencode
from django.conf import settings
from django.shortcuts import redirect
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.request import Request

from .services import get_google_tokens, get_google_userinfo
from .serializers import UserSerializer
from django.contrib.auth import get_user_model

import jwt

User = get_user_model()

class GoogleInitiateAPIView(APIView):
    """ Redirects user to Google’s OAuth2 consent screen. """
    def get(self, request):
        params = {
            'client_id':     settings.GOOGLE_CLIENT_ID,
            'redirect_uri':  settings.GOOGLE_REDIRECT_URI,
            'response_type': 'code',
            'scope':         'openid email profile',
            #'access_type':   'offline',
            'prompt':        'consent',
        }
        url = "https://accounts.google.com/o/oauth2/v2/auth?" + urlencode(params)
        print(url)
        return Response({'auth_url': url})


class GoogleCallbackAPIView(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        error = request.GET.get('error')
        if error:
            return redirect(f"{settings.FRONTEND_URL}/?error={error}")
        
        try:
            code = request.GET.get('code')
            if not code:
                return Response({"detail": "No code provided."},
                                status=status.HTTP_400_BAD_REQUEST)

            token_data = get_google_tokens(code)
            access_token = token_data.get('access_token', None)

            info = get_google_userinfo(access_token)
            refresh_token = token_data.get('refresh_token', None)
            email = info.get('email')

            user, user_exists = User.objects.get_or_create(username=email, defaults={
                'email': email,
                'first_name': info.get('given_name', ''),
                'last_name':  info.get('family_name', ''),
                'refresh_token':refresh_token,
            })

            #If the user already exists in the database, we are updating his refresh_token
            if user_exists:
                user.refresh_token = refresh_token
                user.save()

            refresh = RefreshToken.for_user(user)
            jwt_token = str(refresh.access_token)

            response = redirect(f"{settings.FRONTEND_URL}/")
            response.set_cookie(key="access_token", value=jwt_token, max_age=2592000, httponly=True, secure=False, samesite='Lax')
            response.set_cookie(key="refresh_token", value=str(refresh), max_age=2592000, httponly=True, secure=False, samesite='Lax')
            return response
        except Exception as error:
            return redirect(f"{settings.FRONTEND_URL}/?error={error}")

    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_me(request:Request):
    if request.user and request.user.is_authenticated:
        user_serializer = UserSerializer(instance = request.user)
        return Response({'user':user_serializer.data})
    else:
        refresh_token = request.COOKIES.get('refresh_token')
        if refresh_token is None:
            return Response({'detail': 'Refresh token not provided'}, status=status.HTTP_401_UNAUTHORIZED)
        try:
            refresh = RefreshToken(refresh_token)
            new_access_token = str(refresh.access_token)
            user_payload = jwt.decode(new_access_token, key=settings.SECRET_KEY, options={'verify_exp':False})
            print(user_payload)
            response = Response(status=status.HTTP_200_OK)
            response.set_cookie(key='access_token', value=new_access_token, max_age=2592000, httponly=True, secure=False, samesite='Lax')
            return response
        except Exception as e:
            return Response({'detail':'Invalid refresh token.'}, status=status.HTTP_401_UNAUTHORIZED)


class TokenRefreshView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        refresh_token = request.COOKIES.get('refresh_token')
        if refresh_token is None:
            return Response({'detail': 'Refresh token not provided.'}, status=status.HTTP_401_UNAUTHORIZED)

        try:
            refresh = RefreshToken(refresh_token)
            new_access_token = str(refresh.access_token)
            response = Response(status=status.HTTP_200_OK)
            response.set_cookie(key="access_token", value=new_access_token, max_age=2592000, httponly=True, secure=False, samesite='Lax')
            response.set_cookie(key="refresh_token", value=str(refresh), max_age=2592000, httponly=True, secure=False, samesite='Lax')
            return response
        except Exception as e:
            return Response({'detail': 'Invalid refresh token.'}, status=status.HTTP_401_UNAUTHORIZED)