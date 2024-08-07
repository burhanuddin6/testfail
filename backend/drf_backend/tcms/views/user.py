from django.shortcuts import render
from rest_framework.decorators import action
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from ..models.user import *
from ..models.actions import UserAction
from ..serializers.user import *
from ..serializers.actions import UserActionSerializer
from ..permissions import HasModelPermissions
from rest_framework.permissions import IsAdminUser
from django.contrib.auth.models import Group
from django.shortcuts import get_object_or_404



class UserViewSet(viewsets.ModelViewSet):
    queryset = MyUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [HasModelPermissions, IsAdminUser]

    
class UserSoftDeleteView(APIView):
    permission_classes = [HasModelPermissions, IsAdminUser]

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
    permission_classes = [HasModelPermissions, IsAdminUser]

class UserAccountIntegrationViewSet(viewsets.ModelViewSet):
    queryset = UserAccountIntegration.objects.all()
    serializer_class = UserAccountIntegrationSerializer
    permission_classes = [HasModelPermissions, IsAdminUser]

from django.http import JsonResponse
import requests

from django.http import JsonResponse
from django.core.cache import cache
import requests

# debug purpose, remove function before production
def verify_email(request):
    code = request.GET.get('code')

    if not code:
        return JsonResponse({'error': 'Verification code is required.'}, status=400)

    # Check if the code has been recently verified
    if cache.get(code):
        return JsonResponse({'message': 'Verification code already processed.'}, status=200)

    # Cache the code for a short duration (e.g., 30 seconds)
    cache.set(code, True, timeout=30)

    verify_url = f"http://localhost:8000/api/accounts/signup/verify/?code={code}"

    try:
        response = requests.get(verify_url)
        if response.status_code == 200:
            return JsonResponse({'message': 'Email verified successfully.'}, status=200)
        else:
            return JsonResponse({'error': 'Email verification failed.'}, status=response.status_code)
    except requests.RequestException as e:
        return JsonResponse({'error': 'Error verifying email.'}, status=500)
    
class UserActionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = UserAction.objects.all()
    serializer_class = UserActionSerializer
    permission_classes = [HasModelPermissions]
    
# NEED TO FIX
def get_qa_users(request):
    # Get 'group_name' from query parameters
    group_name = request.GET.get('group_name', 'qa-user')

    # Retrieve the group object
    group = get_object_or_404(Group, name=group_name)
    print("hello inside qa users")
    # Filter users by the group
    users = MyUser.objects.filter(is_superuser=False).values('id', 'email', 'first_name' , 'last_name')  # Note: 'username' is often used instead of 'name'
    print(users)

    # Return JSON response
    return JsonResponse({'users': list(users)})
