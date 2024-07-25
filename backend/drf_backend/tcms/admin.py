from django.contrib import admin

# Register your models here.

from django.contrib import admin
from django.contrib.auth import get_user_model
from authemail.admin import EmailUserAdmin
# import user
from .models import *

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
admin.site.register(TemplateForTestCase)
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