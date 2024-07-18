from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register(r'types_for_testcase', TypesForTestCaseViewSet)
router.register(r'priority_for_testcase', PriorityForTestCaseViewSet)
router.register(r'template_for_testcase', TemplateForTestCaseViewSet)
router.register(r'testcase_files', TestCaseFilesViewSet)
router.register(r'testcase_tickets', TestCaseTicketsViewSet)
router.register(r'testcases', TestCaseViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
