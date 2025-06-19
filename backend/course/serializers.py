from rest_framework import serializers

from .models import Course, Video, Enrollment, CourseChapter

class CourseChapterSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseChapter
        fields = ['id', 'title', 'description']

class CourseSerializer(serializers.ModelSerializer):
    chapters = CourseChapterSerializer(read_only=True, many=True)
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