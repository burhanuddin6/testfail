from rest_framework import serializers
from ..models.user import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyUser
        fields = ('email', 'first_name', 'last_name')

class UserApiKeySerializer(serializers.ModelSerializer):
    class Meta:
        model = UserApiKey
        fields = '__all__'

class UserAccountIntegrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccountIntegration
        fields = '__all__'