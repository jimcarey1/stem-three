from urllib.parse import urlencode
from django.conf import settings
from django.shortcuts import redirect
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken

from .services import get_google_tokens, get_google_userinfo
from django.contrib.auth import get_user_model

User = get_user_model()

class GoogleInitiateAPIView(APIView):
    """ Redirects user to Google’s OAuth2 consent screen. """
    def get(self, request):
        params = {
            'client_id':     settings.GOOGLE_CLIENT_ID,
            'redirect_uri':  settings.GOOGLE_REDIRECT_URI,
            'response_type': 'code',
            'scope':         'openid email profile',
            'access_type':   'offline',
            'prompt':        'select_account',
        }
        url = "https://accounts.google.com/o/oauth2/v2/auth?" + urlencode(params)
        return Response({'auth_url': url})

class GoogleCallbackAPIView(APIView):
    """
    Handles Google’s redirect back to us.
    Exchanges code → tokens → userinfo → local JWT → redirects to frontend.
    """
    def get(self, request):
        error = request.GET.get('error')
        if error:
            return redirect(f"{settings.FRONTEND_URL}/?error={error}")

        code = request.GET.get('code')
        if not code:
            return Response({"detail": "No code provided."},
                            status=status.HTTP_400_BAD_REQUEST)

        # 1) Exchange code for tokens
        token_data = get_google_tokens(code)
        access_token = token_data['access_token']

        # 2) Fetch user info
        info = get_google_userinfo(access_token)
        email = info.get('email')

        # 3) Find or create local user
        user, _ = User.objects.get_or_create(username=email, defaults={
            'email': email,
            'first_name': info.get('given_name', ''),
            'last_name':  info.get('family_name', ''),
        })

        # 4) Issue JWT
        refresh = RefreshToken.for_user(user)
        jwt_token = str(refresh.access_token)

        # 5) Redirect to frontend, passing token
        redirect_url = f"{settings.FRONTEND_URL}/?token={jwt_token}"
        return redirect(redirect_url)