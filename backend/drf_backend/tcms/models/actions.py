from django.db import models

class UserAction(models.Model):
    user = models.ForeignKey('MyUser', on_delete=models.CASCADE)
    CREATED = 'CREATED'
    UPDATED = 'UPDATED'
    DELETED = 'DELETED'
    ACTION_CHOICES = [
        (CREATED, 'created'),
        (UPDATED, 'updated'),
        (DELETED, 'deleted'),
    ]
    TEST_CASE = 'TestCase'
    TEST_CASE_RESULT = 'TestCaseResult'
    SECTION = 'Section'
    TEST_SUITE = 'TestSuite'
    TEST_RUN = 'TestRun'
    TEST_PLAN = 'TestPlan'
    MILESTONE = 'Milestone'
    PROJECT = 'Project'
    ACTION_OBJECT_CHOICES = [
        (TEST_CASE, 'Testcase'),
        (TEST_CASE_RESULT, 'Testcase Result'),
        (SECTION, 'Section'),
        (TEST_SUITE, 'Test Suite'),
        (TEST_RUN, 'Test Run'),
        (TEST_PLAN, 'Test Plan'),
        (MILESTONE, 'Milestone'),
        (PROJECT, 'Project'),
    ]
    action = models.CharField(max_length=255, choices=ACTION_CHOICES)
    action_object = models.CharField(max_length=255, choices=ACTION_OBJECT_CHOICES)
    action_message = models.CharField(max_length=255)
    performed_on = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-performed_on']

    def __str__(self):
        return f'{self.user} - {self.action}'