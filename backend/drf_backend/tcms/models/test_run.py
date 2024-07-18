from django.db import models

class TestRun(models.Model):
    test_run_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255, unique=True)
    test_suite = models.ForeignKey(TestSuite, on_delete=models.CASCADE)
    creator_id = models.IntegerField()
    milestone_id = models.IntegerField(null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    test_case_filter = models.TextField(null=True, blank=True)

class TestRunFiles(models.Model):
    file_id = models.AutoField(primary_key=True)
    file_path = models.CharField(max_length=255)
    test_run = models.ForeignKey(TestRun, on_delete=models.CASCADE)

class TestRunTicket(models.Model):
    ticket_id = models.AutoField(primary_key=True)
    ticket = models.CharField(max_length=255, unique=True)
    test_run = models.ForeignKey(TestRun, on_delete=models.CASCADE)

class TestRunTestCase(models.Model):
    test_run_test_case_id = models.AutoField(primary_key=True)
    test_run = models.ForeignKey('TestRun', on_delete=models.CASCADE)