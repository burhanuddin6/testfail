# Create your views here.
from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from ..models import *
from ..serializers import *
from ..permissions import HasModelPermissions
from rest_framework.decorators import api_view



class TypesForTestCaseViewSet(viewsets.ModelViewSet):
    queryset = TypesForTestCase.objects.all()
    serializer_class = TypesForTestCaseSerializer
    permission_classes = [HasModelPermissions]

class PriorityForTestCaseViewSet(viewsets.ModelViewSet):
    queryset = PriorityForTestCase.objects.all()
    serializer_class = PriorityForTestCaseSerializer
    permission_classes = [HasModelPermissions]

class TestCaseFileViewSet(viewsets.ModelViewSet):
    queryset = TestCaseFile.objects.all()
    serializer_class = TestCaseFileSerializer
    permission_classes = [HasModelPermissions]

class TestCaseTicketViewSet(viewsets.ModelViewSet):
    queryset = TestCaseTicket.objects.all()
    serializer_class = TestCaseTicketSerializer
    permission_classes = [HasModelPermissions]

class TestCaseViewSet(viewsets.ModelViewSet):
    queryset = TestCase.objects.all()
    serializer_class = TestCaseSerializer
    permission_classes = [HasModelPermissions]
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        test_case = serializer.save()

        try:
            tickets = request.data.getlist('tickets')
        except:
            tickets = request.data.get('tickets', [])
        if tickets:
            for ticket in tickets:
                TestCaseTicket.objects.create(test_case_id=test_case, ticket=ticket)

        # Check if files are in the request and create TestCaseFile objects
        files = request.FILES.getlist('files')
        for file in files:
            TestCaseFile.objects.create(test_case_id=test_case, file=file)

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    
    def list(self, request, *args, **kwargs):
        # Define the fields with choices
        choices = {
            'template_type': dict(TestCase.TEMPLATE_TYPE_CHOICES),
            'type_id': dict(TestCase.TYPE_CHOICES),
            'priority_id': dict(TestCase.PRIORITY_CHOICES),
            'automation_type': dict(TestCase.AUTOMATION_TYPE_CHOICES),
        }
        return Response(choices, status=status.HTTP_200_OK)
    
    
@api_view(['GET'])
def sections_and_cases(request):
    suite_id = request.query_params.get('suiteId')

    if not suite_id:
        return Response({'error': 'suiteId is required'}, status=400)

    try:
        # Fetch all sections for the given test suite
        sections = Section.objects.filter(test_suite_id=suite_id)
        
        # Print fetched sections
        print("Fetched sections:")
        for section in sections:
            print(f"Section ID: {section.section_id}, Name: {section.name}")
        
        # Fetch all test cases that belong to these sections
        section_ids = sections.values_list('section_id', flat=True)
        print(f"Section IDs: {section_ids}")
        
        test_cases = TestCase.objects.filter(section_id__in=section_ids)
        
        # Print fetched test cases
        print("Fetched test cases:")
        for test_case in test_cases:
            print(f"Test Case ID: {test_case.test_case_id}, Title: {test_case.title}, Section ID: {test_case.section_id_id}, Automation: {test_case.automation_type}, Type: {test_case.type_id}")

        # Prepare data structure
        data = []
        for section in sections:
            section_data = {
                'id': section.section_id,
                'title': section.name,
                'cases': [
                    {
                        'id': test_case.test_case_id,
                        'title': test_case.title,
                        'automation': test_case.automation_type,
                        'type': test_case.type_id
                    }
                    for test_case in test_cases if test_case.section_id_id == section.section_id
                ]
            }
            data.append(section_data)

        # Print the final data structure
        print("Prepared data:")
        print(data)

        return Response(data)
    except Section.DoesNotExist:
        return Response({'error': 'Test suite not found'}, status=404)