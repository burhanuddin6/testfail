from typing import Any
from django.db import models
from .test_suite import TestSuite
from .test_case_result import TestCaseResult
from .test_case import TestCase
from .user import MyUser
from .milestone import Milestone
from .project import Project
from .test_case_result import TestCaseResult

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
    creator_id = models.ForeignKey('MyUser', on_delete=models.CASCADE)
    milestone_id = models.ForeignKey('Milestone', on_delete=models.CASCADE, null=True, blank=True, related_name='testruns')
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

    def save(self, *args, **kwargs):
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
                testcases = TestCase.objects.filter(section_id__test_suite_id=self.test_suite_id, name__regex=self.test_case_filter_value).all()
            
            for tc in testcases:
                testcase_result = TestCaseResult.objects.create(test_case_id=tc, creator_id=self.creator_id, status=TestCaseResult.UNTESTED)
                TestRunTestCaseResult.objects.create(test_run_id=self, test_case_id=tc, test_case_result_id=testcase_result)
            

class TestRunTestCase(models.Model):
    test_run_test_case_id = models.AutoField(primary_key=True)
    test_run_id = models.ForeignKey('TestRun', on_delete=models.CASCADE)

