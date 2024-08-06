from django.shortcuts import render

from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from ..models.test_run import *
from ..serializers.test_run import *
from ..permissions import HasModelPermissions

class TestRunViewSet(viewsets.ModelViewSet):
    queryset = TestRun.objects.filter(is_part_of_test_plan=False)
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

        try:
            tickets = request.data.getlist('tickets')
        except:
            tickets = request.data.get('tickets', [])
        if tickets:
            for ticket in tickets:
                TestRunTicket.objects.create(test_run_id=test_run, ticket=ticket)

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def get_queryset(self):
        project_id = self.request.query_params.get('project_id', None)
        suite_id = self.request.query_params.get('suite_id', None)
        milestone_id = self.request.query_params.get('milestone_id', None)

        if project_id:
            if suite_id:
                return TestRun.objects.filter(project_id=project_id, test_suite_id=suite_id)
            if milestone_id: 
                return TestRun.objects.filter(project_id=project_id, milestone_id = milestone_id)
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

class TestRunTestCaseResultViewSet(viewsets.ModelViewSet):
    queryset = TestRunTestCaseResult.objects.all()
    serializer_class = TestRunTestCaseResultsSerializer
    permission_classes = [HasModelPermissions]
