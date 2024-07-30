from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *
from .views.project import *


router = DefaultRouter()

#test case 
router.register(r'types_for_testcase', TypesForTestCaseViewSet)
router.register(r'priority_for_testcase', PriorityForTestCaseViewSet)
router.register(r'testcase_files', TestCaseFileViewSet)
router.register(r'testcase_tickets', TestCaseTicketViewSet)
router.register(r'testcases', TestCaseViewSet)

#test case result
router.register(r'status_for_testcase', StatusForTestCaseViewSet)
router.register(r'testcase_results', TestCaseResultViewSet)
router.register(r'testcase_result_files', TestCaseResultFileViewSet)


#test plan
router.register(r'test_plans', TestPlanViewSet)
router.register(r'test_plan_files', TestPlanFileViewSet)
router.register(r'test_plan_tickets', TestPlanTicketViewSet)
router.register(r'test_plan_test_cases', TestPlanTestCaseViewSet)
router.register(r'test_plan_test_suites', TestPlanTestSuiteViewSet)

#test suite
router.register(r'test_suites', TestSuiteViewSet)
router.register(r'sections', SectionViewSet)
router.register(r'test_suite_files', TestSuiteFileViewSet)

#test run --to get checked
router.register(r'test_run', TestRunViewSet)
router.register(r'test_run_files', TestRunFileViewSet)
router.register(r'test_run_tickets', TestRunTicketViewSet)
router.register(r'test_run_test_cases', TestRunTestCaseViewSet)

#milestone
router.register(r'milestones', MilestoneViewSet)
router.register(r'milestone_files', MilestoneFileViewSet)
router.register(r'milestone_tickets', MilestoneTicketViewSet)

#project
router.register(r'project', ProjectViewSet)


#user
router.register(r'user_api_keys', UserApiKeyViewSet)
router.register(r'user_account_integrations', UserAccountIntegrationViewSet)



urlpatterns = [
    path('', include(router.urls)),
    path('users/<int:user_id>/soft_delete/', UserSoftDeleteView.as_view(), name='user-soft-delete'),
    path('verify-email/', verify_email, name='verify_email'),
    path('get_qa_users/', get_qa_users, name='get_qa_users'),

]
