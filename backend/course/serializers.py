from rest_framework import serializers

from .models import Course, Video, Enrollment

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course 
        fields = ['all']

class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = ['all']

class EnrollmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Enrollment
        fields = ['all']