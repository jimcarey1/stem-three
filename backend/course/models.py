from django.db import models
from django.core.exceptions import ValidationError

from user.models import User


class Course(models.Model):
    title = models.CharField(max_length=100, unique=True)
    description = models.TextField()
    image = models.ImageField(upload_to='images/', default='images/python.png', null=True, blank=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    creator = models.ForeignKey(User, null=True, related_name='courses', on_delete=models.SET_NULL)
    enrolled_users = models.ManyToManyField(to=User, through='Enrollment', related_name='enrolled_courses')

    class Meta:
        db_table = 'courses'

    def __str__(self):
        return self.title

class CourseChapter(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(default = title)
    course = models.ForeignKey(to=Course, related_name='chapters', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'chapters'
    
    def __str__(self):
        return self.title

class Video(models.Model):
    title = models.CharField(max_length=100, unique=True)
    url = models.URLField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    chapter = models.ManyToManyField(to=CourseChapter, related_name='chapters')
    associated_courses = models.ManyToManyField(to=Course, related_name='videos')
    watched_users = models.ManyToManyField(to=User, related_name='watched_videos')

    class Meta:
        db_table = 'videos'

    def __str__(self):
        return self.title
    
class Enrollment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='enrollments')
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='courses')
    completed = models.BooleanField(default=False)
    grades = models.PositiveSmallIntegerField(default=0)
    enrolled_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'course_enrollment'
        unique_together = ('user', 'course')
    
    def clean(self):
        # enforce max 2 active enrollments per user
        if (Enrollment.objects
            .filter(user=self.user)
            .exclude(pk=self.pk)
            .count() >= 2):
            raise ValidationError("You can enroll in at most two courses at a time.")