from django.contrib.auth.models import AbstractUser
from django.db import models 

class User(AbstractUser):
    refresh_token = models.CharField(blank=True, null=True)


class CustomerDetails(models.Model):
    name = models.CharField(max_length=50)
    email = models.EmailField()
    mobile = models.CharField(max_length=10)
    user = models.ForeignKey(User, null=True, related_name='user_details', on_delete=models.SET_NULL)