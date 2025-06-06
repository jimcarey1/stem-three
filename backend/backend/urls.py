"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

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