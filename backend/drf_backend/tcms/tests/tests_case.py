# Create your tests here.
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.core.files.uploadedfile import SimpleUploadedFile
from django.contrib.auth import get_user_model
from ..models import TestCase, TestCaseFile, TemplateForTestCase, StatusForTestCase, TestCaseResult, TestCaseResultFile

class TestCaseAPITest(APITestCase):

    def setUp(self):
        self.user = get_user_model().objects.create_user(email='testuser@example.com', password='testpassword')
        self.client.login(email='testuser@example.com', password='testpassword')
        self.template = TemplateForTestCase.objects.create(template_name='Test Template', template_text='Test Template Text')
        self.test_case_url = reverse('testcase-list')  # Assuming you're using a DefaultRouter

    def test_create_test_case_without_files(self):
        data = {
            'title': 'Test Case Title',
            'template_blob': '\{\%Step\%\}: \"Do this\"\n\{\%Step\%\}: \"Do that\"',
            'creator_id': self.user.pk,  # Add the creator field
            'template_id': self.template.pk,  # Add the template field
            'tickets': ['ticket1', 'ticket2'],  # Add the tickets field
        }
        print(data)
        response = self.client.post(self.test_case_url, data, format='json')
        print(response.data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(TestCase.objects.count(), 1)
        self.assertEqual(TestCaseFile.objects.count(), 0)
        test_case = TestCase.objects.first()
        self.assertEqual(test_case.creator_id, self.user)
        self.assertEqual(test_case.tickets.count(), 2)
        tickets = test_case.tickets.all()
        self.assertEqual(tickets[0].ticket, 'ticket1')
        self.assertEqual(tickets[1].ticket, 'ticket2')

    def test_create_test_case_with_files(self):
        file = SimpleUploadedFile("file.txt", b"file_content", content_type="text/plain")
        data = {
            'title': 'Test Case Title',
            'template_blob': '\{\%Step\%\}: \"Do this\"\n\{\%Step\%\}: \"Do that\"',
            'files': [file],  # Ensure you're using a format that includes files
            'creator_id': self.user.pk,  # Add the creator field
            'template_id': self.template.pk,  # Add the template field
            'tickets': ['ticket1'],  # Add the tickets field
            # Add other fields as needed
        }
        response = self.client.post(self.test_case_url, data, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(TestCase.objects.count(), 1)
        self.assertEqual(TestCaseFile.objects.count(), 1)
        test_case = TestCase.objects.first()
        self.assertEqual(test_case.creator_id, self.user)
        self.assertEqual(test_case.files.first().file.name, 'test_case_files/file.txt')
        self.assertEqual(test_case.tickets.first().ticket, 'ticket1')

    def test_retrieve_test_case(self):
        test_case = TestCase.objects.create(title='Test Case Title', creator_id=self.user, template_id=self.template)
        url = reverse('testcase-detail', args=[test_case.pk])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], test_case.title)
        self.assertEqual(response.data['creator_id'], self.user.pk)

    def test_update_test_case(self):
        test_case = TestCase.objects.create(title='Old Title', creator_id=self.user, template_id=self.template)
        url = reverse('testcase-detail', args=[test_case.pk])
        data = {
            'title': 'Updated Title',
            'template_blob': '\{\%Step\%\}: \"Do this instead\"\n\{\%Step\%\}: \"Do that\"',
            'creator_id': self.user.pk,  # Ensure creator remains the same
            'template_id': self.template.pk,  
            'tickets': ['ticket1', 'ticket3', 'ticket78'],  # Ensure tickets remain the same
        }
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        test_case.refresh_from_db()
        self.assertEqual(test_case.title, 'Updated Title')
        self.assertEqual(test_case.creator_id, self.user)
        # Tickets are not to be updated via testcase api, to change them use the ticket api directly
        self.assertEqual(test_case.tickets.count(), 0)

    def test_delete_test_case(self):
        test_case = TestCase.objects.create(title='Test Case Title', creator_id=self.user, template_id=self.template)
        url = reverse('testcase-detail', args=[test_case.pk])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(TestCase.objects.count(), 0)


class TestCaseResultAPITest(APITestCase):

    def setUp(self):
        self.user = get_user_model().objects.create_user(email='testuser@example.com', password='testpassword')
        self.client.login(email='testuser@example.com', password='testpassword')
        self.template = TemplateForTestCase.objects.create(template_name='Test Template', template_text='Test Template Text')
        self.test_case = TestCase.objects.create(title='Test Case Title', creator_id=self.user, template_id=self.template)
        self.status = StatusForTestCase.objects.create(name='Passed', color='green')
        self.test_case_result_url = reverse('testcaseresult-list')  # Assuming you're using a DefaultRouter

    def test_create_test_case_result_without_files(self):
        data = {
            'test_case_id': self.test_case.pk,
            'status_id': self.status.pk,
            'creator_id': self.user.pk,
            'result_blob': 'This is the result blob',
            'version': '1.0',
            'comment': 'This is a comment',
            'result_time': '12:00:00'
        }
        response = self.client.post(self.test_case_result_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(TestCaseResult.objects.count(), 1)
        test_case_result = TestCaseResult.objects.first()
        self.assertEqual(test_case_result.creator_id, self.user)
        self.assertEqual(test_case_result.test_case_id, self.test_case)
        self.assertEqual(test_case_result.status_id, self.status)

    def test_create_test_case_result_with_files(self):
        file = SimpleUploadedFile("file.txt", b"file_content", content_type="text/plain")
        data = {
            'test_case_id': self.test_case.pk,
            'status_id': self.status.pk,
            'creator_id': self.user.pk,
            'result_blob': 'This is the result blob',
            'version': '1.0',
            'comment': 'This is a comment',
            'result_time': '12:00:00',
            'files': [file]
        }
        response = self.client.post(self.test_case_result_url, data, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(TestCaseResult.objects.count(), 1)
        self.assertEqual(TestCaseResultFile.objects.count(), 1)
        test_case_result = TestCaseResult.objects.first()
        self.assertEqual(test_case_result.creator_id, self.user)
        self.assertEqual(test_case_result.files.first().file.name, 'test_case_result_files/file.txt')

    def test_retrieve_test_case_result(self):
        test_case_result = TestCaseResult.objects.create(test_case_id=self.test_case, status_id=self.status, creator_id=self.user, result_blob='This is the result blob', result_time='12:00:00')
        url = reverse('testcaseresult-detail', args=[test_case_result.pk])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['test_case_id'], self.test_case.pk)
        self.assertEqual(response.data['status_id'], self.status.pk)
        self.assertEqual(response.data['creator_id'], self.user.pk)

    def test_update_test_case_result(self):
        test_case_result = TestCaseResult.objects.create(test_case_id=self.test_case, status_id=self.status, creator_id=self.user, result_blob='This is the result blob', result_time='12:00:00')
        url = reverse('testcaseresult-detail', args=[test_case_result.pk])
        new_status = StatusForTestCase.objects.create(name='Failed', color='red')
        data = {
            'test_case_id': self.test_case.pk,
            'status_id': new_status.pk,
            'creator_id': self.user.pk,
            'result_blob': 'Updated result blob',
            'version': '1.1',
            'comment': 'Updated comment',
            'result_time': '13:00:00'
        }
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        test_case_result.refresh_from_db()
        self.assertEqual(test_case_result.status_id, new_status)
        self.assertEqual(test_case_result.result_blob, 'Updated result blob')

    def test_delete_test_case_result(self):
        test_case_result = TestCaseResult.objects.create(test_case_id=self.test_case, status_id=self.status, creator_id=self.user, result_blob='This is the result blob', result_time='12:00:00')
        url = reverse('testcaseresult-detail', args=[test_case_result.pk])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(TestCaseResult.objects.count(), 0)
