from typing import Any
from django.db import models
from .user import MyUser
from datetime import datetime, timezone

class TestSuite(models.Model):
    test_suite_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255, unique=True)
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

    created_by = models.ForeignKey('MyUser', on_delete=models.CASCADE, related_name='created_test_suites')
    created_on = models.DateTimeField(auto_now_add=True)
    updated_by = models.ForeignKey('MyUser', on_delete=models.CASCADE, null=True, blank=True, related_name='updated_test_suites')
    updated_on = models.DateTimeField(null=True, blank=True)

    def save(self, *args, **kwargs):
        is_new = self.pk is None
        if not is_new:
            self.updated_on = datetime.now(timezone.utc)
        super().save(*args, **kwargs)
        if is_new:
            Section.objects.create(
                test_suite_id=self,
                name="General Cases",
                created_by=self.created_by
            )

class Section(models.Model):
    section_id = models.AutoField(primary_key=True)
    parent_id = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True)
    test_suite_id = models.ForeignKey(TestSuite, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    created_by = models.ForeignKey('MyUser', on_delete=models.CASCADE, related_name='created_sections')
    created_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class TestSuiteFile(models.Model):
    file_id = models.AutoField(primary_key=True)
    file = models.FileField(upload_to='test_suite_files/')
    test_suite_id = models.ForeignKey('TestSuite', on_delete=models.CASCADE)
