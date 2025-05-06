from django.contrib.auth.models import AbstractUser
from django.db import models 

class User(AbstractUser):
    refresh_token = models.CharField(blank=True, null=True)