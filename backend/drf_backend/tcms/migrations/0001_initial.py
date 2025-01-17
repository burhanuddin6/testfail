# Generated by Django 5.0.6 on 2024-08-07 18:39

import django.db.models.deletion
import django.utils.timezone
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='PriorityForTestCase',
            fields=[
                ('priority_id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='TypesForTestCase',
            fields=[
                ('type_id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='MyUser',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('first_name', models.CharField(blank=True, max_length=30, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=30, verbose_name='last name')),
                ('email', models.EmailField(max_length=255, unique=True, verbose_name='email address')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active.  Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('is_verified', models.BooleanField(default=False, help_text='Designates whether this user has completed the email verification process to allow login.', verbose_name='verified')),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='File',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('file', models.FileField(upload_to='files/')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('created_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Milestone',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('description', models.TextField(blank=True, null=True)),
                ('start_date', models.DateField(blank=True, null=True)),
                ('end_date', models.DateField(blank=True, null=True)),
                ('number_of_passed_test_cases', models.IntegerField(blank=True, default=0)),
                ('number_of_failed_test_cases', models.IntegerField(blank=True, default=0)),
                ('number_of_blocked_test_cases', models.IntegerField(blank=True, default=0)),
                ('number_of_untested_test_cases', models.IntegerField(blank=True, default=0)),
                ('number_of_partial_test_cases', models.IntegerField(blank=True, default=0)),
                ('number_of_test_cases', models.IntegerField(blank=True, default=0)),
                ('created_on', models.DateTimeField(auto_now_add=True)),
                ('updated_on', models.DateTimeField(blank=True, null=True)),
                ('is_complete', models.BooleanField(default=False)),
                ('completed_on', models.DateTimeField(blank=True, null=True)),
                ('created_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='created_milestones', to=settings.AUTH_USER_MODEL)),
                ('parent_id', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='tcms.milestone')),
                ('updated_by', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='updated_milestones', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='MilestoneFile',
            fields=[
                ('file_id', models.AutoField(primary_key=True, serialize=False)),
                ('file', models.FileField(upload_to='milestone_files/')),
                ('milestone_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='files', to='tcms.milestone')),
            ],
        ),
        migrations.CreateModel(
            name='MilestoneTicket',
            fields=[
                ('ticket_id', models.AutoField(primary_key=True, serialize=False)),
                ('ticket', models.CharField(max_length=255)),
                ('milestone_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='tickets', to='tcms.milestone')),
            ],
        ),
        migrations.CreateModel(
            name='Project',
            fields=[
                ('project_id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255)),
                ('description', models.TextField(blank=True, null=True)),
                ('show_description', models.BooleanField(default=False)),
                ('enable_testcase_approval', models.BooleanField(default=False)),
                ('created_on', models.DateTimeField(auto_now_add=True)),
                ('created_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='projects', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='milestone',
            name='project_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='milestones', to='tcms.project'),
        ),
        migrations.CreateModel(
            name='Section',
            fields=[
                ('section_id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255)),
                ('created_on', models.DateTimeField(auto_now_add=True)),
                ('created_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='created_sections', to=settings.AUTH_USER_MODEL)),
                ('parent_id', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='tcms.section')),
            ],
        ),
        migrations.CreateModel(
            name='TestCase',
            fields=[
                ('test_case_id', models.AutoField(primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=255)),
                ('template_type', models.CharField(choices=[('Test Case (Steps)', 'Test Case (Steps)'), ('Test Case (Text)', 'Test Case (Text)'), ('Exploratory Session', 'Exploratory Session'), ('Behavior Driven Development', 'Behavior Driven Development')], default='Test Case (Text)', max_length=255)),
                ('type_id', models.CharField(choices=[('Acceptance', 'Acceptance'), ('Accessibility', 'Accessibility'), ('Automatable', 'Automatable'), ('Automated', 'Automated'), ("Can't Automate", "Can't Automate"), ('Compatibility', 'Compatibility'), ('Destructive', 'Destructive'), ('Functional', 'Functional'), ('Other', 'Other'), ('Performance', 'Performance'), ('Regression', 'Regression'), ('Security', 'Security'), ('Smoke & Sanity', 'Smoke & Sanity'), ('Usability', 'Usability')], default='Other', max_length=255)),
                ('priority_id', models.CharField(choices=[('Critical', 'Critical'), ('High', 'High'), ('Medium', 'Medium'), ('Low', 'Low')], default='Low', max_length=255)),
                ('estimate', models.IntegerField(blank=True, null=True)),
                ('automation_type', models.CharField(choices=[('None', 'None'), ('Need to Triage', 'Need to Triage'), ('BE', 'BE'), ('UI', 'UI'), ('BE & UI', 'BE & UI'), ("Can't Automate", "Can't Automate"), ('Automatable', 'Automatable'), ('Other', 'Other')], default='Need to Triage', max_length=255)),
                ('obsolete', models.BooleanField(default=False)),
                ('custom_preconds', models.TextField(blank=True, null=True)),
                ('custom_steps', models.TextField(blank=True, null=True)),
                ('custom_expected', models.TextField(blank=True, null=True)),
                ('custom_steps_separated', models.TextField(blank=True, null=True)),
                ('custom_mission', models.TextField(blank=True, null=True)),
                ('custom_goals', models.TextField(blank=True, null=True)),
                ('created_on', models.DateTimeField(auto_now_add=True)),
                ('updated_on', models.DateTimeField(blank=True, null=True)),
                ('assigned_to', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='assigned_test_cases', to=settings.AUTH_USER_MODEL)),
                ('created_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='created_test_cases', to=settings.AUTH_USER_MODEL)),
                ('project_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='test_cases', to='tcms.project')),
                ('section_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='test_cases', to='tcms.section')),
                ('updated_by', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='updated_test_cases', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='TestCaseFile',
            fields=[
                ('file_id', models.AutoField(primary_key=True, serialize=False)),
                ('file', models.FileField(upload_to='test_case_files/')),
                ('test_case_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='files', to='tcms.testcase')),
            ],
        ),
        migrations.CreateModel(
            name='TestCaseResult',
            fields=[
                ('test_case_result_id', models.AutoField(primary_key=True, serialize=False)),
                ('test_case_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tcms.testcase')),
            ],
        ),
        migrations.CreateModel(
            name='TestCaseResultChanges',
            fields=[
                ('test_case_result_changes_id', models.AutoField(primary_key=True, serialize=False)),
                ('status', models.CharField(choices=[('PASS', 'PASS'), ('FAIL', 'FAIL'), ('BLOCKED', 'BLOCKED'), ('ERROR', 'ERROR'), ('UNTESTED', 'UNTESTED'), ('PARTIAL', 'PARTIAL')], default='UNTESTED', max_length=255)),
                ('version', models.CharField(blank=True, max_length=255, null=True)),
                ('comment', models.CharField(blank=True, max_length=255, null=True)),
                ('result_time', models.TimeField(blank=True, null=True)),
                ('defect', models.CharField(blank=True, max_length=255, null=True)),
                ('elapsed_time_in_seconds', models.IntegerField(blank=True, null=True)),
                ('created_on', models.DateTimeField(auto_now_add=True)),
                ('assigned_to', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='assigned_test_case_results', to=settings.AUTH_USER_MODEL)),
                ('created_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='created_test_case_results', to=settings.AUTH_USER_MODEL)),
                ('files', models.ManyToManyField(blank=True, null=True, related_name='test_case_results', to='tcms.file')),
                ('test_case_result_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tcms.testcaseresult')),
            ],
        ),
        migrations.AddField(
            model_name='testcaseresult',
            name='latest_change_id',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='tcms.testcaseresultchanges'),
        ),
        migrations.CreateModel(
            name='TestCaseTicket',
            fields=[
                ('test_case_ticket_id', models.AutoField(primary_key=True, serialize=False)),
                ('ticket', models.CharField(max_length=255)),
                ('test_case_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='tickets', to='tcms.testcase')),
            ],
        ),
        migrations.CreateModel(
            name='TestPlan',
            fields=[
                ('test_plan_id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255)),
                ('description', models.TextField(blank=True, null=True)),
                ('test_case_filter', models.TextField(blank=True, null=True)),
                ('selection', models.JSONField(blank=True, null=True)),
                ('number_of_passed_test_cases', models.IntegerField(blank=True, default=0)),
                ('number_of_failed_test_cases', models.IntegerField(blank=True, default=0)),
                ('number_of_blocked_test_cases', models.IntegerField(blank=True, default=0)),
                ('number_of_untested_test_cases', models.IntegerField(blank=True, default=0)),
                ('number_of_partial_test_cases', models.IntegerField(blank=True, default=0)),
                ('number_of_test_cases', models.IntegerField(blank=True, default=0)),
                ('created_on', models.DateTimeField(auto_now_add=True)),
                ('updated_on', models.DateTimeField(blank=True, null=True)),
                ('is_complete', models.BooleanField(default=False)),
                ('completed_on', models.DateTimeField(blank=True, null=True)),
                ('created_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='created_test_plans', to=settings.AUTH_USER_MODEL)),
                ('milestone_id', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='testplans', to='tcms.milestone')),
                ('project_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tcms.project')),
                ('updated_by', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='updated_test_plans', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='TestPlanFile',
            fields=[
                ('file_id', models.AutoField(primary_key=True, serialize=False)),
                ('file', models.FileField(upload_to='test_plan_files/')),
                ('test_plan_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tcms.testplan')),
            ],
        ),
        migrations.CreateModel(
            name='TestPlanTicket',
            fields=[
                ('ticket_id', models.AutoField(primary_key=True, serialize=False)),
                ('ticket', models.CharField(max_length=255, unique=True)),
                ('test_plan_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tcms.testplan')),
            ],
        ),
        migrations.CreateModel(
            name='TestRun',
            fields=[
                ('test_run_id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255)),
                ('description', models.TextField(blank=True, null=True)),
                ('test_case_filter', models.CharField(choices=[('ALL', 'ALL'), ('SELECTED', 'SELECTED'), ('REGEX_ON_NAME', 'REGEX_ON_NAME')], default='ALL', max_length=255)),
                ('test_case_filter_value', models.TextField(blank=True, null=True)),
                ('is_part_of_test_plan', models.BooleanField(default=False)),
                ('number_of_passed_test_cases', models.IntegerField(blank=True, default=0)),
                ('number_of_failed_test_cases', models.IntegerField(blank=True, default=0)),
                ('number_of_blocked_test_cases', models.IntegerField(blank=True, default=0)),
                ('number_of_untested_test_cases', models.IntegerField(blank=True, default=0)),
                ('number_of_partial_test_cases', models.IntegerField(blank=True, default=0)),
                ('number_of_test_cases', models.IntegerField(blank=True, default=0)),
                ('created_on', models.DateTimeField(auto_now_add=True)),
                ('updated_on', models.DateTimeField(blank=True, null=True)),
                ('is_complete', models.BooleanField(default=False)),
                ('completed_on', models.DateTimeField(blank=True, null=True)),
                ('assigned_to', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='assigned_testruns', to=settings.AUTH_USER_MODEL)),
                ('created_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='created_testruns', to=settings.AUTH_USER_MODEL)),
                ('milestone_id', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='testruns', to='tcms.milestone')),
                ('project_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tcms.project')),
                ('updated_by', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='updated_testruns', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='TestPlanTestRun',
            fields=[
                ('test_plan_test_run_id', models.AutoField(primary_key=True, serialize=False)),
                ('test_plan_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='test_runs', to='tcms.testplan')),
                ('test_run_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='test_plan_test_runs', to='tcms.testrun')),
            ],
        ),
        migrations.AddField(
            model_name='testcaseresult',
            name='test_run_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='test_case_results', to='tcms.testrun'),
        ),
        migrations.CreateModel(
            name='TestRunFile',
            fields=[
                ('file_id', models.AutoField(primary_key=True, serialize=False)),
                ('file', models.FileField(upload_to='test_run_files/')),
                ('test_run_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tcms.testrun')),
            ],
        ),
        migrations.CreateModel(
            name='TestRunTicket',
            fields=[
                ('ticket_id', models.AutoField(primary_key=True, serialize=False)),
                ('ticket', models.CharField(max_length=255, unique=True)),
                ('test_run_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tcms.testrun')),
            ],
        ),
        migrations.CreateModel(
            name='TestSuite',
            fields=[
                ('test_suite_id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255, unique=True)),
                ('description', models.TextField(blank=True, null=True)),
                ('number_of_sections', models.IntegerField(blank=True, default=0)),
                ('number_of_test_cases', models.IntegerField(blank=True, default=0)),
                ('number_of_passed_test_cases', models.IntegerField(blank=True, default=0)),
                ('number_of_failed_test_cases', models.IntegerField(blank=True, default=0)),
                ('number_of_blocked_test_cases', models.IntegerField(blank=True, default=0)),
                ('number_of_untested_test_cases', models.IntegerField(blank=True, default=0)),
                ('number_of_partial_test_cases', models.IntegerField(blank=True, default=0)),
                ('testcase_latest_result_comments_count', models.IntegerField(blank=True, default=0)),
                ('created_on', models.DateTimeField(auto_now_add=True)),
                ('updated_on', models.DateTimeField(blank=True, null=True)),
                ('created_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='created_test_suites', to=settings.AUTH_USER_MODEL)),
                ('project_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tcms.project')),
                ('updated_by', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='updated_test_suites', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='testrun',
            name='test_suite_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='testruns', to='tcms.testsuite'),
        ),
        migrations.AddField(
            model_name='section',
            name='test_suite_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tcms.testsuite'),
        ),
        migrations.CreateModel(
            name='TestSuiteFile',
            fields=[
                ('file_id', models.AutoField(primary_key=True, serialize=False)),
                ('file', models.FileField(upload_to='test_suite_files/')),
                ('test_suite_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tcms.testsuite')),
            ],
        ),
        migrations.CreateModel(
            name='UserAccountIntegration',
            fields=[
                ('integration_id', models.AutoField(primary_key=True, serialize=False)),
                ('platform', models.CharField(max_length=255)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='UserAction',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('action', models.CharField(choices=[('CREATED', 'created'), ('UPDATED', 'updated'), ('DELETED', 'deleted')], max_length=255)),
                ('action_object', models.CharField(choices=[('TestCase', 'Testcase'), ('TestCaseResult', 'Testcase Result'), ('Section', 'Section'), ('TestSuite', 'Test Suite'), ('TestRun', 'Test Run'), ('TestPlan', 'Test Plan'), ('Milestone', 'Milestone'), ('Project', 'Project')], max_length=255)),
                ('action_message', models.CharField(max_length=255)),
                ('performed_on', models.DateTimeField(auto_now_add=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['-performed_on'],
            },
        ),
        migrations.CreateModel(
            name='UserApiKey',
            fields=[
                ('key_id', models.AutoField(primary_key=True, serialize=False)),
                ('api_key', models.CharField(max_length=255, unique=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
