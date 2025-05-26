from django.urls import path
from .views import generate_presigned_url

urlpatterns = [
    path('generate-presigned-url/', generate_presigned_url),
]