from django.db import models
from .test_case import TestCase
from datetime import datetime, timezone

class TestCaseResult(models.Model):
    test_case_result_id = models.AutoField(primary_key=True)
    test_case_id = models.ForeignKey(TestCase, on_delete=models.CASCADE) 
    PASS = 'PASS'
    FAIL = 'FAIL'
    BLOCKED = 'BLOCKED'
    ERROR = 'ERROR'
    UNTESTED = 'UNTESTED'
    PARTIAL = 'PARTIAL'
    STATUS_CHOICES = [
        (PASS, 'PASS'),
        (FAIL, 'FAIL'),
        (BLOCKED, 'BLOCKED'),
        (ERROR, 'ERROR'),
        (UNTESTED, 'UNTESTED'),
        (PARTIAL, 'PARTIAL'),
    ]
    status = models.CharField(max_length=255, choices=STATUS_CHOICES, default=UNTESTED)
    result_blob = models.TextField()
    version = models.CharField(max_length=255, null=True, blank=True)
    comment = models.CharField(max_length=255, null=True, blank=True)
    result_time = models.TimeField(null=True, blank=True)

    created_by = models.ForeignKey('MyUser', on_delete=models.CASCADE, related_name='created_test_case_results')
    created_on = models.DateTimeField(auto_now_add=True)
    updated_by = models.ForeignKey('MyUser', on_delete=models.CASCADE, null=True, blank=True, related_name='updated_test_case_results')
    updated_on = models.DateTimeField(null=True, blank=True)

    def save(self, *args, **kwargs):
        if self.pk is not None:
            self.updated_on = datetime.now(timezone.utc)
        super().save(*args, **kwargs)
        testcase = self.test_case_id
        testcase.latest_result_id = self
        testcase.save()


class TestCaseResultFile(models.Model):
    file_id = models.AutoField(primary_key=True)
    file = models.FileField(upload_to='test_case_result_files/')
    test_case_result_id = models.ForeignKey(TestCaseResult, on_delete=models.CASCADE, related_name='files')

class BugTrackerTicket(models.Model):
    bug_tracker_id = models.AutoField(primary_key=True)
    bug_tracker = models.CharField(max_length=255)
    test_case_result_id = models.ForeignKey(TestCaseResult, on_delete=models.CASCADE, related_name='tickets')   


