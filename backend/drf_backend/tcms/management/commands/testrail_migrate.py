# your_app/management/commands/migrate_data.py

from django.core.management.base import BaseCommand
from tcms.models import *
from tcms.models.testrail_models import *

#import 'db' from settings.py
from django.conf import settings

class Command(BaseCommand):
    help = 'Migrate data from source to destination database'

    def handle(self, *args, **kwargs):
        # migrate
        self.migrate_user()
        self.migrate_project()

    def migrate_user(self):
        # Migrate user data
        read_user_qs = TestrailUsers.objects.using(settings.TESTRAIL_DB).all()
        for user in read_user_qs:
            if not MyUser.objects.filter(email=user.email).exists():
                MyUser.objects.create(
                    email=user.email,
                    first_name=user.name.split(' ')[0],
                    last_name=user.name.split(' ')[1] if len(user.name.split(' ')) > 1 else '',
                    is_active=user.is_active,
                    is_staff=user.is_admin,
                    is_superuser=user.is_admin,
                    is_verified=True,
                )

    def migrate_project(self):
        # Migrate project data
        read_project_qs = TestrailProjects.objects.using(settings.TESTRAIL_DB).all()
        for project in read_project_qs:
            if not Project.objects.filter(name=project.name).exists():
                created_by_email = TestrailUsers.objects.using(settings.TESTRAIL_DB).get(id=TestrailProjectAssignment.objects.using(settings.TESTRAIL_DB).get(project_id=project.id).user_id).email
                Project.objects.create(
                    name=project.name,
                    description=project.announcement,
                    created_by=MyUser.objects.get(email=created_by_email),
                    show_description=True,
                    enable_testcase_approval= project.is_test_case_approval_enabled,
                )

    # def migrate_