from typing import Any
from django.db import models
from .user import MyUser

class TestSuite(models.Model):
    test_suite_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255, unique=True)
    creator_id = models.ForeignKey(MyUser, on_delete=models.CASCADE)
    description = models.TextField(null=True, blank=True)
    project_id = models.ForeignKey('Project', on_delete=models.CASCADE)
    number_of_sections = models.IntegerField(blank=True, default=0)
    number_of_test_cases = models.IntegerField(blank=True, default=0)
    number_of_passed_test_cases = models.IntegerField(blank=True, default=0)
    number_of_failed_test_cases = models.IntegerField(blank=True, default=0)
    number_of_blocked_test_cases = models.IntegerField(blank=True, default=0)
    number_of_untested_test_cases = models.IntegerField(blank=True, default=0)
    number_of_partial_test_cases = models.IntegerField(blank=True, default=0)
    testcase_latest_result_comments_count = models.IntegerField(blank=True, default=0)

class Section(models.Model):
    section_id = models.AutoField(primary_key=True)
    parent_id = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True)
    test_suite_id = models.ForeignKey(TestSuite, on_delete=models.CASCADE)
    name = models.CharField(max_length=255, unique=True)
    creator_id = models.ForeignKey(MyUser, on_delete=models.CASCADE)

class TestSuiteFile(models.Model):
    file_id = models.AutoField(primary_key=True)
    file = models.FileField(upload_to='test_suite_files/')
    test_suite_id = models.ForeignKey(TestSuite, on_delete=models.CASCADE)
