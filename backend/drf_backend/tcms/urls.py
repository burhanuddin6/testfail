from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()

#test case 
router.register(r'types_for_testcase', TypesForTestCaseViewSet)
router.register(r'priority_for_testcase', PriorityForTestCaseViewSet)
router.register(r'template_for_testcase', TemplateForTestCaseViewSet)
router.register(r'testcase_files', TestCaseFilesViewSet)
router.register(r'testcase_tickets', TestCaseTicketsViewSet)
router.register(r'testcases', TestCaseViewSet)

#test plan
router.register(r'test_plans', TestPlanViewSet)
router.register(r'test_plan_files', TestPlanFilesViewSet)
router.register(r'test_plan_tickets', TestPlanTicketViewSet)
router.register(r'test_plan_test_cases', TestPlanTestCaseViewSet)
router.register(r'test_plan_test_suites', TestPlanTestSuiteViewSet)

#test suite
router.register(r'test_suites', TestSuiteViewSet)
router.register(r'sections', SectionViewSet)
router.register(r'test_suite_files', TestSuiteFilesViewSet)

#user
router.register(r'user_api_keys', UserApiKeyViewSet)
router.register(r'user_account_integrations', UserAccountIntegrationViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('verify-email/', verify_email, name='verify_email'),
]
