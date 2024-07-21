from django.db import models
from authemail.models import EmailUserManager, EmailAbstractUser

# A user instance can never be hard deleted. That is the user can be archived
# or hidden but their data should not be deleted since if a user is deleted
# all of their created data will have to be deleted which is not what the
# application should do.
class MyUser(EmailAbstractUser):
	# Custom fields
	# date_of_birth = models.DateField('Date of birth', null=True, blank=True)

	# Required
    objects = EmailUserManager()
    # is_active is provided by the authemail module. So just toggle this instead of deleting the instance
    # is_active = models.BooleanField(default=True)

    def soft_delete(self):
        self.is_active = False
        self.save()


class UserApiKey(models.Model):
    key_id = models.AutoField(primary_key=True)
    api_key = models.CharField(max_length=255, unique=True)
    user = models.ForeignKey(MyUser, on_delete=models.CASCADE)

class UserAccountIntegration(models.Model):
    integration_id = models.AutoField(primary_key=True)
    platform = models.CharField(max_length=255)
    user = models.ForeignKey(MyUser, on_delete=models.CASCADE)
