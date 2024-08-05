from django.db import models
from .user import MyUser
from .milestone import Milestone
from datetime import datetime, timezone
from django.db.models import JSONField
from .test_suite import TestSuite, Section
from .test_run import TestRun

class TestPlan(models.Model):
    test_plan_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255, unique=True)
    milestone_id = models.ForeignKey(Milestone, on_delete=models.CASCADE, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    test_case_filter = models.TextField(null=True, blank=True)
    project_id = models.ForeignKey('Project', on_delete=models.CASCADE)
    selection = JSONField(null=True, blank=True)
    
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

    is_completed = models.BooleanField(default=False)
    completed_on = models.DateTimeField(null=True, blank=True)

    def save(self, *args, **kwargs):
        
        if self.is_completed:
            self.completed_on = datetime.now(timezone.utc)
            
        is_new = self.pk is None
        if not is_new:
            self.updated_on = datetime.now(timezone.utc)
        super().save(*args, **kwargs)
        # Save the instance first
        if is_new:
            # Process the selection field to create TestRun instances
            for entry in self.selection:
                test_suite_id = entry.get('test_suite_id')
                test_suite_name = entry.get('test_suite_name')
                selection_type = entry.get('selection_type')
                selection_data = entry.get('selection')

                # Fetch the test suite
                try:
                    test_suite = TestSuite.objects.get(pk=test_suite_id)
                except TestSuite.DoesNotExist:
                    continue
                
                test_case_filter = ""
                lst = []
                if selection_type == TestRun.SELECTED:
                    for section in selection_data:
                        try:
                            section_id = Section.objects.get(pk=section['section_id'])
                            lst.append(", ".join([str(tc['test_case_id']) for tc in section['test_cases']]))
                        except Section.DoesNotExist:
                            continue
                    test_case_filter = ", ".join(lst)
                elif selection_type == TestRun.REGEX_ON_NAME:
                    test_case_filter = selection_data
                # Create TestRun instance
                test_run = TestRun.objects.create(
                    name=f"{test_suite_name} Test Run",
                    test_suite_id=test_suite,
                    milestone_id=self.milestone_id,
                    test_case_filter=selection_type,
                    test_case_filter_value=test_case_filter,
                    project_id=self.project_id,
                    created_by=self.created_by,
                    is_part_of_test_plan=True
                )

                # Create TestPlanTestRun association
                TestPlanTestRun.objects.create(
                    test_plan_id=self,
                    test_run_id=test_run
                )
    
            
    def __str__(self):
        return self.name

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