from django.db import models
from .test_case import TestCase
from .user import MyUser

class StatusForTestCase(models.Model):
    status_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255, unique=True)
    # color choices
    COLORCHOICES = (
        ('red', 'red'),
        ('green', 'green'),
        ('yellow', 'yellow'),
        ('blue', 'blue'),
        ('purple', 'purple'),
        ('orange', 'orange'),
        ('black', 'black'),
        ('white', 'white'),
        ('gray', 'gray'),
        ('brown', 'brown'),
        ('pink', 'pink'),
    )
    color = models.CharField(max_length=255, choices=COLORCHOICES)

class TestCaseResult(models.Model):
    test_case_result_id_id = models.AutoField(primary_key=True)
    test_case_id = models.ForeignKey(TestCase, on_delete=models.CASCADE) 
    status_id = models.ForeignKey(StatusForTestCase, on_delete=models.CASCADE)
    creator_id = models.ForeignKey(MyUser, on_delete=models.CASCADE)
    result_blob = models.TextField()
    version = models.CharField(max_length=255, null=True, blank=True)
    comment = models.CharField(max_length=255, null=True, blank=True)
    created_on = models.DateTimeField(auto_now_add=True)
    result_time = models.TimeField()


class TestCaseResultFile(models.Model):
    file_id = models.AutoField(primary_key=True)
    file = models.FileField(upload_to='test_case_result_files/')
    test_case_result_id = models.ForeignKey(TestCaseResult, on_delete=models.CASCADE, related_name='files')

class BugTrackerTicket(models.Model):
    bug_tracker_id = models.AutoField(primary_key=True)
    bug_tracker = models.CharField(max_length=255)
    test_case_result_id = models.ForeignKey(TestCaseResult, on_delete=models.CASCADE, related_name='tickets')   


