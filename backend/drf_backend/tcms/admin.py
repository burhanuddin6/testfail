from django.contrib import admin
from django import forms
from django.contrib.admin.helpers import ActionForm


# Register your models here.

from django.contrib import admin
from django.contrib.auth import get_user_model
from authemail.admin import EmailUserAdmin
# import user
from .models import *
from testrail.migration import ImportTestCases

class MyUserAdmin(EmailUserAdmin):
	fieldsets = (
		(None, {'fields': ('email', 'password')}),
		('Personal Info', {'fields': ('first_name', 'last_name')}),
		('Permissions', {'fields': ('is_active', 'is_staff', 
									   'is_superuser', 'is_verified', 
									   'groups', 'user_permissions')}),
		('Important dates', {'fields': ('last_login', 'date_joined')}),
		# ('Custom info', {'fields': ('date_of_birth',)}),
	)

admin.site.unregister(get_user_model())
admin.site.register(get_user_model(), MyUserAdmin)
admin.site.register(UserApiKey)
admin.site.register(UserAccountIntegration)

admin.site.register(TypesForTestCase)
admin.site.register(PriorityForTestCase)
admin.site.register(TestCase)
admin.site.register(TestCaseFile)
admin.site.register(TestCaseTicket)

admin.site.register(StatusForTestCase)
admin.site.register(TestCaseResult)
admin.site.register(TestCaseResultFile)
admin.site.register(BugTrackerTicket)

admin.site.register(TestPlan)
admin.site.register(TestPlanFile)
admin.site.register(TestPlanTicket)
admin.site.register(TestPlanTestCase)
admin.site.register(TestPlanTestSuite)

admin.site.register(TestRun)
admin.site.register(TestRunFile)
admin.site.register(TestRunTicket)
admin.site.register(TestRunTestCase)

admin.site.register(TestSuite)
admin.site.register(TestSuiteFile)
admin.site.register(Section)

admin.site.register(Milestone)
admin.site.register(MilestoneTicket)
admin.site.register(MilestoneFile)

admin.site.register(Project)

class SelectProjectForm(ActionForm):
	project = forms.ModelChoiceField(queryset=Project.objects.all())

@admin.action(description='Import testcases from selected csv files')
def import_testcases_from_csv(modeladmin, request, queryset):
	selected_project = request.POST.get('project')
	if not selected_project:
		return
	print(selected_project)
	importer = ImportTestCases(project_id=selected_project)
	try:
		#check if multiple files are selected
		if len(queryset) > 1:
			raise Exception("Please select only one CSV file")
		csv_file = queryset.first()
		if not csv_file.file.name.endswith('.csv'):
			raise Exception("Please select a CSV file")
		importer.handle(csv_file=csv_file.file.path)
	except Exception as e:
		message = f"Operation Failed: {e}"
		modeladmin.message_user(request, message, level='ERROR')
	else:
		message = "Operation Successful"
		modeladmin.message_user(request, message, level='SUCCESS')
	
class FileAdmin(admin.ModelAdmin):
	list_display = ('file', 'created_at')
	action_form = SelectProjectForm
	actions = [import_testcases_from_csv]

	# override the add form to add the current user in created_by feild
	def save_model(self, request, obj, form, change):
		obj.created_by = request.user
		obj.save()

admin.site.register(File, FileAdmin)