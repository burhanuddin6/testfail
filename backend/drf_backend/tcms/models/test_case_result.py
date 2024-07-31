from django.db import models
from .test_case import TestCase
from .user import MyUser

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
    creator_id = models.ForeignKey(MyUser, on_delete=models.CASCADE)
    result_blob = models.TextField()
    version = models.CharField(max_length=255, null=True, blank=True)
    comment = models.CharField(max_length=255, null=True, blank=True)
    created_on = models.DateTimeField(auto_now_add=True)
    result_time = models.IntegerField(null=True, blank=True)

    def save(self, *args, **kwargs):
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


