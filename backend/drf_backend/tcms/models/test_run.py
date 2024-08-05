from typing import Any
from django.db import models
from .test_suite import TestSuite
from .test_case_result import TestCaseResult
from .test_case import TestCase
from datetime import datetime, timezone

class TestRunFile(models.Model):
    file_id = models.AutoField(primary_key=True)
    file = models.FileField(upload_to='test_run_files/')
    test_run_id = models.ForeignKey("TestRun", on_delete=models.CASCADE)

class TestRunTicket(models.Model):
    ticket_id = models.AutoField(primary_key=True)
    ticket = models.CharField(max_length=255, unique=True)
    test_run_id = models.ForeignKey("TestRun", on_delete=models.CASCADE)

class TestRunTestCaseResult(models.Model):
    test_run_id = models.ForeignKey('TestRun', on_delete=models.CASCADE, related_name='test_case_results')
    test_case_id = models.ForeignKey('TestCase', on_delete=models.CASCADE)
    test_case_result_id = models.ForeignKey('TestCaseResult', on_delete=models.CASCADE, related_name='test_run_test_case_results')
        
class TestRun(models.Model):
    test_run_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255, unique=True)
    test_suite_id = models.ForeignKey('TestSuite', on_delete=models.CASCADE, related_name='testruns')
    milestone_id = models.ForeignKey('Milestone', on_delete=models.CASCADE, null=True, blank=True, related_name='testrunsid')

    description = models.TextField(null=True, blank=True)
    ALL = 'ALL'
    SELECTED = 'SELECTED'
    REGEX_ON_NAME = 'REGEX_ON_NAME'
    TEST_CASE_FILTER_CHOICES = [
        (ALL, 'ALL'),
        (SELECTED, 'SELECTED'),
        (REGEX_ON_NAME, 'REGEX_ON_NAME'),
    ]
    test_case_filter = models.CharField(max_length=255, choices=TEST_CASE_FILTER_CHOICES, default=ALL)
    test_case_filter_value = models.TextField(null=True, blank=True)
    project_id = models.ForeignKey('Project', on_delete=models.CASCADE)
    is_complete = models.BooleanField(default=False)
    is_part_of_test_plan = models.BooleanField(default=False)

    number_of_passed_test_cases = models.IntegerField(blank=True, default=0)
    number_of_failed_test_cases = models.IntegerField(blank=True, default=0)
    number_of_blocked_test_cases = models.IntegerField(blank=True, default=0)
    number_of_untested_test_cases = models.IntegerField(blank=True, default=0)
    number_of_partial_test_cases = models.IntegerField(blank=True, default=0)
    number_of_test_cases = models.IntegerField(blank=True, default=0)

    created_by = models.ForeignKey('MyUser', on_delete=models.CASCADE, related_name='created_testruns')
    created_on = models.DateTimeField(auto_now_add=True)
    updated_by = models.ForeignKey('MyUser', on_delete=models.CASCADE, null=True, blank=True, related_name='updated_testruns')
    updated_on = models.DateTimeField(null=True, blank=True)
    assigned_to = models.ForeignKey('MyUser', on_delete=models.CASCADE, null=True, blank=True, related_name='assigned_testruns')


    is_completed = models.BooleanField(default=False)
    completed_on = models.DateTimeField(null=True, blank=True)

    def save(self, *args, **kwargs):
        if self.is_completed:
            self.completed_on = datetime.now(timezone.utc)
            
        if self.pk is not None:
            self.updated_on = datetime.now(timezone.utc)
        is_new = self.pk is None
        super().save(*args, **kwargs)
        if is_new:
            testcases = []
            if self.test_case_filter == self.ALL:
                testcases = TestCase.objects.filter(section_id__test_suite_id=self.test_suite_id).all()
            if self.test_case_filter == self.SELECTED:
                testcase_ids_list = [x.strip() for x in self.test_case_filter_value.split(',')]
                testcases = TestCase.objects.filter(section_id__test_suite_id=self.test_suite_id, test_case_id__in=testcase_ids_list).all()
            if self.test_case_filter == self.REGEX_ON_NAME:
                testcases = TestCase.objects.filter(section_id__test_suite_id=self.test_suite_id, title__regex=self.test_case_filter_value).all()
            
            for tc in testcases:
                testcase_result = TestCaseResult.objects.create(test_case_id=tc, created_by=self.created_by, status=TestCaseResult.UNTESTED)
                TestRunTestCaseResult.objects.create(test_run_id=self, test_case_id=tc, test_case_result_id=testcase_result)
            testcase_result = TestCaseResult.objects.filter(test_run_test_case_results__test_run_id=self.pk).first()
            if testcase_result:
                testcase_result.save()

    def __str__(self):
        return self.name