from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views.test_case import *

router = DefaultRouter()
router.register(r'types_for_test_case', TypesForTestCaseViewSet)
router.register(r'priority_for_test_case', PriorityForTestCaseViewSet)
router.register(r'template_for_test_case', TemplateForTestCaseViewSet)
router.register(r'test_case_files', TestCaseFilesViewSet)
router.register(r'test_case_tickets', TestCaseTicketsViewSet)
router.register(r'test_cases', TestCaseViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
