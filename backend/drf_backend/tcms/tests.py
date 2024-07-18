
# Create your tests here.
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.core.files.uploadedfile import SimpleUploadedFile
from .models import TestCase, TestCaseFiles

class TestCaseAPITest(APITestCase):

    def setUp(self):
        self.test_case_url = reverse('testcase-list')  # Assuming you're using a DefaultRouter

    def test_create_test_case_without_files(self):
        data = {
            'title': 'Test Case Title',
            'template_blob': '\{\%Step\%\}: \"Do this\"\n\{\%Step\%\}: \"Do that\"',
            # Add other fields as needed
        }
        response = self.client.post(self.test_case_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(TestCase.objects.count(), 1)
        self.assertEqual(TestCaseFiles.objects.count(), 0)

    def test_create_test_case_with_files(self):
        file = SimpleUploadedFile("file.txt", b"file_content", content_type="text/plain")
        data = {
            'title': 'Test Case Title',
            'template_blob': '\{\%Step\%\}: \"Do this\"\n\{\%Step\%\}: \"Do that\"',
            'files': [file],  # Ensure you're using a format that includes files
            # Add other fields as needed
        }
        response = self.client.post(self.test_case_url, data, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(TestCase.objects.count(), 1)
        self.assertEqual(TestCaseFiles.objects.count(), 1)
        test_case = TestCase.objects.first()
        self.assertEqual(test_case.files.first().file.name, 'test_case_files/file.txt')

    def test_retrieve_test_case(self):
        test_case = TestCase.objects.create(title='Test Case Title')
        url = reverse('testcase-detail', args=[test_case.pk])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], test_case.title)

    def test_update_test_case(self):
        test_case = TestCase.objects.create(title='Old Title')
        url = reverse('testcase-detail', args=[test_case.pk])
        data = {
            'title': 'Updated Title',
            'template_blob': '\{\%Step\%\}: \"Do this instead\"\n\{\%Step\%\}: \"Do that\"',

        }
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        test_case.refresh_from_db()
        self.assertEqual(test_case.title, 'Updated Title')

    def test_delete_test_case(self):
        test_case = TestCase.objects.create(title='Test Case Title')
        url = reverse('testcase-detail', args=[test_case.pk])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(TestCase.objects.count(), 0)
