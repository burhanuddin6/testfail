from django.shortcuts import render

from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from ..models.test_suite import *
from ..serializers.test_suite import *
from ..permissions import HasModelPermissions


class SectionViewSet(viewsets.ModelViewSet):
    queryset = Section.objects.all()
    serializer_class = SectionSerializer
    permission_classes = [HasModelPermissions]

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