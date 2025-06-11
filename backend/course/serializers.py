from rest_framework import serializers

from .models import Course, Video, Enrollment
from user.serializers import UserSerializer

class CourseSerializer(serializers.ModelSerializer):
    #creator = UserSerializer(read_only=True)
    class Meta:
        model = Course 
        fields = ['id', 'title', 'description']

class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = ['all']

class EnrollmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Enrollment
        fields = ['all']