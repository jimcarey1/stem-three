from django.db import models

from user.models import User

# Create your models here.
class Course(models.Model):
    title = models.CharField(max_length=100, unique=True)
    description = models.TextField()
    enrolled_users = models.ManyToManyField(to=User, related_name='enrolled_courses')

    class Meta:
        db_table = 'courses'


class Video(models.Model):
    title = models.CharField(max_length=100, unique=True)
    url = models.URLField()
    associated_courses = models.ManyToManyField(to=Course, related_name='videos')

    class Meta:
        db_table = 'videos'