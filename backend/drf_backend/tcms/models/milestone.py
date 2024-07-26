from django.db import models
from .user import MyUser
from .project import Project

class Milestone(models.Model):
	name = models.CharField(max_length=255, null=False)
	creator_id = models.ForeignKey(MyUser, on_delete=models.CASCADE)  # Replace creator_model with the appropriate model
	parent_id = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True)
	description = models.TextField(null=True, blank=True)
	start_date = models.DateField(null=True, blank=True)
	end_date = models.DateField(null=True, blank=True)
	is_complete = models.BooleanField(default=False)
	project_id = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='milestones')

class MilestoneTicket(models.Model):
	ticket_id = models.AutoField(primary_key=True)
	ticket = models.CharField(max_length=255, null=False)
	milestone_id = models.ForeignKey(Milestone, on_delete=models.CASCADE, related_name='tickets')

class MilestoneFile(models.Model):
	file_id = models.AutoField(primary_key=True)    
	file = models.FileField(upload_to='milestone_files/')
	milestone_id = models.ForeignKey(Milestone, on_delete=models.CASCADE, related_name='files')
