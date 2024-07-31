#import models
from django.db import models

class File(models.Model):
    file = models.FileField(upload_to='files/')
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey('MyUser', on_delete=models.CASCADE)