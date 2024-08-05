from django.db import models
from .user import MyUser
from .project import Project
from datetime import datetime, timezone

class Milestone(models.Model):
	name = models.CharField(max_length=255, null=False)
	parent_id = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True)
	description = models.TextField(null=True, blank=True)
	start_date = models.DateField(null=True, blank=True)
	end_date = models.DateField(null=True, blank=True)
	is_complete = models.BooleanField(default=False)
	project_id = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='milestones')

	number_of_passed_test_cases = models.IntegerField(blank=True, default=0)
	number_of_failed_test_cases = models.IntegerField(blank=True, default=0)
	number_of_blocked_test_cases = models.IntegerField(blank=True, default=0)
	number_of_untested_test_cases = models.IntegerField(blank=True, default=0)
	number_of_partial_test_cases = models.IntegerField(blank=True, default=0)
	number_of_test_cases = models.IntegerField(blank=True, default=0)

	created_by = models.ForeignKey('MyUser', on_delete=models.CASCADE, related_name='created_milestones')
	created_on = models.DateTimeField(auto_now_add=True)
	updated_by = models.ForeignKey('MyUser', on_delete=models.CASCADE, null=True, blank=True, related_name='updated_milestones')
	updated_on = models.DateTimeField(null=True, blank=True)

	is_completed = models.BooleanField(default=False)
	completed_on = models.DateTimeField(null=True, blank=True)

	def save(self, *args, **kwargs):
		if self.is_completed:
			self.completed_on = datetime.now(timezone.utc)
            
		if self.pk is not None:
			self.updated_on = datetime.now(timezone.utc)
		super().save(*args, **kwargs)

	def __str__(self):
		return self.name

class MilestoneTicket(models.Model):
	ticket_id = models.AutoField(primary_key=True)
	ticket = models.CharField(max_length=255, null=False)
	milestone_id = models.ForeignKey(Milestone, on_delete=models.CASCADE, related_name='tickets')

class MilestoneFile(models.Model):
	file_id = models.AutoField(primary_key=True)    
	file = models.FileField(upload_to='milestone_files/')
	milestone_id = models.ForeignKey(Milestone, on_delete=models.CASCADE, related_name='files')
