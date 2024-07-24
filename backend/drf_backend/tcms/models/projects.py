# from django.db import models
# # import builtin Group
# from django.contrib.auth.models import Group
#  ``

# class Project(models.Model):
#     project_id = models.AutoField(primary_key=True)
#     name = models.CharField(max_length=255, null=False)
#     creator_id = models.ForeignKey(MyUser, on_delete=models.CASCADE)
#     description = models.TextField(null=True, blank=True)
#     show_description = models.BooleanField(default=False)
#     enable_testcase_approval = models.BooleanField(default=False)


# class ProjectGroups(models.Model):
#     group_id = models.AutoField(primary_key=True)
#     group_name = models.CharField(max_length=255, null=False)
#     project_id = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='groups')