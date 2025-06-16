from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.decorators import permission_classes, parser_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from django.shortcuts import get_object_or_404
from django.conf import settings

from utils.s3_presigned_url import generate_presigned_url
from .serializers import CourseSerializer, CourseChapterSerializer
from .models import Course
from user.models import User

@api_view(['POST'])
def get_presigned_url(request:Request):

    file_name = request.data.get('file_name')
    file_type = request.data.get('file_type')
    presigned_post = generate_presigned_url(file_name, file_type)

    return Response({
        'data': presigned_post,
        'url': f"https://{settings.AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com/{file_name}"
    })


@api_view(['POST'])
@permission_classes([IsAuthenticated, IsAdminUser])
@parser_classes([FormParser, MultiPartParser])
def create_course(request:Request):
    serializer = CourseSerializer(data=request.data)
    image = request.FILES['image']
    if serializer.is_valid():
        serializer.save(creator = request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated, IsAdminUser])
def get_courses(request:Request, pk):
    user = get_object_or_404(User, pk=pk)
    courses = user.courses.all()
    try:
        course_serializer = CourseSerializer(courses, many=True)
        return Response(data=course_serializer.data, status=status.HTTP_200_OK)
    except Exception as error:
        return Response(course_serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST', 'GET'])
@permission_classes([IsAuthenticated, IsAdminUser])
def create_chapter(request:Request, course_id):
    course = get_object_or_404(Course, pk=course_id)
    if request.method == 'POST':
        try:
            chapter_serializer = CourseChapterSerializer(data = request.data)
            if chapter_serializer.is_valid():
                chapter_serializer.save(course=course)
                return Response(chapter_serializer.data, status=status.HTTP_201_CREATED)
            return Response(chapter_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as exc:
            print(exc)
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    else:
        course_chapters = Course.chapters.all()
        try:
            chapter_serializer = CourseChapterSerializer(course_chapters, many=True)
            return Response(chapter_serializer.data, status=status.HTTP_200_OK)
        except Exception as exc:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
@permission_classes([IsAuthenticated, IsAdminUser]) 
def list_chapters(request:Request, course_id):
    course = get_object_or_404(Course, pk=course_id)
    course_chapters = Course.chapters.all()
    try:
        chapter_serializer = CourseChapterSerializer(course_chapters, many=True)
        return Response(chapter_serializer.data, status=status.HTTP_200_OK)
    except Exception as exc:
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

