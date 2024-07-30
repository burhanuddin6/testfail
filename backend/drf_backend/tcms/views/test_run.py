from django.shortcuts import render

from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from ..models.test_run import *
from ..serializers.test_run import *
from ..permissions import HasModelPermissions

class TestRunViewSet(viewsets.ModelViewSet):
    queryset = TestRun.objects.all()
    serializer_class = TestRunSerializer
    permission_classes = [HasModelPermissions]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        test_run = serializer.save()

        # Check if files are in the request and create TestRunFile objects
        files = request.FILES.getlist('files')
        for file in files:
            TestRunFile.objects.create(test_run_id=test_run, file=file)

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    
    def get_queryset(self):
        
        project_id = self.request.query_params.get('project_id', None)
        
        if project_id:
            return TestRun.objects.filter(project_id=project_id)

        return TestRun.objects.all()

class TestRunFileViewSet(viewsets.ModelViewSet):
    queryset = TestRunFile.objects.all()
    serializer_class = TestRunFileSerializer
    permission_classes = [HasModelPermissions]

class TestRunTicketViewSet(viewsets.ModelViewSet):
    queryset = TestRunTicket.objects.all()
    serializer_class = TestRunTicketSerializer
    permission_classes = [HasModelPermissions]

class TestRunTestCaseViewSet(viewsets.ModelViewSet):
    queryset = TestRunTestCase.objects.all()
    serializer_class = TestRunTestCaseSerializer
    permission_classes = [HasModelPermissions]