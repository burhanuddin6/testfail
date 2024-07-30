from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.core.files.uploadedfile import SimpleUploadedFile
from django.contrib.auth import get_user_model
from rest_framework.permissions import AllowAny
from ..models import *
from ..views import TestCaseViewSet, TestCaseResultViewSet

class TestCaseAPITest(APITestCase):

    def setUp(self):
        # Override the permission classes for the test case
        self.old_permission_classes = TestCaseViewSet.permission_classes
        TestCaseViewSet.permission_classes = [AllowAny]
        self.user = get_user_model().objects.create_user(email='testuser@example.com', password='testpassword')
        self.project = Project.objects.create(name='Test Project', creator_id=self.user)
        self.test_case_url = reverse('testcase-list')  # Assuming you're using a DefaultRouter
        self.test_suite = TestSuite.objects.create(name='Test Suite', creator_id=self.user, project_id=self.project)
        self.section = Section.objects.create(name='Section', creator_id=self.user, test_suite_id=self.test_suite)

    def tearDown(self):
        # Revert the permission classes after tests
        TestCaseViewSet.permission_classes = self.old_permission_classes

    def test_create_test_case_without_files(self):
        data = {
            'title': 'Test Case Title',
            'template_blob': '{%Step%}: "Do this"\n{%Step%}: "Do that"',
            'creator_id': self.user.pk,  # Add the creator field
            'project_id': self.project.pk,  # Add the project field
            'tickets': ['ticket1', 'ticket2'],  # Add the tickets field
            'section_id': self.section.pk,  # Add the section field
        }
        response = self.client.post(self.test_case_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(TestCase.objects.count(), 1)
        self.assertEqual(TestCaseFile.objects.count(), 0)
        test_case = TestCase.objects.first()
        self.assertEqual(test_case.creator_id, self.user)
        self.assertEqual(test_case.project_id, self.project)
        self.assertEqual(test_case.tickets.count(), 2)
        tickets = test_case.tickets.all()
        self.assertEqual(tickets[0].ticket, 'ticket1')
        self.assertEqual(tickets[1].ticket, 'ticket2')

    def test_create_test_case_with_files(self):
        file = SimpleUploadedFile("file.txt", b"file_content", content_type="text/plain")
        data = {
            'title': 'Test Case Title',
            'template_blob': '{%Step%}: "Do this"\n{%Step%}: "Do that"',
            'files': [file],  # Ensure you're using a format that includes files
            'creator_id': self.user.pk,  # Add the creator field
            'project_id': self.project.pk,  # Add the project field
            'section_id': self.section.pk,  # Add the section field
            'tickets': ['ticket1'],  # Add the tickets field
            # Add other fields as needed
        }
        response = self.client.post(self.test_case_url, data, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(TestCase.objects.count(), 1)
        self.assertEqual(TestCaseFile.objects.count(), 1)
        test_case = TestCase.objects.first()
        self.assertEqual(test_case.creator_id, self.user)
        self.assertEqual(test_case.project_id, self.project)
        self.assertEqual(test_case.files.first().file.name, 'test_case_files/file.txt')
        self.assertEqual(test_case.tickets.first().ticket, 'ticket1')

    def test_retrieve_test_case(self):
        test_case = TestCase.objects.create(title='Test Case Title', creator_id=self.user, project_id=self.project, section_id=self.section)
        url = reverse('testcase-detail', args=[test_case.pk])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], test_case.title)
        self.assertEqual(response.data['creator_id'], self.user.pk)
        self.assertEqual(response.data['project_id'], self.project.pk)

    def test_update_test_case(self):
        test_case = TestCase.objects.create(title='Old Title', creator_id=self.user, project_id=self.project, section_id=self.section)
        url = reverse('testcase-detail', args=[test_case.pk])
        data = {
            'title': 'Updated Title',
            'template_blob': '{%Step%}: "Do this instead"\n{%Step%}: "Do that"',
            'creator_id': self.user.pk,  # Ensure creator remains the same
            'project_id': self.project.pk,  # Ensure project remains the same
            'tickets': ['ticket1', 'ticket3', 'ticket78'],  # Ensure tickets remain the same
            'section_id': self.section.pk,  # Ensure section remains the same
        }
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        test_case.refresh_from_db()
        self.assertEqual(test_case.title, 'Updated Title')
        self.assertEqual(test_case.creator_id, self.user)
        self.assertEqual(test_case.project_id, self.project)
        # Tickets are not to be updated via testcase api, to change them use the ticket api directly
        self.assertEqual(test_case.tickets.count(), 0)

    def test_delete_test_case(self):
        test_case = TestCase.objects.create(title='Test Case Title', creator_id=self.user, project_id=self.project, section_id=self.section)
        url = reverse('testcase-detail', args=[test_case.pk])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(TestCase.objects.count(), 0)


class TestCaseResultAPITest(APITestCase):

    def setUp(self):
        # Override the permission classes for the test case result
        self.old_permission_classes = TestCaseResultViewSet.permission_classes
        TestCaseResultViewSet.permission_classes = [AllowAny]
        self.user = get_user_model().objects.create_user(email='testuser@example.com', password='testpassword')
        self.project = Project.objects.create(name='Test Project', creator_id=self.user)
        self.test_suite = TestSuite.objects.create(name='Test Suite', creator_id=self.user, project_id=self.project)
        self.section = Section.objects.create(name='Section', creator_id=self.user, test_suite_id=self.test_suite)
        self.test_case = TestCase.objects.create(title='Test Case Title', creator_id=self.user, project_id=self.project, section_id=self.section)
        self.test_case_result_url = reverse('testcaseresult-list')  # Assuming you're using a DefaultRouter

    def tearDown(self):
        # Revert the permission classes after tests
        TestCaseResultViewSet.permission_classes = self.old_permission_classes

    def test_create_test_case_result_without_files(self):
        data = {
            'test_case_id': self.test_case.pk,
            'creator_id': self.user.pk,
            'result_blob': 'This is the result blob',
            'version': '1.0',
            'comment': 'This is a comment',
            'result_time': '12:00:00',
        }
        response = self.client.post(self.test_case_result_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(TestCaseResult.objects.count(), 1)
        test_case_result = TestCaseResult.objects.first()
        self.assertEqual(test_case_result.creator_id, self.user)
        self.assertEqual(test_case_result.test_case_id, self.test_case)
        self.assertEqual(test_case_result.status, TestCaseResult.UNTESTED)

    def test_create_test_case_result_with_files(self):
        file = SimpleUploadedFile("file.txt", b"file_content", content_type="text/plain")
        data = {
            'test_case_id': self.test_case.pk,
            'creator_id': self.user.pk,
            'result_blob': 'This is the result blob',
            'version': '1.0',
            'comment': 'This is a comment',
            'result_time': '12:00:00',
            'files': [file],
        }
        response = self.client.post(self.test_case_result_url, data, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(TestCaseResult.objects.count(), 1)
        self.assertEqual(TestCaseResultFile.objects.count(), 1)
        test_case_result = TestCaseResult.objects.first()
        self.assertEqual(test_case_result.creator_id, self.user)
        self.assertEqual(test_case_result.files.first().file.name, 'test_case_result_files/file.txt')

    def test_retrieve_test_case_result(self):
        test_case_result = TestCaseResult.objects.create(test_case_id=self.test_case, creator_id=self.user, result_blob='This is the result blob', result_time='12:00:00')
        url = reverse('testcaseresult-detail', args=[test_case_result.pk])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['test_case_id'], self.test_case.pk)
        self.assertEqual(response.data['creator_id'], self.user.pk)

    def test_update_test_case_result(self):
        test_case_result = TestCaseResult.objects.create(test_case_id=self.test_case, creator_id=self.user, result_blob='This is the result blob', result_time='12:00:00')
        url = reverse('testcaseresult-detail', args=[test_case_result.pk])
        new_status = TestCaseResult.PASS
        data = {
            'test_case_id': self.test_case.pk,
            'creator_id': self.user.pk,
            'result_blob': 'Updated result blob',
            'status': new_status,
            'version': '1.1',
            'comment': 'Updated comment',
            'result_time': '13:00:00'
        }
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        test_case_result.refresh_from_db()
        self.assertEqual(test_case_result.status, new_status)
        self.assertEqual(test_case_result.result_blob, 'Updated result blob')

    def test_delete_test_case_result(self):
        test_case_result = TestCaseResult.objects.create(test_case_id=self.test_case, creator_id=self.user, result_blob='This is the result blob', result_time='12:00:00')
        url = reverse('testcaseresult-detail', args=[test_case_result.pk])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(TestCaseResult.objects.count(), 0)


class TestSuiteAndSectionAPITest(APITestCase):

    def setUp(self):
        self.user = get_user_model().objects.create_user(email='testuser@example.com', password='testpassword')
        self.project = Project.objects.create(name='Test Project', creator_id=self.user)
        self.test_suite = TestSuite.objects.create(name='Test Suite', creator_id=self.user, project_id=self.project)
        self.section = Section.objects.create(name='Section', creator_id=self.user, test_suite_id=self.test_suite)
        self.test_case = TestCase.objects.create(title='Test Case Title', creator_id=self.user, project_id=self.project, section_id=self.section)
        self.test_case_result_url = reverse('testcaseresult-list')

    def test_statistics_tracking(self):
        self.test_suite.refresh_from_db()
        self.section.refresh_from_db()
        self.assertEqual(self.test_suite.number_of_test_cases, 1)
        self.assertEqual(self.test_suite.number_of_passed_test_cases, 0)
        self.assertEqual(self.section.number_of_test_cases, 1)
        self.assertEqual(self.section.number_of_passed_test_cases, 0)

        # Create a test case result and check if the statistics are updated
        data = {
            'test_case_id': self.test_case.pk,
            'creator_id': self.user.pk,
            'result_blob': 'This is the result blob',
            'status': TestCaseResult.PASS,
            'version': '1.0',
            'comment': 'This is a comment',
            'result_time': '12:00:00',
        }
        response = self.client.post(self.test_case_result_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        self.test_suite.refresh_from_db()
        self.section.refresh_from_db()

        self.assertEqual(self.test_suite.number_of_test_cases, 1)
        self.assertEqual(self.test_suite.number_of_passed_test_cases, 1)
        self.assertEqual(self.section.number_of_test_cases, 1)
        self.assertEqual(self.section.number_of_passed_test_cases, 1)

        # Create another test case result with a different status
        data['status'] = TestCaseResult.PASS
        response = self.client.post(self.test_case_result_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        # Create another test case result with a different status
        data['status'] = TestCaseResult.FAIL
        response = self.client.post(self.test_case_result_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        self.test_suite.refresh_from_db()
        self.section.refresh_from_db()

        self.assertEqual(self.test_suite.number_of_test_cases, 1)
        self.assertEqual(self.test_suite.number_of_passed_test_cases, 1)
        self.assertEqual(self.section.number_of_test_cases, 1)
        self.assertEqual(self.section.number_of_passed_test_cases, 1)

    def test_delete_test_case_and_update_statistics(self):
        # Initially, create a passing test case result
        data = {
            'test_case_id': self.test_case.pk,
            'creator_id': self.user.pk,
            'result_blob': 'This is the result blob',
            'status': TestCaseResult.PASS,
            'version': '1.0',
            'comment': 'This is a comment',
            'result_time': '12:00:00',
        }
        response = self.client.post(self.test_case_result_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        self.test_suite.refresh_from_db()
        self.section.refresh_from_db()

        self.assertEqual(self.test_suite.number_of_test_cases, 1)
        self.assertEqual(self.test_suite.number_of_passed_test_cases, 1)
        self.assertEqual(self.section.number_of_test_cases, 1)
        self.assertEqual(self.section.number_of_passed_test_cases, 1)

        # Delete the test case
        url = reverse('testcase-detail', args=[self.test_case.pk])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

        self.test_suite.refresh_from_db()
        self.section.refresh_from_db()

        self.assertEqual(self.test_suite.number_of_test_cases, 0)
        self.assertEqual(self.test_suite.number_of_passed_test_cases, 0)
        self.assertEqual(self.section.number_of_test_cases, 0)
        self.assertEqual(self.section.number_of_passed_test_cases, 0)

    def test_update_test_case_result_and_statistics(self):
        # Create an initial test case result with FAIL status
        data = {
            'test_case_id': self.test_case.pk,
            'creator_id': self.user.pk,
            'result_blob': 'This is the result blob',
            'status': TestCaseResult.FAIL,
            'version': '1.0',
            'comment': 'This is a comment',
            'result_time': '12:00:00',
        }
        response = self.client.post(self.test_case_result_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        self.test_suite.refresh_from_db()
        self.section.refresh_from_db()

        self.assertEqual(self.test_suite.number_of_test_cases, 1)
        self.assertEqual(self.test_suite.number_of_passed_test_cases, 0)
        self.assertEqual(self.section.number_of_test_cases, 1)
        self.assertEqual(self.section.number_of_passed_test_cases, 0)

        # Update the test case result to PASS status
        test_case_result = TestCaseResult.objects.first()
        url = reverse('testcaseresult-detail', args=[test_case_result.pk])
        data['status'] = TestCaseResult.PASS
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.test_suite.refresh_from_db()
        self.section.refresh_from_db()

        self.assertEqual(self.test_suite.number_of_passed_test_cases, 1)
        self.assertEqual(self.section.number_of_passed_test_cases, 1)
