from django.db import models
from authemail.models import EmailUserManager, EmailAbstractUser


class MyUser(EmailAbstractUser):
	# Custom fields
	# date_of_birth = models.DateField('Date of birth', null=True, blank=True)

	# Required
	objects = EmailUserManager()

class UserApiKey(models.Model):
    key_id = models.AutoField(primary_key=True)
    api_key = models.CharField(max_length=255, unique=True)
    user = models.ForeignKey(MyUser, on_delete=models.CASCADE)

class UserAccountIntegration(models.Model):
    integration_id = models.AutoField(primary_key=True)
    platform = models.CharField(max_length=255)
    user = models.ForeignKey(MyUser, on_delete=models.CASCADE)
