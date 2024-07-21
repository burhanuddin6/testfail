from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from ..models.user import *
from ..serializers.user import *


class UserViewSet(viewsets.ModelViewSet):
    queryset = MyUser.objects.all()
    serializer_class = UserSerializer
    
class UserSoftDeleteView(APIView):
    def post(self, request, *args, **kwargs):
        user_id = request.data.get('user_id')
        if not user_id:
            return Response({'error': 'User ID is required.'}, status=400)
        
        user = MyUser.objects.filter(id=user_id).first()
        if not user:
            return Response({'error': 'User not found.'}, status=404)
        
        user.soft_delete()
        return Response({'message': 'User soft deleted successfully.'}, status=200)
    
class UserApiKeyViewSet(viewsets.ModelViewSet):
    queryset = UserApiKey.objects.all()
    serializer_class = UserApiKeySerializer

class UserAccountIntegrationViewSet(viewsets.ModelViewSet):
    queryset = UserAccountIntegration.objects.all()
    serializer_class = UserAccountIntegrationSerializer


from django.http import JsonResponse
import requests

from django.http import JsonResponse
from django.core.cache import cache
import requests

def verify_email(request):
    code = request.GET.get('code')

    if not code:
        return JsonResponse({'error': 'Verification code is required.'}, status=400)

    # Check if the code has been recently verified
    if cache.get(code):
        return JsonResponse({'message': 'Verification code already processed.'}, status=200)

    # Cache the code for a short duration (e.g., 30 seconds)
    cache.set(code, True, timeout=50)

    verify_url = f"http://localhost:8000/api/accounts/signup/verify/?code={code}"

    try:
        response = requests.get(verify_url)
        if response.status_code == 200:
            return JsonResponse({'message': 'Email verified successfully.'}, status=200)
        else:
            return JsonResponse({'error': 'Email verification failed.'}, status=response.status_code)
    except requests.RequestException as e:
        return JsonResponse({'error': 'Error verifying email.'}, status=500)