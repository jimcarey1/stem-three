from rest_framework import serializers
from .models import User, CustomerDetails

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']

class CustomerDetailsSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    class Meta:
        model = CustomerDetails
        fields = ['id', 'name', 'email', 'mobile', 'user']
        read_only_fields = ['id', 'username']