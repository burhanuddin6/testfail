from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.core.files.uploadedfile import SimpleUploadedFile
from django.contrib.auth import get_user_model
from ..models import Milestone, MilestoneTicket, MilestoneFile, Project
from ..views import MilestoneViewSet, MilestoneFileViewSet, MilestoneTicketViewSet
from rest_framework.permissions import AllowAny

class MilestoneAPITest(APITestCase):

    def setUp(self):
        self.old_permission_classes = MilestoneViewSet.permission_classes
        MilestoneViewSet.permission_classes = [AllowAny]
        self.user = get_user_model().objects.create_user(email='testuser@example.com', password='testpassword')
        self.project = Project.objects.create(name='Test Project', creator_id=self.user)
        self.milestone_url = reverse('milestone-list')  # Assuming you're using a DefaultRouter
    
    def tearDown(self):
        MilestoneViewSet.permission_classes = self.old_permission_classes

    def test_create_milestone_without_files_or_tickets(self):
        data = {
            'name': 'Milestone 1',
            'creator_id': self.user.pk,
            'project_id': self.project.pk,
            'description': 'This is a test milestone',
            'start_date': '2024-01-01',
            'end_date': '2024-12-31',
            'is_complete': False,
        }
        response = self.client.post(self.milestone_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Milestone.objects.count(), 1)
        milestone = Milestone.objects.first()
        self.assertEqual(milestone.creator_id, self.user)
        self.assertEqual(milestone.project_id, self.project)
        self.assertEqual(milestone.name, 'Milestone 1')
        self.assertFalse(milestone.is_complete)

    def test_create_milestone_with_files_and_tickets(self):
        file = SimpleUploadedFile("file.txt", b"file_content", content_type="text/plain")
        data = {
            'name': 'Milestone 2',
            'creator_id': self.user.pk,
            'project_id': self.project.pk,
            'description': 'This is another test milestone',
            'start_date': '2024-01-01',
            'end_date': '2024-12-31',
            'is_complete': False,
            'files': [file],
            'tickets': [
                {'ticket': 'ticket1'},
                {'ticket': 'ticket2'}
            ]
        }
        response = self.client.post(self.milestone_url, data, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Milestone.objects.count(), 1)
        self.assertEqual(MilestoneFile.objects.count(), 1)
        self.assertEqual(MilestoneTicket.objects.count(), 2)
        milestone = Milestone.objects.first()
        self.assertEqual(milestone.creator_id, self.user)
        self.assertEqual(milestone.project_id, self.project)
        self.assertEqual(milestone.files.first().file.name, 'milestone_files/file.txt')
        self.assertEqual(milestone.tickets.count(), 2)

    def test_retrieve_milestone(self):
        milestone = Milestone.objects.create(
            name='Milestone 3', 
            creator_id=self.user, 
            project_id=self.project,
            description='Retrieve test milestone', 
            start_date='2024-01-01', 
            end_date='2024-12-31'
        )
        url = reverse('milestone-detail', args=[milestone.pk])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], milestone.name)
        self.assertEqual(response.data['creator_id'], self.user.pk)
        self.assertEqual(response.data['project_id'], self.project.pk)

    def test_update_milestone(self):
        milestone = Milestone.objects.create(
            name='Old Milestone', 
            creator_id=self.user, 
            project_id=self.project,
            description='Old description', 
            start_date='2024-01-01', 
            end_date='2024-12-31'
        )
        url = reverse('milestone-detail', args=[milestone.pk])
        data = {
            'name': 'Updated Milestone',
            'creator_id': self.user.pk,
            'project_id': self.project.pk,
            'description': 'Updated description',
            'start_date': '2024-02-01',
            'end_date': '2024-11-30',
            'is_complete': True,
        }
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        milestone.refresh_from_db()
        self.assertEqual(milestone.name, 'Updated Milestone')
        self.assertEqual(milestone.description, 'Updated description')
        self.assertTrue(milestone.is_complete)

    def test_delete_milestone(self):
        milestone = Milestone.objects.create(
            name='Milestone 4', 
            creator_id=self.user, 
            project_id=self.project,
            description='Delete test milestone', 
            start_date='2024-01-01', 
            end_date='2024-12-31'
        )
        url = reverse('milestone-detail', args=[milestone.pk])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Milestone.objects.count(), 0)

class MilestoneTicketAPITest(APITestCase):

    def setUp(self):
        self.old_permission_classes = MilestoneTicketViewSet.permission_classes
        MilestoneTicketViewSet.permission_classes = [AllowAny]
        self.user = get_user_model().objects.create_user(email='testuser@example.com', password='testpassword')
        self.project = Project.objects.create(name='Test Project', creator_id=self.user)
        self.milestone = Milestone.objects.create(name='Milestone with Tickets', creator_id=self.user, project_id=self.project)
        self.milestone_ticket_url = reverse('milestoneticket-list')  # Assuming you're using a DefaultRouter

    def tearDown(self):
        MilestoneTicketViewSet.permission_classes = self.old_permission_classes


    def test_create_milestone_ticket(self):
        data = {
            'ticket': 'ticket1',
            'milestone_id': self.milestone.pk,
        }
        response = self.client.post(self.milestone_ticket_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(MilestoneTicket.objects.count(), 1)
        ticket = MilestoneTicket.objects.first()
        self.assertEqual(ticket.ticket, 'ticket1')
        self.assertEqual(ticket.milestone_id, self.milestone)

    def test_retrieve_milestone_ticket(self):
        ticket = MilestoneTicket.objects.create(ticket='ticket2', milestone_id=self.milestone)
        url = reverse('milestoneticket-detail', args=[ticket.pk])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['ticket'], 'ticket2')
        self.assertEqual(response.data['milestone_id'], self.milestone.pk)

    def test_update_milestone_ticket(self):
        ticket = MilestoneTicket.objects.create(ticket='ticket3', milestone_id=self.milestone)
        url = reverse('milestoneticket-detail', args=[ticket.pk])
        data = {
            'ticket': 'updated_ticket3',
            'milestone_id': self.milestone.pk,
        }
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        ticket.refresh_from_db()
        self.assertEqual(ticket.ticket, 'updated_ticket3')

    def test_delete_milestone_ticket(self):
        ticket = MilestoneTicket.objects.create(ticket='ticket4', milestone_id=self.milestone)
        url = reverse('milestoneticket-detail', args=[ticket.pk])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(MilestoneTicket.objects.count(), 0)

class MilestoneFileAPITest(APITestCase):

    def setUp(self):
        self.old_permission_classes = MilestoneFileViewSet.permission_classes
        MilestoneFileViewSet.permission_classes = [AllowAny]
        self.user = get_user_model().objects.create_user(email='testuser@example.com', password='testpassword')
        self.project = Project.objects.create(name='Test Project', creator_id=self.user)
        self.milestone = Milestone.objects.create(name='Milestone with Files', creator_id=self.user, project_id=self.project)
        self.milestone_file_url = reverse('milestonefile-list')  # Assuming you're using a DefaultRouter

    def tearDown(self):
        MilestoneFileViewSet.permission_classes = self.old_permission_classes

    def test_create_milestone_file(self):
        file = SimpleUploadedFile("file.txt", b"file_content", content_type="text/plain")
        data = {
            'file': file,
            'milestone_id': self.milestone.pk,
        }
        response = self.client.post(self.milestone_file_url, data, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(MilestoneFile.objects.count(), 1)
        milestone_file = MilestoneFile.objects.first()
        self.assertEqual(milestone_file.file.name, 'milestone_files/file.txt')
        self.assertEqual(milestone_file.milestone_id, self.milestone)

    def test_retrieve_milestone_file(self):
        milestone_file = MilestoneFile.objects.create(file='milestone_files/file2.txt', milestone_id=self.milestone)
        url = reverse('milestonefile-detail', args=[milestone_file.pk])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('milestone_files/file2.txt', response.data['file'])
        self.assertEqual(response.data['milestone_id'], self.milestone.pk)

    def test_update_milestone_file(self):
        milestone_file = MilestoneFile.objects.create(file='milestone_files/file3.txt', milestone_id=self.milestone)
        url = reverse('milestonefile-detail', args=[milestone_file.pk])
        file = SimpleUploadedFile("updated_file3.txt", b"updated_file_content", content_type="text/plain")
        data = {
            'file': file,
            'milestone_id': self.milestone.pk,
        }
        response = self.client.put(url, data, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        milestone_file.refresh_from_db()
        self.assertEqual(milestone_file.file.name, 'milestone_files/updated_file3.txt')

    def test_delete_milestone_file(self):
        milestone_file = MilestoneFile.objects.create(file='milestone_files/file4.txt', milestone_id=self.milestone)
        url = reverse('milestonefile-detail', args=[milestone_file.pk])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(MilestoneFile.objects.count(), 0)
