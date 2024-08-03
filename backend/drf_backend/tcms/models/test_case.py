from django.db import models
from .user import MyUser
# Create your models here.
from datetime import datetime, timezone

class TypesForTestCase(models.Model):
    type_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255, unique=True)

class PriorityForTestCase(models.Model):
    priority_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255, unique=True)
    

class TestCase(models.Model):
    test_case_id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=255)
    expected_results = models.TextField(null=True, blank=True)
    latest_result_id = models.ForeignKey('TestCaseResult', on_delete=models.SET_NULL, null=True, blank=True)
    type_id = models.ForeignKey(TypesForTestCase, on_delete=models.SET_NULL, null=True)
    AUTOMATION_TYPE_CHOICES = (
        ('None', 'None'),
        ('Need to Triage', 'Need to Triage'),
        ('BE', 'BE'),
        ('UI', 'UI'),
        ('BE & UI', 'BE & UI'),
        ("Can't Automate", "Can't Automate"),
        ('Automatable', 'Automatable'),
        ('Other', 'Other'),
    )
    automation_type = models.CharField(max_length=255, choices=AUTOMATION_TYPE_CHOICES, default='Need to Triage')
    priority_id = models.ForeignKey(PriorityForTestCase, on_delete=models.SET_NULL, null=True)
    estimate = models.IntegerField(null=True, blank=True)
    section_id = models.ForeignKey('Section', on_delete=models.CASCADE, related_name='test_cases')
    # the template helps to lay out the data
    STEPS = 'Test Case (Steps)'
    TEXT = 'Test Case (Text)'
    EXPLORATORY = 'Exploratory Session'
    BDD = 'Behavior Driven Development'
    TEMPLATE_TYPE_CHOICES = {
        STEPS: 'Test Case (Steps)',
        TEXT: 'Test Case (Text)',
        EXPLORATORY: 'Exploratory Session',
        BDD: 'Behavior Driven Development',
    }
    template_type = models.CharField(max_length=255, choices=TEMPLATE_TYPE_CHOICES, default='Test Case (Text)')
    template_frame = models.TextField(default='')
    expected_result = models.TextField(null=True, blank=True)
    obsolete = models.BooleanField(default=False)
    project_id = models.ForeignKey('Project', on_delete=models.CASCADE, related_name='test_cases')
    assigned_to = models.ForeignKey(MyUser, on_delete=models.SET_NULL, null=True, related_name='assigned_test_cases')

    created_by = models.ForeignKey('MyUser', on_delete=models.CASCADE, related_name='created_test_cases')
    created_on = models.DateTimeField(auto_now_add=True)
    updated_by = models.ForeignKey('MyUser', on_delete=models.CASCADE, null=True, blank=True, related_name='updated_test_cases')
    updated_on = models.DateTimeField(null=True, blank=True)

    def save(self, *args, **kwargs):
        if self.pk is not None:
            self.updated_on = datetime.now(timezone.utc)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title
    
class TestCaseFile(models.Model):
    file_id = models.AutoField(primary_key=True)
    file = models.FileField(upload_to='test_case_files/')
    test_case_id = models.ForeignKey(TestCase, related_name='files', on_delete=models.CASCADE)

class TestCaseTicket(models.Model):
    test_case_ticket_id = models.AutoField(primary_key=True)
    ticket = models.CharField(max_length=255)
    test_case_id = models.ForeignKey(TestCase, related_name='tickets', on_delete=models.CASCADE)



























