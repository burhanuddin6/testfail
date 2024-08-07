from django.db import models
from .test_case import TestCase
from datetime import datetime, timezone
from .file import File
from .user import MyUser

class TestCaseResult(models.Model):
    test_case_result_id = models.AutoField(primary_key=True)
    test_case_id = models.ForeignKey(TestCase, on_delete=models.CASCADE)
    test_run_id = models.ForeignKey('TestRun', on_delete=models.CASCADE, related_name='test_case_results')
    latest_change_id = models.ForeignKey('TestCaseResultChanges', on_delete=models.CASCADE, null=True, blank=True)
    
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

    @classmethod
    def create_with_initial_change(cls, test_case, test_run, status, created_by, version='1.0', comment='', result_time='12:00:00'):
        test_case_result = cls.objects.create(test_case_id=test_case, test_run_id=test_run)
        change_data = {
            'test_case_result_id': test_case_result,
            'status': status,
            'version': version,
            'comment': comment,
            'result_time': result_time,
            'created_by': created_by,
        }
        change = TestCaseResultChanges.objects.create(**change_data)
        test_case_result.latest_change_id = change
        test_case_result.save()
        return test_case_result

class TestCaseResultChanges(models.Model):
    test_case_result_changes_id = models.AutoField(primary_key=True)
    test_case_result_id = models.ForeignKey(TestCaseResult, on_delete=models.CASCADE)
    status = models.CharField(max_length=255, choices=TestCaseResult.STATUS_CHOICES, default=TestCaseResult.UNTESTED)
    version = models.CharField(max_length=255, null=True, blank=True)
    comment = models.CharField(max_length=255, null=True, blank=True)
    result_time = models.TimeField(null=True, blank=True)
    defect = models.CharField(max_length=255, null=True, blank=True)
    elapsed_time_in_seconds = models.IntegerField(null=True, blank=True)
    created_by = models.ForeignKey(MyUser, on_delete=models.CASCADE, related_name='created_test_case_results')
    created_on = models.DateTimeField(auto_now_add=True)
    files = models.ManyToManyField(File, related_name='test_case_results', blank=True, null=True)
