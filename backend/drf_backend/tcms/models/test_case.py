from django.db import models

# Create your models here.
	

class TypesForTestCase(models.Model):
    type_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255, unique=True)

class PriorityForTestCase(models.Model):
    priority_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255, unique=True)
    weight = models.IntegerField()

class TemplateForTestCase(models.Model):
    template_id = models.AutoField(primary_key=True)
    template_name = models.CharField(max_length=255)
    template_text = models.TextField()

class TestCase(models.Model):
    test_case_id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=255)
    latest_result_id = models.IntegerField(null=True, blank=True)
    type = models.ForeignKey(TypesForTestCase, on_delete=models.SET_NULL, null=True)
    priority = models.ForeignKey(PriorityForTestCase, on_delete=models.SET_NULL, null=True)
    created_on = models.DateTimeField(auto_now_add=True)
    estimate = models.IntegerField(null=True, blank=True)
    section_id = models.IntegerField(null=True, blank=True)
    template = models.ForeignKey(TemplateForTestCase, on_delete=models.SET_NULL, null=True)
    template_blob = models.TextField()
    update_id = models.IntegerField(null=True, blank=True)
    obsolete = models.BooleanField(default=False)
    creator_id = models.IntegerField(null=True, blank=True)

class TestCaseFiles(models.Model):
    file_id = models.AutoField(primary_key=True)
    file = models.FileField(upload_to='test_case_files/')
    test_case = models.ForeignKey(TestCase, related_name='files', on_delete=models.CASCADE)

class TestCaseTickets(models.Model):
    test_case_ticket_id = models.AutoField(primary_key=True)
    ticket = models.CharField(max_length=255)
    test_case = models.ForeignKey(TestCase, related_name='tickets', on_delete=models.CASCADE)

    