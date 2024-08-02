from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model
from ..models import (
    Milestone, TestCase, TestCaseResult, TestSuite, Section, TestRun, TestPlan, Project
)
from django.db.models.signals import pre_save, post_save, post_delete
from django.dispatch import receiver
from django.db import transaction

class APISignalHandlerTestCase(APITestCase):

    def setUp(self):
        self.user = get_user_model().objects.create_user(email='testuser@example.com', password='testpassword')
        self.client.login(email='testuser@example.com', password='testpassword')
        self.project = Project.objects.create(name='Test Project', created_by=self.user)
        self.milestone = Milestone.objects.create(name='Milestone', project_id=self.project, created_by=self.user)
        self.test_suite = TestSuite.objects.create(name='Test Suite', created_by=self.user, project_id=self.project)
        self.section = Section.objects.create(name='Section', test_suite_id=self.test_suite, created_by=self.user)
        self.test_case = TestCase.objects.create(title='Test Case', section_id=self.section, created_by=self.user, project_id=self.project)
        self.test_plan = TestPlan.objects.create(name='Test Plan', project_id=self.project, created_by=self.user, milestone_id=self.milestone, selection=[{'test_suite_id': self.test_suite.pk, 'test_suite_name': self.test_suite.name, 'selection_type': 'ALL', 'selection': []}])
        self.test_run = TestRun.objects.create(name='Test Run', created_by=self.user, test_suite_id=self.test_suite, milestone_id=self.milestone, project_id=self.project)

        self.test_case1 = TestCase.objects.create(title='Test Case 1', section_id=self.section, created_by=self.user, project_id=self.project)
        self.test_case2 = TestCase.objects.create(title='Test Case 2', section_id=self.section, created_by=self.user, project_id=self.project)

    # def test_create_test_case_result_updates_stats(self):
    #     url = reverse('testcaseresult-list')
    #     data = {
    #         'test_case_id': self.test_case.pk,
    #         'result_blob': 'Test Result',
    #         'status': 'PASS',
    #         'created_by': self.user.pk
    #     }
    #     response = self.client.post(url, data, format='json')
    #     self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    #     self.test_suite.refresh_from_db()
    #     self.test_run.refresh_from_db()
    #     self.test_plan.refresh_from_db()
    #     self.milestone.refresh_from_db()

    #     self.assertEqual(self.test_suite.number_of_passed_test_cases, 1)
    #     self.assertEqual(self.test_run.number_of_passed_test_cases, 1)
    #     self.assertEqual(self.test_plan.number_of_passed_test_cases, 1)
    #     self.assertEqual(self.milestone.number_of_passed_test_cases, 1)

    
    def test_update_test_case_result_updates_stats(self):
        test_case_result = TestCaseResult.objects.create(test_case_id=self.test_case, status='PASS', created_by=self.user)
        url = reverse('testcaseresult-detail', args=[test_case_result.pk])
        data = {
            'status': 'FAIL'
        }
        response = self.client.patch(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.test_suite.refresh_from_db()
        self.test_run.refresh_from_db()
        self.test_plan.refresh_from_db()
        self.milestone.refresh_from_db()

        self.assertEqual(self.test_suite.number_of_passed_test_cases, 0)
        self.assertEqual(self.test_suite.number_of_failed_test_cases, 1)
        self.assertEqual(self.test_run.number_of_passed_test_cases, 0)
        self.assertEqual(self.test_run.number_of_failed_test_cases, 1)
        self.assertEqual(self.test_plan.number_of_passed_test_cases, 0)
        self.assertEqual(self.test_plan.number_of_failed_test_cases, 1)
        self.assertEqual(self.milestone.number_of_passed_test_cases, 0)
        self.assertEqual(self.milestone.number_of_failed_test_cases, 1)

    def test_delete_test_case_result_updates_stats(self):
        test_case_result = TestCaseResult.objects.create(test_case_id=self.test_case, status='PASS', created_by=self.user)
        url = reverse('testcaseresult-detail', args=[test_case_result.pk])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

        self.test_suite.refresh_from_db()
        self.test_run.refresh_from_db()
        self.test_plan.refresh_from_db()
        self.milestone.refresh_from_db()

        self.assertEqual(self.test_suite.number_of_passed_test_cases, 0)
        self.assertEqual(self.test_run.number_of_passed_test_cases, 0)
        self.assertEqual(self.test_plan.number_of_passed_test_cases, 0)
        self.assertEqual(self.milestone.number_of_passed_test_cases, 0)

    def test_create_test_case_updates_stats(self):
        url = reverse('testcase-list')
        data = {
            'title': 'New Test Case',
            'section_id': self.section.pk,
            'created_by': self.user.pk,
            'project_id': self.project.pk
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        self.test_suite.refresh_from_db()
        self.assertEqual(self.test_suite.number_of_test_cases, 4)

    def test_delete_test_case_updates_stats(self):
        url = reverse('testcase-detail', args=[self.test_case.pk])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

        self.test_suite.refresh_from_db()
        self.assertEqual(self.test_suite.number_of_test_cases, 2)

    def test_create_section_updates_stats(self):
        url = reverse('section-list')
        data = {
            'name': 'New Section',
            'test_suite_id': self.test_suite.pk,
            'created_by': self.user.pk
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        self.test_suite.refresh_from_db()
        self.assertEqual(self.test_suite.number_of_sections, 2)

    def test_delete_section_updates_stats(self):
        url = reverse('section-detail', args=[self.section.pk])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

        self.test_suite.refresh_from_db()
        self.assertEqual(self.test_suite.number_of_sections, 0)

    def test_project_stats(self):
        url = reverse('project-detail', args=[self.project.pk])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['test_suite_count'], 1)
        self.assertEqual(response.data['active_test_run_count'], 1)
        self.assertEqual(response.data['active_milestone_count'], 1)
