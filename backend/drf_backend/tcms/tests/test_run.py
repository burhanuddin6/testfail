from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model
from ..models import TestRun, TestSuite, Project, TestCase, Section, TestCaseResult, TestRunTestCaseResult, Milestone, MyUser, TypesForTestCase, PriorityForTestCase

class TestRunAPITest(APITestCase):

    def setUp(self):
        self.user = get_user_model().objects.create_user(email='testuser@example.com', password='testpassword')
        self.project = Project.objects.create(name='Test Project', created_by=self.user)
        self.test_suite = TestSuite.objects.create(name='Test Suite', created_by=self.user, project_id=self.project)
        self.section = Section.objects.create(name='Test Section', created_by=self.user, test_suite_id=self.test_suite)
        self.type = TypesForTestCase.objects.create(name='Functional')
        self.priority = PriorityForTestCase.objects.create(name='High')
        self.milestone = Milestone.objects.create(name='Milestone 1', project_id=self.project, created_by=self.user)
        self.test_run_url = reverse('testrun-list')  # Assuming you're using a DefaultRouter

    def create_test_cases(self, num_cases):
        test_cases = []
        for i in range(num_cases):
            test_case = TestCase.objects.create(
                title=f'Test Case {i}',
                template_type=TestCase.TEXT,
                template_frame='Test Case',
                section_id=self.section,
                created_by=self.user,
                project_id=self.project,
                type_id=self.type,
                priority_id=self.priority
            )
            test_cases.append(test_case)
        return test_cases

    def test_create_testrun_with_all_test_case_filter(self):
        self.create_test_cases(5)
        data = {
            'name': 'Test Run 1',
            'test_suite_id': self.test_suite.pk,
            'milestone_id': self.milestone.pk,
            'project_id': self.project.pk,
            'created_by': self.user.pk,
            'test_case_filter': TestRun.ALL
        }
        response = self.client.post(self.test_run_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(TestRun.objects.count(), 1)
        self.assertEqual(TestRunTestCaseResult.objects.count(), 5)
        testrun = TestRun.objects.first()
        self.assertEqual(testrun.test_case_results.count(), 5)

    def test_create_testrun_with_selected_test_case_filter(self):
        test_cases = self.create_test_cases(5)
        selected_test_cases = [str(test_cases[0].test_case_id), str(test_cases[1].test_case_id)]
        data = {
            'name': 'Test Run 2',
            'test_suite_id': self.test_suite.pk,
            'milestone_id': self.milestone.pk,
            'project_id': self.project.pk,
            'created_by': self.user.pk,
            'test_case_filter': TestRun.SELECTED,
            'test_case_filter_value': ','.join(selected_test_cases)
        }
        response = self.client.post(self.test_run_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(TestRun.objects.count(), 1)
        self.assertEqual(TestRunTestCaseResult.objects.count(), 2)
        testrun = TestRun.objects.first()
        self.assertEqual(testrun.test_case_results.count(), 2)

    def test_create_testrun_with_regex_test_case_filter(self):
        self.create_test_cases(5)
        data = {
            'name': 'Test Run 3',
            'test_suite_id': self.test_suite.pk,
            'milestone_id': self.milestone.pk,
            'project_id': self.project.pk,
            'created_by': self.user.pk,
            'test_case_filter': TestRun.REGEX_ON_NAME,
            'test_case_filter_value': 'Test Case [0-2]'
        }
        response = self.client.post(self.test_run_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(TestRun.objects.count(), 1)
        self.assertEqual(TestRunTestCaseResult.objects.count(), 3)
        testrun = TestRun.objects.first()
        self.assertEqual(testrun.test_case_results.count(), 3)

    def test_save_method_updates_updated_on(self):
        testrun = TestRun.objects.create(
            name='Test Run 4',
            test_suite_id=self.test_suite,
            milestone_id=self.milestone,
            project_id=self.project,
            created_by=self.user,
            test_case_filter=TestRun.ALL
        )
        initial_updated_on = testrun.updated_on
        testrun.name = 'Updated Test Run 4'
        testrun.save()
        self.assertNotEqual(testrun.updated_on, initial_updated_on)

    def test_save_method_creates_test_case_results(self):
        self.create_test_cases(5)
        testrun = TestRun.objects.create(
            name='Test Run 5',
            test_suite_id=self.test_suite,
            milestone_id=self.milestone,
            project_id=self.project,
            created_by=self.user,
            test_case_filter=TestRun.ALL
        )
        self.assertEqual(TestRunTestCaseResult.objects.count(), 5)
        for trtcr in TestRunTestCaseResult.objects.all():
            self.assertEqual(trtcr.test_run_id, testrun)

    def test_create_testrun_increases_test_case_count(self):
        self.create_test_cases(5)
        data = {
            'name': 'Test Run 6',
            'test_suite_id': self.test_suite.pk,
            'milestone_id': self.milestone.pk,
            'project_id': self.project.pk,
            'created_by': self.user.pk,
            'test_case_filter': TestRun.ALL
        }
        response = self.client.post(self.test_run_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        # import time
        # time.sleep(10)
        testrun = TestRun.objects.first()
        testcase_results = TestRunTestCaseResult.objects.filter(test_run_id=testrun)
        print(testcase_results)
        self.assertEqual(testrun.number_of_test_cases, 5)

    def test_create_testrun_with_partial_test_case_results(self):
        self.create_test_cases(5)
        data = {
            'name': 'Test Run 7',
            'test_suite_id': self.test_suite.pk,
            'milestone_id': self.milestone.pk,
            'project_id': self.project.pk,
            'created_by': self.user.pk,
            'test_case_filter': TestRun.ALL
        }
        response = self.client.post(self.test_run_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        testrun = TestRun.objects.first()
        test_case_results = TestCaseResult.objects.filter(test_case_id__section_id__test_suite_id__testruns=testrun).first()
        test_case_results.status = TestCaseResult.PASS
        test_case_results.save()
        testrun.refresh_from_db()
        self.assertEqual(testrun.number_of_passed_test_cases, 1)

    def test_create_testrun_without_milestone(self):
        self.create_test_cases(5)
        data = {
            'name': 'Test Run 8',
            'test_suite_id': self.test_suite.pk,
            'project_id': self.project.pk,
            'created_by': self.user.pk,
            'test_case_filter': TestRun.ALL
        }
        response = self.client.post(self.test_run_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        testrun = TestRun.objects.first()
        self.assertIsNone(testrun.milestone_id)
