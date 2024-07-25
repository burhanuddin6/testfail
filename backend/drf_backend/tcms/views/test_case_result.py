from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from ..models import *
from ..serializers import *
from ..permissions import HasModelPermissions

class StatusForTestCaseViewSet(viewsets.ModelViewSet):
    queryset = StatusForTestCase.objects.all()
    serializer_class = StatusForTestCaseSerializer
    permission_classes = [HasModelPermissions]

class TestCaseResultViewSet(viewsets.ModelViewSet):
    queryset = TestCaseResult.objects.all()
    serializer_class = TestCaseResultSerializer
    permission_classes = [HasModelPermissions]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        test_case_result = serializer.save()

        # Check if files are in the request and create TestCaseResultFile objects
        files = request.FILES.getlist('files')
        for file in files:
            TestCaseResultFile.objects.create(test_case_result_id=test_case_result, file=file)

        tickets = request.data.get('tickets', [])
        for ticket in tickets:
            BugTrackerTicket.objects.create(test_case_result_id=test_case_result, bug_tracker=ticket)

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

class TestCaseResultFileViewSet(viewsets.ModelViewSet):
    queryset = TestCaseResultFile.objects.all()
    serializer_class = TestCaseResultFileSerializer
    permission_classes = [HasModelPermissions]

class BugTrackerTicketViewSet(viewsets.ModelViewSet):
    queryset = BugTrackerTicket.objects.all()
    serializer_class = BugTrackerTicketSerializer
    permission_classes = [HasModelPermissions]
    