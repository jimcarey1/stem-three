from django.db import models

from user.models import User

# Create your models here.
class Course(models.Model):
    title = models.CharField(max_length=100, unique=True)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    enrolled_users = models.ManyToManyField(to=User, through='Enrollment', related_name='enrolled_courses')

    class Meta:
        db_table = 'courses'

    def __str__(self):
        return self.title


class Video(models.Model):
    title = models.CharField(max_length=100, unique=True)
    url = models.URLField()
    associated_courses = models.ManyToManyField(to=Course, related_name='videos')
    watched_users = models.ManyToManyField(to=User, related_name='watched_videos')

    class Meta:
        db_table = 'videos'

    def __str__(self):
        return self.title
    
class Enrollment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='enrollments')
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='courses')
    enrolled_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'course_enrollment'
        unique_together = ('user', 'course')