# Generated by Django 5.0.7 on 2024-07-26 13:01

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
            name='StatusForTestCase',
            fields=[
                ('status_id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255, unique=True)),
                ('color', models.CharField(choices=[('red', 'red'), ('green', 'green'), ('yellow', 'yellow'), ('blue', 'blue'), ('purple', 'purple'), ('orange', 'orange'), ('black', 'black'), ('white', 'white'), ('gray', 'gray'), ('brown', 'brown'), ('pink', 'pink')], max_length=255)),
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
            name='Milestone',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('description', models.TextField(blank=True, null=True)),
                ('start_date', models.DateField(blank=True, null=True)),
                ('end_date', models.DateField(blank=True, null=True)),
                ('is_complete', models.BooleanField(default=False)),
                ('creator_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('parent_id', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='tcms.milestone')),
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
                ('creator_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
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
                ('name', models.CharField(max_length=255, unique=True)),
                ('creator_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('parent_id', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='tcms.section')),
            ],
        ),
        migrations.CreateModel(
            name='TestCase',
            fields=[
                ('test_case_id', models.AutoField(primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=255)),
                ('expected_results', models.TextField(blank=True, null=True)),
                ('automation_type', models.CharField(choices=[('None', 'None'), ('Need to Triage', 'Need to Triage'), ('BE', 'BE'), ('UI', 'UI'), ('BE & UI', 'BE & UI'), ("Can't Automate", "Can't Automate"), ('Automatable', 'Automatable'), ('Other', 'Other')], default='Need to Triage', max_length=255)),
                ('created_on', models.DateTimeField(auto_now_add=True)),
                ('estimate', models.IntegerField(blank=True, null=True)),
                ('template_type', models.CharField(choices=[('Test Case (Steps)', 'Test Case (Steps)'), ('Test Case (Text)', 'Test Case (Text)'), ('Exploratory Session', 'Exploratory Session'), ('Behavior Driven Development', 'Behavior Driven Development')], default='Test Case (Text)', max_length=255)),
                ('template_frame', models.TextField(default='')),
                ('expected_result', models.TextField(blank=True, null=True)),
                ('updated_on', models.DateTimeField(auto_now=True)),
                ('obsolete', models.BooleanField(default=False)),
                ('assigned_to', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='assigned_test_cases', to=settings.AUTH_USER_MODEL)),
                ('creator_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('priority_id', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='tcms.priorityfortestcase')),
                ('project_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='test_cases', to='tcms.project')),
                ('section_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='test_cases', to='tcms.section')),
                ('updated_by', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='updated_test_cases', to=settings.AUTH_USER_MODEL)),
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
                ('test_case_result_id_id', models.AutoField(primary_key=True, serialize=False)),
                ('result_blob', models.TextField()),
                ('version', models.CharField(blank=True, max_length=255, null=True)),
                ('comment', models.CharField(blank=True, max_length=255, null=True)),
                ('created_on', models.DateTimeField(auto_now_add=True)),
                ('result_time', models.TimeField()),
                ('creator_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('status_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tcms.statusfortestcase')),
                ('test_case_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tcms.testcase')),
            ],
        ),
        migrations.AddField(
            model_name='testcase',
            name='latest_result_id',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='tcms.testcaseresult'),
        ),
        migrations.CreateModel(
            name='BugTrackerTicket',
            fields=[
                ('bug_tracker_id', models.AutoField(primary_key=True, serialize=False)),
                ('bug_tracker', models.CharField(max_length=255)),
                ('test_case_result_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='tickets', to='tcms.testcaseresult')),
            ],
        ),
        migrations.CreateModel(
            name='TestCaseResultFile',
            fields=[
                ('file_id', models.AutoField(primary_key=True, serialize=False)),
                ('file', models.FileField(upload_to='test_case_result_files/')),
                ('test_case_result_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='files', to='tcms.testcaseresult')),
            ],
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
                ('name', models.CharField(max_length=255, unique=True)),
                ('description', models.TextField(blank=True, null=True)),
                ('test_case_filter', models.TextField(blank=True, null=True)),
                ('creator_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('milestone_id', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='tcms.milestone')),
                ('project_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tcms.project')),
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
            name='TestPlanTestCase',
            fields=[
                ('test_plan_test_case_id', models.AutoField(primary_key=True, serialize=False)),
                ('test_case', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tcms.testcase')),
                ('test_plan', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tcms.testplan')),
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
                ('name', models.CharField(max_length=255, unique=True)),
                ('creator_id', models.IntegerField()),
                ('description', models.TextField(blank=True, null=True)),
                ('test_case_filter', models.TextField(blank=True, null=True)),
                ('milestone_id', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='tcms.milestone')),
                ('project_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tcms.project')),
            ],
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
            name='TestRunTestCase',
            fields=[
                ('test_run_test_case_id', models.AutoField(primary_key=True, serialize=False)),
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
                ('creator_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('project_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tcms.project')),
            ],
        ),
        migrations.AddField(
            model_name='testrun',
            name='test_suite_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tcms.testsuite'),
        ),
        migrations.CreateModel(
            name='TestPlanTestSuite',
            fields=[
                ('test_plan_test_suite_id', models.AutoField(primary_key=True, serialize=False)),
                ('test_plan', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tcms.testplan')),
                ('test_suite', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tcms.testsuite')),
            ],
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
        migrations.AddField(
            model_name='testcase',
            name='type_id',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='tcms.typesfortestcase'),
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
            name='UserApiKey',
            fields=[
                ('key_id', models.AutoField(primary_key=True, serialize=False)),
                ('api_key', models.CharField(max_length=255, unique=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
