# Create your views here.
from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from ..models import *
from ..serializers import *

class TypesForTestCaseViewSet(viewsets.ModelViewSet):
    queryset = TypesForTestCase.objects.all()
    serializer_class = TypesForTestCaseSerializer

class PriorityForTestCaseViewSet(viewsets.ModelViewSet):
    queryset = PriorityForTestCase.objects.all()
    serializer_class = PriorityForTestCaseSerializer

class TemplateForTestCaseViewSet(viewsets.ModelViewSet):
    queryset = TemplateForTestCase.objects.all()
    serializer_class = TemplateForTestCaseSerializer

class TestCaseFileViewSet(viewsets.ModelViewSet):
    queryset = TestCaseFile.objects.all()
    serializer_class = TestCaseFileSerializer

class TestCaseTicketViewSet(viewsets.ModelViewSet):
    queryset = TestCaseTicket.objects.all()
    serializer_class = TestCaseTicketSerializer

class TestCaseViewSet(viewsets.ModelViewSet):
    queryset = TestCase.objects.all()
    serializer_class = TestCaseSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        test_case = serializer.save()

        tickets = request.data.get('tickets', [])
        for ticket in tickets:
            TestCaseTicket.objects.create(test_case_id=test_case, ticket=ticket)

        # Check if files are in the request and create TestCaseFile objects
        files = request.FILES.getlist('files')
        for file in files:
            TestCaseFile.objects.create(test_case_id=test_case, file=file)

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    
