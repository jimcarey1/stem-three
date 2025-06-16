from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

from user.views import GoogleInitiateAPIView, GoogleCallbackAPIView, get_me, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('auth/google/initiate/', GoogleInitiateAPIView.as_view(), name='google-init'),
    path('accounts/google/login/callback/',  GoogleCallbackAPIView.as_view(), name='google-callback'),
    path('auth/me/', get_me, name='login_check_url'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh_url'),
    path('courses/', include('course.urls'))
]

if settings.DEBUG:
    urlpatterns = urlpatterns + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)