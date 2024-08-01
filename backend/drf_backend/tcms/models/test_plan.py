from django.db import models
from .user import MyUser
from .milestone import Milestone
from datetime import datetime, timezone
class TestPlan(models.Model):
    test_plan_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255, unique=True)
    milestone_id = models.ForeignKey(Milestone, on_delete=models.CASCADE, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    test_case_filter = models.TextField(null=True, blank=True)
    project_id = models.ForeignKey('Project', on_delete=models.CASCADE)
    
    number_of_passed_test_cases = models.IntegerField(blank=True, default=0)
    number_of_failed_test_cases = models.IntegerField(blank=True, default=0)
    number_of_blocked_test_cases = models.IntegerField(blank=True, default=0)
    number_of_untested_test_cases = models.IntegerField(blank=True, default=0)
    number_of_partial_test_cases = models.IntegerField(blank=True, default=0)
    number_of_test_cases = models.IntegerField(blank=True, default=0)

    created_by = models.ForeignKey(MyUser, on_delete=models.CASCADE, related_name='created_test_plans')
    created_on = models.DateTimeField(auto_now_add=True)
    updated_by = models.ForeignKey(MyUser, on_delete=models.CASCADE, null=True, blank=True, related_name='updated_test_plans')
    updated_on = models.DateTimeField(null=True, blank=True)

    def save(self, *args, **kwargs):
        if self.pk is not None:
            self.updated_on = datetime.now(timezone.utc)
        super().save(*args, **kwargs)

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
    test_plan_id = models.ForeignKey(TestPlan, on_delete=models.CASCADE, related_name='test_runs')
    test_run_id = models.ForeignKey('TestRun', on_delete=models.CASCADE)