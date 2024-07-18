from django.db import models

class TestSuite(models.Model):
    test_suite_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255, unique=True)
    creator_id = models.IntegerField()
    description = models.TextField(null=True, blank=True)

class Section(models.Model):
    section_id = models.AutoField(primary_key=True)
    test_suite = models.ForeignKey(TestSuite, on_delete=models.CASCADE)
    name = models.CharField(max_length=255, unique=True)
    creator_id = models.IntegerField()
    subsection_id = models.IntegerField(null=True, blank=True)

class TestSuiteFiles(models.Model):
    file_id = models.AutoField(primary_key=True)
    file_path = models.CharField(max_length=255)
    test_suite = models.ForeignKey(TestSuite, on_delete=models.CASCADE)

