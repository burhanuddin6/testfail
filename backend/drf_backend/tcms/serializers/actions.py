from rest_framework import serializers
from ..models import UserAction
from .user import UserSerializer

class UserActionSerializer(serializers.ModelSerializer):
    user_info = UserSerializer(read_only=True, source='user')
    class Meta:
        model = UserAction
        fields = '__all__'