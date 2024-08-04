from django.db import models
# import builtin Group
from django.contrib.auth.models import Group
from .user import MyUser

class Project(models.Model):
    project_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255, null=False)
    description = models.TextField(null=True, blank=True)
    show_description = models.BooleanField(default=False)
    enable_testcase_approval = models.BooleanField(default=False)
    created_by = models.ForeignKey(MyUser, on_delete=models.CASCADE, related_name='projects')
    created_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


# class ProjectGroups(models.Model):
#     group_id = models.ForeignKey(Group, on_delete=models.CASCADE)
#     project_id = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='groups')

# class ProjectUsers(models.Model):
#     user_id = models.ForeignKey(MyUser, on_delete=models.CASCADE)
#     project_id = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='users')
    

