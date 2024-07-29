from django.db import models
from .user import MyUser
from .milestone import Milestone

class TestPlan(models.Model):
    test_plan_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255, unique=True)
    creator_id = models.ForeignKey(MyUser, on_delete=models.CASCADE)
    milestone_id = models.ForeignKey(Milestone, on_delete=models.CASCADE, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    test_case_filter = models.TextField(null=True, blank=True)
    project_id = models.ForeignKey('Project', on_delete=models.CASCADE)

class TestPlanFile(models.Model):
    file_id = models.AutoField(primary_key=True)
    file = models.FileField(upload_to='test_plan_files/')
    test_plan_id = models.ForeignKey(TestPlan, on_delete=models.CASCADE)

class TestPlanTicket(models.Model):
    ticket_id = models.AutoField(primary_key=True)
    ticket = models.CharField(max_length=255, unique=True)
    test_plan_id = models.ForeignKey(TestPlan, on_delete=models.CASCADE)


class TestPlanTestRun(models.Model):
    test_plan_test_run_id = models.AutoField(primary_key=True)
    test_plan_id = models.ForeignKey(TestPlan, on_delete=models.CASCADE)
    test_run_id = models.ForeignKey('TestRun', on_delete=models.CASCADE)