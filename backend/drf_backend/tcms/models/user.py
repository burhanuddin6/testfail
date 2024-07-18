from django.db import models

class User(models.Model):
    user_id = models.AutoField(primary_key=True)
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=64)
    last_name = models.CharField(max_length=64)
    profile_pic_path = models.CharField(max_length=256)

class UserApiKey(models.Model):
    key_id = models.AutoField(primary_key=True)
    api_key = models.CharField(max_length=255, unique=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

class UserAccountIntegration(models.Model):
    integration_id = models.AutoField(primary_key=True)
    platform = models.CharField(max_length=255)
    user = models.ForeignKey(User, on_delete=models.CASCADE)