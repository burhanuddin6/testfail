import os
import django
from datetime import datetime

# os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'drf_backend.settings')
# django.setup()

import csv
from django.core.management.base import BaseCommand
from tcms.models import (
    TestCase, TypesForTestCase, PriorityForTestCase, 
    MyUser, TestSuite, Section, Project
)
if __name__ == "__main__":
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'drf_backend.settings')
    django.setup()

class ImportTestCases():
    help = 'Import test cases from a CSV file'

    def __init__(self, *args, **kwargs):
        project_id = kwargs.get('project_id')
        if not project_id:
            raise ValueError("Project ID is required")
        print(project_id)
        self.project = Project.objects.get(project_id=project_id)
        if not self.project:
            raise ValueError(f"Project {project_id} not found")

    def add_arguments(self, parser):
        parser.add_argument('csv_file', type=str)

    def handle(self, *args, **options):
        csv_file_path = options['csv_file']
        
        with open(csv_file_path, mode='r') as file:
            reader = csv.DictReader(file)
            # check if all required columns are present: "ID","Title","Assigned To","Automation Type","Created By","Created On","Estimate","Expected Result","Forecast","Goals","Mission","Preconditions","Priority","References","Section","Section Depth","Section Description","Section Hierarchy","Steps","Steps (Multi)","Steps (Additional Info)","Steps (Expected Result)","Steps (References)","Steps (Shared step ID)","Steps (Step)","Suite","Suite ID","Template","Type","Updated By","Updated On"
            required_columns = ["ID","Title","Assigned To","Automation Type","Created By","Created On","Estimate","Expected Result","Forecast","Goals","Mission","Preconditions","Priority","References","Section","Section Depth","Section Description","Section Hierarchy","Steps","Steps (Multi)","Steps (Additional Info)","Steps (Expected Result)","Steps (References)","Steps (Shared step ID)","Steps (Step)","Suite","Suite ID","Template","Type","Updated By","Updated On"]
            if not all([col in reader.fieldnames for col in required_columns]):
                raise ValueError(f"Missing required columns: {', '.join([col for col in required_columns if col not in reader.fieldnames])}")
            for row in reader:
                self.import_row(row)

    def import_row(self, row):
        # Handle Sections and Test Suites
        self.user = self.get_or_create_user(row['Created By'])
        self.priority = self.get_or_create_priority(row['Priority'])
        self.type = self.get_or_create_type(row['Type'])
        self.test_suite = self.get_or_create_suite(f'{row['Suite ID']}::{row['Suite']}', user=self.user, project=self.project)
        self.section = self.get_or_create_section(section_name=row['Section'], section_heirarchy=row['Section Hierarchy'], test_suite=self.test_suite, user=self.user)
        
        testcase_title = f"{row['ID']}::{row['Title']}"
        testcase_automation_type = row['Automation Type']
        testcase_estimate = row['Estimate']
        testcase_expected_result = row['Expected Result']
        # testcase_is_obsolete = not (row['Obsolete'].strip() == 'No')
        test_case_updated_by = self.get_or_create_user(row['Updated By'])
        test_case_updated_on = datetime.strptime(row['Updated On'], "%m/%d/%Y %I:%M %p")
        test_case_created_on = datetime.strptime(row['Created On'], "%m/%d/%Y %I:%M %p")
        testcase_template_type = row['Template']
        if testcase_template_type == TestCase.TEXT:
            testcase_template_frame = f"%%Preconditions%%\n{row['Preconditions']}\n\n%%Step%%\n{row['Steps']}\n\n%%Expected Result%%\n{row['Steps (Expected Result)']}"
        elif testcase_template_type == TestCase.STEPS:
            steps = [x.split('.')[1].strip() for x in row['Steps (Step)'].split('\n')]
            expected_results = [x.split('.')[1].strip() for x in row['Steps (Expected Result)'].split('\n')]
            testcase_template_frame = f'%%Preconditions%%\n{row['Preconditions']}\n\n' + '\n\n'.join([f"%%Step%%\n{step}\n\n%%Expected Result%%\n{expected_results[i]}" for i, step in enumerate(steps)])
        elif testcase_template_type == TestCase.EXPLORATORY:
            testcase_template_frame = f'%%Mission%%\n{row["Mission"]}\n\n%%Goals%%\n{row["Goals"]}'
        elif testcase_template_type == TestCase.BDD:
            testcase_template_frame =   f'%%Preconditions%%\n{row["Preconditions"]}\n\n'
        else:
            raise ValueError(f"Unknown template type: {testcase_template_type}")
        
        
        self.assigned_to = self.get_or_create_user(row['Assigned To'])

        # Handle Test Cases
        test_case, created = TestCase.objects.get_or_create(
            title = testcase_title,
            project_id = self.project,
            defaults={
                'priority_id': self.priority,
                'type_id': self.type,
                'automation_type': testcase_automation_type,
                'estimate': int(''.join([x for x in testcase_estimate.split() if x.isdigit()]) or 0),
                'template_type': testcase_template_type,
                'template_frame': testcase_template_frame,
                # 'obsolete': testcase_is_obsolete,
                'project_id': self.project, 
                'section_id': self.section,
                'assigned_to': self.assigned_to,
                'created_by': self.user,
                'created_on': test_case_created_on,
                'updated_on': test_case_updated_on,
                'updated_by': test_case_updated_by,
                'expected_result': testcase_expected_result
            }
        )

    def get_or_create_type(self, type_name):
        type_name = type_name.strip()
        if type_name not in [x[1] for x in TestCase.TYPE_CHOICES]:
            raise ValueError(f"Unknown type from testrail: {type_name}")
        return type_name

    def get_or_create_priority(self, priority_name):
        priority_name = priority_name.strip()
        if priority_name not in [x[1] for x in TestCase.PRIORITY_CHOICES]:
            raise ValueError(f"Unknown priority from testrail: {priority_name}")
        return priority_name

    def get_or_create_user(self, name):
        name = name.split(' ')
        if len(name) == 1:
            first_name = name[0]
            last_name = ''
        else:
            first_name, last_name = name
        if not MyUser.objects.filter(first_name=first_name, last_name=last_name).exists():
            user = MyUser.objects.create_user(first_name=first_name, last_name=last_name, email=f"{first_name.lower()+last_name.lower()}@example.com", password='password')
            user.save()
        return MyUser.objects.get(first_name=first_name, last_name=last_name)

    def get_or_create_section(self, section_name, section_heirarchy, test_suite, user):
        section_heirarchy = [x.strip() for x in section_heirarchy.split('>')]
        print(section_heirarchy)
        sections = []
        for section_name in section_heirarchy:
            section, created = Section.objects.get_or_create(
                name = section_name,
                defaults={
                    'creator_id': user,
                    'test_suite_id': test_suite
                }
            )
            sections.append(section)
        if len(sections) > 1:
            for i in range(1, len(sections)):
                sections[i].parent_id = sections[i-1]
                sections[i].save()
        return sections[-1]

    def get_or_create_suite(self, suite_name, user, project):
        return TestSuite.objects.get_or_create(
            name=suite_name,
            project_id=project,
            defaults={
                'creator_id': user, 
                'project_id': project,
                'description': ''
            }
        )[0]

    def get_integer(self, value):
        try:
            return int(value)
        except ValueError:
            return None

if __name__ == '__main__':
    command = ImportTestCases()
    command.handle(csv_file='backend/drf_backend/project.csv')
