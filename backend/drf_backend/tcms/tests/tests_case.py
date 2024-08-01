from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.core.files.uploadedfile import SimpleUploadedFile
from django.contrib.auth import get_user_model
from rest_framework.permissions import AllowAny
from datetime import datetime, timezone
from ..models import *
from ..views import TestCaseViewSet, TestCaseResultViewSet

class TestCaseAPITest(APITestCase):

    def setUp(self):
        self.old_permission_classes = TestCaseViewSet.permission_classes
        TestCaseViewSet.permission_classes = [AllowAny]
        self.user = get_user_model().objects.create_user(email='testuser@example.com', password='testpassword')
        self.project = Project.objects.create(name='Test Project', created_by=self.user)
        self.test_case_url = reverse('testcase-list')  # Assuming you're using a DefaultRouter
        self.test_suite = TestSuite.objects.create(name='Test Suite', created_by=self.user, project_id=self.project)
        self.section = Section.objects.create(name='Section', created_by=self.user, test_suite_id=self.test_suite)
        self.type = TypesForTestCase.objects.create(name='Functional')

    def tearDown(self):
        TestCaseViewSet.permission_classes = self.old_permission_classes

    def test_create_test_case_without_files(self):
        data = {
            'title': 'Test Case Title',
            'template_frame': '{%Step%}: "Do this"\n{%Step%}: "Do that"',
            'created_by': self.user.pk,
            'project_id': self.project.pk,
            'section_id': self.section.pk,
        }
        response = self.client.post(self.test_case_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(TestCase.objects.count(), 1)
        self.assertEqual(TestCaseFile.objects.count(), 0)
        test_case = TestCase.objects.first()
        self.assertEqual(test_case.created_by, self.user)
        self.assertEqual(test_case.project_id, self.project)
        self.assertEqual(test_case.section_id, self.section)
        self.assertIsNotNone(test_case.created_on)
        self.assertIsNone(test_case.updated_on)

    def test_create_test_case_with_files(self):
        file = SimpleUploadedFile("file.txt", b"file_content", content_type="text/plain")
        data = {
            'title': 'Test Case Title',
            'template_frame': '{%Step%}: "Do this"\n{%Step%}: "Do that"',
            'files': [file],
            'created_by': self.user.pk,
            'project_id': self.project.pk,
            'section_id': self.section.pk,
        }
        response = self.client.post(self.test_case_url, data, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(TestCase.objects.count(), 1)
        self.assertEqual(TestCaseFile.objects.count(), 1)
        test_case = TestCase.objects.first()
        self.assertEqual(test_case.created_by, self.user)
        self.assertEqual(test_case.project_id, self.project)
        self.assertIn(test_case.files.first().file.name, response.data['files'][0]['file'])
        self.assertIsNotNone(test_case.created_on)
        self.assertIsNone(test_case.updated_on)

    def test_retrieve_test_case(self):
        test_case = TestCase.objects.create(title='Test Case Title', created_by=self.user, project_id=self.project, section_id=self.section)
        url = reverse('testcase-detail', args=[test_case.pk])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], test_case.title)
        self.assertEqual(response.data['created_by'], self.user.pk)
        self.assertEqual(response.data['project_id'], self.project.pk)

    def test_update_test_case(self):
        test_case = TestCase.objects.create(title='Old Title', created_by=self.user, project_id=self.project, section_id=self.section)
        url = reverse('testcase-detail', args=[test_case.pk])
        data = {
            'title': 'Updated Title',
            'template_frame': '{%Step%}: "Do this instead"\n{%Step%}: "Do that"',
            'created_by': self.user.pk,
            'project_id': self.project.pk,
            'section_id': self.section.pk,
        }
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        test_case.refresh_from_db()
        self.assertEqual(test_case.title, 'Updated Title')
        self.assertEqual(test_case.created_by, self.user)
        self.assertEqual(test_case.project_id, self.project)
        self.assertEqual(test_case.section_id, self.section)
        self.assertIsNotNone(test_case.updated_on)

    def test_delete_test_case(self):
        test_case = TestCase.objects.create(title='Test Case Title', created_by=self.user, project_id=self.project, section_id=self.section)
        url = reverse('testcase-detail', args=[test_case.pk])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(TestCase.objects.count(), 0)


class TestCaseResultAPITest(APITestCase):

    def setUp(self):
        self.old_permission_classes = TestCaseResultViewSet.permission_classes
        TestCaseResultViewSet.permission_classes = [AllowAny]
        self.user = get_user_model().objects.create_user(email='testuser@example.com', password='testpassword')
        self.project = Project.objects.create(name='Test Project', created_by=self.user)
        self.test_suite = TestSuite.objects.create(name='Test Suite', created_by=self.user, project_id=self.project)
        self.section = Section.objects.create(name='Section', created_by=self.user, test_suite_id=self.test_suite)
        self.test_case = TestCase.objects.create(title='Test Case Title', created_by=self.user, project_id=self.project, section_id=self.section)
        self.test_case_result_url = reverse('testcaseresult-list')
        self.type = TypesForTestCase.objects.create(name='Functional')
        self.priority = PriorityForTestCase.objects.create(name='High')

    def tearDown(self):
        TestCaseResultViewSet.permission_classes = self.old_permission_classes

    def test_create_test_case_result_without_files(self):
        data = {
            'test_case_id': self.test_case.pk,
            'created_by': self.user.pk,
            'result_blob': 'This is the result blob',
            'version': '1.0',
            'comment': 'This is a comment',
            'result_time': '12:00:00',
        }
        response = self.client.post(self.test_case_result_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(TestCaseResult.objects.count(), 1)
        test_case_result = TestCaseResult.objects.first()
        self.assertEqual(test_case_result.created_by, self.user)
        self.assertEqual(test_case_result.test_case_id, self.test_case)
        self.assertEqual(test_case_result.status, TestCaseResult.UNTESTED)

    def test_create_test_case_result_with_files(self):
        file = SimpleUploadedFile("file.txt", b"file_content", content_type="text/plain")
        data = {
            'test_case_id': self.test_case.pk,
            'created_by': self.user.pk,
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
        self.assertEqual(test_case_result.created_by, self.user)
        self.assertIn(test_case_result.files.first().file.name, response.data['files'][0]['file'])

    def test_retrieve_test_case_result(self):
        test_case_result = TestCaseResult.objects.create(test_case_id=self.test_case, created_by=self.user, result_blob='This is the result blob', result_time='12:00:00')
        url = reverse('testcaseresult-detail', args=[test_case_result.pk])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['test_case_id'], self.test_case.pk)
        self.assertEqual(response.data['created_by'], self.user.pk)

    def test_update_test_case_result(self):
        test_case_result = TestCaseResult.objects.create(test_case_id=self.test_case, created_by=self.user, result_blob='This is the result blob', result_time='12:00:00')
        url = reverse('testcaseresult-detail', args=[test_case_result.pk])
        new_status = TestCaseResult.PASS
        data = {
            'test_case_id': self.test_case.pk,
            'created_by': self.user.pk,
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
        test_case_result = TestCaseResult.objects.create(test_case_id=self.test_case, created_by=self.user, result_blob='This is the result blob', result_time='12:00:00')
        url = reverse('testcaseresult-detail', args=[test_case_result.pk])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(TestCaseResult.objects.count(), 0)

    def test_save_method_updates_updated_on(self):
        test_case = TestCase.objects.create(title='Test Case Title', created_by=self.user, project_id=self.project, section_id=self.section, type_id=self.type, priority_id=self.priority)
        initial_updated_on = test_case.updated_on
        test_case.title = 'Updated Title'
        test_case.save()
        self.assertNotEqual(test_case.updated_on, initial_updated_on)

    def test_save_method_auto_adds_created_on(self):
        test_case = TestCase.objects.create(title='Test Case Title', created_by=self.user, project_id=self.project, section_id=self.section, type_id=self.type, priority_id=self.priority)
        self.assertIsNotNone(test_case.created_on)
