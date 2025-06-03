from django.urls import path
from .views import get_presigned_url, create_course

urlpatterns = [
    path('generate-presigned-url/', get_presigned_url),
    path('new/', create_course, name='course_create_url'),
]