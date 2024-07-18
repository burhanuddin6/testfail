from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
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

    def get_serializer_class(self):
        # if self.action in ['create', 'update', 'partial_update']:
        #     return TestCaseCreateUpdateSerializer
        return TestCaseSerializer
    

# added by mariam
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





class TestSuiteViewSet(viewsets.ModelViewSet):
    queryset = TestSuite.objects.all()
    serializer_class = TestSuiteSerializer

class SectionViewSet(viewsets.ModelViewSet):
    queryset = Section.objects.all()
    serializer_class = SectionSerializer

class TestSuiteFilesViewSet(viewsets.ModelViewSet):
    queryset = TestSuiteFiles.objects.all()
    serializer_class = TestSuiteFilesSerializer





class TestRunViewSet(viewsets.ModelViewSet):
    queryset = TestRun.objects.all()
    serializer_class = TestRunSerializer

class TestRunFilesViewSet(viewsets.ModelViewSet):
    queryset = TestRunFiles.objects.all()
    serializer_class = TestRunFilesSerializer

class TestRunTicketViewSet(viewsets.ModelViewSet):
    queryset = TestRunTicket.objects.all()
    serializer_class = TestRunTicketSerializer


class TestPlanViewSet(viewsets.ModelViewSet):
    queryset = TestPlan.objects.all()
    serializer_class = TestPlanSerializer

class TestPlanFilesViewSet(viewsets.ModelViewSet):
    queryset = TestPlanFiles.objects.all()
    serializer_class = TestPlanFilesSerializer

class TestPlanTicketViewSet(viewsets.ModelViewSet):
    queryset = TestPlanTicket.objects.all()
    serializer_class = TestPlanTicketSerializer





class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserApiKeyViewSet(viewsets.ModelViewSet):
    queryset = UserApiKey.objects.all()
    serializer_class = UserApiKeySerializer

class UserAccountIntegrationViewSet(viewsets.ModelViewSet):
    queryset = UserAccountIntegration.objects.all()
    serializer_class = UserAccountIntegrationSerializer






class TestRunTestCaseViewSet(viewsets.ModelViewSet):
    queryset = TestRunTestCase.objects.all()
    serializer_class = TestRunTestCaseSerializer




class TestPlanTestCaseViewSet(viewsets.ModelViewSet):
    queryset = TestPlanTestCase.objects.all()
    serializer_class = TestPlanTestCaseSerializer

class TestPlanTestSuiteViewSet(viewsets.ModelViewSet):
    queryset = TestPlanTestSuite.objects.all()
    serializer_class = TestPlanTestSuiteSerializer