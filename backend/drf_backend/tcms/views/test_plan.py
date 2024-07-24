from django.shortcuts import render

from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from ..models.test_plan import *
from ..serializers.test_plan import *


class TestPlanViewSet(viewsets.ModelViewSet):
    queryset = TestPlan.objects.all()
    serializer_class = TestPlanSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        test_plan = serializer.save()

        # Check if files are in the request and create TestPlanFile objects
        files = request.FILES.getlist('files')
        for file in files:
            TestPlanFile.objects.create(test_plan_id=test_plan, file=file)

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

class TestPlanFileViewSet(viewsets.ModelViewSet):
    queryset = TestPlanFile.objects.all()
    serializer_class = TestPlanFileSerializer

class TestPlanTicketViewSet(viewsets.ModelViewSet):
    queryset = TestPlanTicket.objects.all()
    serializer_class = TestPlanTicketSerializer


class TestPlanTestCaseViewSet(viewsets.ModelViewSet):
    queryset = TestPlanTestCase.objects.all()
    serializer_class = TestPlanTestCaseSerializer

class TestPlanTestSuiteViewSet(viewsets.ModelViewSet):
    queryset = TestPlanTestSuite.objects.all()
    serializer_class = TestPlanTestSuiteSerializer


