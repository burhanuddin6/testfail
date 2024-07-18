from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from ..models.test_case import *
from ..serializers.test_case import *

class TypesForTestCaseViewSet(viewsets.ModelViewSet):
    queryset = TypesForTestCase.objects.all()
    serializer_class = TypesForTestCaseSerializer

class PriorityForTestCaseViewSet(viewsets.ModelViewSet):
    queryset = PriorityForTestCase.objects.all()
    serializer_class = PriorityForTestCaseSerializer

class TemplateForTestCaseViewSet(viewsets.ModelViewSet):
    queryset = TemplateForTestCase.objects.all()
    serializer_class = TemplateForTestCaseSerializer

class TestCaseFilesViewSet(viewsets.ModelViewSet):
    queryset = TestCaseFiles.objects.all()
    serializer_class = TestCaseFilesSerializer

class TestCaseTicketsViewSet(viewsets.ModelViewSet):
    queryset = TestCaseTickets.objects.all()
    serializer_class = TestCaseTicketsSerializer

class TestCaseViewSet(viewsets.ModelViewSet):
    queryset = TestCase.objects.all()

    def get_serializer_class(self):
        # if self.action in ['create', 'update', 'partial_update']:
        #     return TestCaseCreateUpdateSerializer
        return TestCaseSerializer
    

# added by mariam
class StatusForTestCaseViewSet(viewsets.ModelViewSet):
    queryset = StatusForTestCase.objects.all()
    serializer_class = StatusForTestCaseSerializer

class TestCaseResultsViewSet(viewsets.ModelViewSet):
    queryset = TestCaseResults.objects.all()
    serializer_class = TestCaseResultsSerializer

class TestCaseResultFilesViewSet(viewsets.ModelViewSet):
    queryset = TestCaseResultFiles.objects.all()
    serializer_class = TestCaseResultFilesSerializer

class BugTrackerTicketsViewSet(viewsets.ModelViewSet):
    queryset = BugTrackerTickets.objects.all()
    serializer_class = BugTrackerTicketsSerializer























