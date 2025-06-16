from django.urls import path
from .views import get_presigned_url, create_course, get_courses, list_chapters, create_chapter

urlpatterns = [
    path('generate-presigned-url/', get_presigned_url),
    path('new/', create_course, name='course_create_url'),
    path('mycourses/<int:pk>/', get_courses, name='courses_get_url'),
    path('chapters/<int:course_id>/', create_chapter, name='chapter_create_url'),
]