from django.db import models


class TestPlan(models.Model):
    test_plan_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255, unique=True)
    creator_id = models.IntegerField()
    milestone_id = models.IntegerField(null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    test_case_filter = models.TextField(null=True, blank=True)

class TestPlanFiles(models.Model):
    file_id = models.AutoField(primary_key=True)
    file_path = models.CharField(max_length=255)
    test_plan = models.ForeignKey(TestPlan, on_delete=models.CASCADE)

class TestPlanTicket(models.Model):
    ticket_id = models.AutoField(primary_key=True)
    ticket = models.CharField(max_length=255, unique=True)
    test_plan = models.ForeignKey(TestPlan, on_delete=models.CASCADE)


class TestPlanTestCase(models.Model):
    test_plan_test_case_id = models.AutoField(primary_key=True)
    test_plan = models.ForeignKey('TestPlan', on_delete=models.CASCADE)
    test_case = models.ForeignKey('TestCase', on_delete=models.CASCADE)

class TestPlanTestSuite(models.Model):
    test_plan_test_suite_id = models.AutoField(primary_key=True)
    test_plan = models.ForeignKey('TestPlan', on_delete=models.CASCADE)
    test_suite = models.ForeignKey('TestSuite', on_delete=models.CASCADE)