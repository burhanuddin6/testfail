from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
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
    serializer_class = TestCaseSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        test_case = serializer.save()

        # Check if files are in the request and create TestCaseFiles objects
        files = request.FILES.getlist('files')
        for file in files:
            TestCaseFiles.objects.create(test_case=test_case, file=file)

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    

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
