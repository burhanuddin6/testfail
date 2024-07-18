from django.shortcuts import render

from rest_framework import viewsets
from ..models.test_suite import *
from ..serializers.test_suite import *


class TestSuiteViewSet(viewsets.ModelViewSet):
    queryset = TestSuite.objects.all()
    serializer_class = TestSuiteSerializer

class SectionViewSet(viewsets.ModelViewSet):
    queryset = Section.objects.all()
    serializer_class = SectionSerializer

class TestSuiteFilesViewSet(viewsets.ModelViewSet):
    queryset = TestSuiteFiles.objects.all()
    serializer_class = TestSuiteFilesSerializer