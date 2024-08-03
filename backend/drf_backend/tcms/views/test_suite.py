from django.shortcuts import render

from rest_framework import viewsets
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from ..models.test_suite import *
from ..serializers.test_suite import *
from ..permissions import HasModelPermissions
from rest_framework.views import APIView
from django.db import transaction, IntegrityError


class SectionViewSet(viewsets.ModelViewSet):
    queryset = Section.objects.all()
    serializer_class = SectionSerializer
    permission_classes = [HasModelPermissions]

    @action(detail=False, methods=['get'])
    def by_suite(self, request):
        suite_id = request.query_params.get('test_suite_id')
        if suite_id:
            sections = Section.objects.filter(test_suite_id=suite_id).values('section_id', 'name')
            return Response(list(sections))
        return Response({'detail': 'Test suite ID not provided'}, status=status.HTTP_400_BAD_REQUEST)

class TestSuiteFileViewSet(viewsets.ModelViewSet):
    queryset = TestSuiteFile.objects.all()
    serializer_class = TestSuiteFileSerializer
    permission_classes = [HasModelPermissions]

class TestSuiteViewSet(viewsets.ModelViewSet):
    queryset = TestSuite.objects.all()
    serializer_class = TestSuiteSerializer
    permission_classes = [HasModelPermissions]
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        test_suite = serializer.save()

        # Check if files are in the request and create TestSuiteFile objects
        files = request.FILES.getlist('files')
        for file in files:
            TestSuiteFile.objects.create(test_suite_id=test_suite, file=file)

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def get_queryset(self):
        # Get 'project_id' from query parameters
        project_id = self.request.query_params.get('project_id', None)
        
        
        # Apply filter directly if 'project_id' is provided
        if project_id:
            return TestSuite.objects.filter(project_id=project_id)
        
        # Return all milestones if 'project_id' is not provided
        return TestSuite.objects.all()
    

class DeleteSectionView(APIView):
    def delete(self, request, section_id):
        try:
            with transaction.atomic():
                # Fetch the section
                section = Section.objects.get(section_id=section_id)
                
                # Delete all test cases associated with the section
                TestCase.objects.filter(section_id=section_id).delete()
                
                # Delete the section itself
                section.delete()
                
            return Response({'message': 'Section and its test cases deleted successfully'}, status=status.HTTP_200_OK)
        except Section.DoesNotExist:
            return Response({'error': 'Section not found'}, status=status.HTTP_404_NOT_FOUND)
        except IntegrityError:
            return Response({'error': 'Database integrity error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
