from django.shortcuts import render

from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from ..models.test_plan import *
from ..serializers.test_plan import *
from ..permissions import HasModelPermissions

class TestPlanViewSet(viewsets.ModelViewSet):
    queryset = TestPlan.objects.all()
    serializer_class = TestPlanSerializer
    permission_classes = [HasModelPermissions]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        test_plan = serializer.save()

        # Check if files are in the request and create TestPlanFile objects
        files = request.FILES.getlist('files')
        for file in files:
            TestPlanFile.objects.create(test_plan_id=test_plan, file=file)

        try:
            tickets = request.data.getlist('tickets')
        except:
            tickets = request.data.get('tickets', [])
        if tickets:
            for ticket in tickets:
                TestPlanTicket.objects.create(test_plan_id=test_plan, ticket=ticket)

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    
    def get_queryset(self):
        project_id = self.request.query_params.get('project_id', None)

        if project_id:
            return TestPlan.objects.filter(project_id=project_id)

        return TestPlan.objects.all()

class TestPlanFileViewSet(viewsets.ModelViewSet):
    queryset = TestPlanFile.objects.all()
    serializer_class = TestPlanFileSerializer
    permission_classes = [HasModelPermissions]

class TestPlanTicketViewSet(viewsets.ModelViewSet):
    queryset = TestPlanTicket.objects.all()
    serializer_class = TestPlanTicketSerializer
    permission_classes = [HasModelPermissions]
    
class TestPlanTestRunViewSet(viewsets.ModelViewSet):
    queryset = TestPlanTestRun.objects.all()
    serializer_class = TestPlanTestRunSerializer
    permission_classes = [HasModelPermissions]