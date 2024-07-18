# Generated by Django 5.0.6 on 2024-07-18 08:10

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tcms', '0002_priorityfortestcase_templatefortestcase_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='StatusForTestCase',
            fields=[
                ('status_id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255, unique=True)),
                ('color', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='TestCaseResults',
            fields=[
                ('test_case_result_id', models.AutoField(primary_key=True, serialize=False)),
                ('creator_id', models.IntegerField()),
                ('result_blob', models.TextField()),
                ('version', models.CharField(blank=True, max_length=255, null=True)),
                ('comment', models.TextField(blank=True, null=True)),
                ('created_on', models.DateTimeField(auto_now_add=True)),
                ('result_time', models.TimeField()),
                ('status', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tcms.statusfortestcase')),
                ('test_case_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tcms.testcase')),
            ],
        ),
        migrations.CreateModel(
            name='TestCaseResultFiles',
            fields=[
                ('file_id', models.AutoField(primary_key=True, serialize=False)),
                ('file_path', models.CharField(max_length=255)),
                ('test_case_result', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tcms.testcaseresults')),
            ],
        ),
        migrations.CreateModel(
            name='BugTrackerTickets',
            fields=[
                ('bug_tracker_id', models.AutoField(primary_key=True, serialize=False)),
                ('bug_tracker', models.CharField(max_length=255)),
                ('test_case_result', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tcms.testcaseresults')),
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
            name='UserApiKey',
            fields=[
                ('key_id', models.AutoField(primary_key=True, serialize=False)),
                ('api_key', models.CharField(max_length=255, unique=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
