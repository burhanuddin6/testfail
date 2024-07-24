from django.shortcuts import render

from rest_framework import viewsets
from ..models.test_run import *
from ..serializers.test_run import *


class TestRunViewSet(viewsets.ModelViewSet):
    queryset = TestRun.objects.all()
    serializer_class = TestRunSerializer

class TestRunFileViewSet(viewsets.ModelViewSet):
    queryset = TestRunFile.objects.all()
    serializer_class = TestRunFileSerializer

class TestRunTicketViewSet(viewsets.ModelViewSet):
    queryset = TestRunTicket.objects.all()
    serializer_class = TestRunTicketSerializer

class TestRunTestCaseViewSet(viewsets.ModelViewSet):
    queryset = TestRunTestCase.objects.all()
    serializer_class = TestRunTestCaseSerializer