from django.db import models

# Create your models here.


from django.db import models
from authemail.models import EmailUserManager, EmailAbstractUser

class MyUser(EmailAbstractUser):
	# Custom fields
	# date_of_birth = models.DateField('Date of birth', null=True, blank=True)

	# Required
	objects = EmailUserManager()
	

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


# added by mariam

class StatusForTestCase(models.Model):
    status_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255, unique=True)
    color = models.IntegerField()

class TestCaseResults(models.Model):
    test_case_result_id = models.AutoField(primary_key=True)
    test_case_id = models.ForeignKey(TestCase, on_delete=models.CASCADE) # verify on_delete
    status = models.ForeignKey(StatusForTestCase, on_delete=models.CASCADE) # verify on_delete
    creator_id = models.IntegerField() # change to foreign key
    result_blob = models.TextField()
    version = models.CharField(max_length=255, null=True, blank=True)
    comment = models.TextField(null=True, blank=True)
    created_on = models.DateTimeField(auto_now_add=True)
    result_time = models.TimeField()


class TestCaseResultFiles(models.Model):
    file_id = models.AutoField(primary_key=True)
    file_path = models.CharField(max_length=255) # change to file = models.FileField(upload_to='test_case_files/')
    test_case_result = models.ForeignKey(TestCaseResults, on_delete=models.CASCADE) # verify on_delete

class BugTrackerTickets(models.Model):
    bug_tracker_id = models.AutoField(primary_key=True)
    bug_tracker = models.CharField(max_length=255)
    test_case_result = models.ForeignKey(TestCaseResults, on_delete=models.CASCADE) # verify on_delete







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






class User(models.Model):
    user_id = models.AutoField(primary_key=True)
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=64)
    last_name = models.CharField(max_length=64)
    profile_pic_path = models.CharField(max_length=256)

class UserApiKey(models.Model):
    key_id = models.AutoField(primary_key=True)
    api_key = models.CharField(max_length=255, unique=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

class UserAccountIntegration(models.Model):
    integration_id = models.AutoField(primary_key=True)
    platform = models.CharField(max_length=255)
    user = models.ForeignKey(User, on_delete=models.CASCADE)






class TestRunTestCase(models.Model):
    test_run_test_case_id = models.AutoField(primary_key=True)
    test_run = models.ForeignKey('TestRun', on_delete=models.CASCADE)







class TestPlanTestCase(models.Model):
    test_plan_test_case_id = models.AutoField(primary_key=True)
    test_plan = models.ForeignKey('TestPlan', on_delete=models.CASCADE)
    test_case = models.ForeignKey('TestCase', on_delete=models.CASCADE)

class TestPlanTestSuite(models.Model):
    test_plan_test_suite_id = models.AutoField(primary_key=True)
    test_plan = models.ForeignKey('TestPlan', on_delete=models.CASCADE)
    test_suite = models.ForeignKey('TestSuite', on_delete=models.CASCADE)