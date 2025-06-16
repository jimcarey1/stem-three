from rest_framework import serializers

from .models import Course, Video, Enrollment, CourseChapter
from user.serializers import UserSerializer

class CourseSerializer(serializers.ModelSerializer):
    #creator = UserSerializer(read_only=True)
    class Meta:
        model = Course 
        fields = ['id', 'title', 'description', 'image', 'chapters']

class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = ['all']

class EnrollmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Enrollment
        fields = ['all']

class CourseChapterSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseChapter
        fields = ['id', 'title', 'description']