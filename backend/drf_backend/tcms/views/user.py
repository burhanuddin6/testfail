from django.shortcuts import render

from rest_framework import viewsets
from ..models.user import *
from ..serializers.user import *


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserApiKeyViewSet(viewsets.ModelViewSet):
    queryset = UserApiKey.objects.all()
    serializer_class = UserApiKeySerializer

class UserAccountIntegrationViewSet(viewsets.ModelViewSet):
    queryset = UserAccountIntegration.objects.all()
    serializer_class = UserAccountIntegrationSerializer