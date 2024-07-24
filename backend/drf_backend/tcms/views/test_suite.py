from django.shortcuts import render

from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from ..models.test_suite import *
from ..serializers.test_suite import *



class SectionViewSet(viewsets.ModelViewSet):
    queryset = Section.objects.all()
    serializer_class = SectionSerializer

class TestSuiteFileViewSet(viewsets.ModelViewSet):
    queryset = TestSuiteFile.objects.all()
    serializer_class = TestSuiteFileSerializer

class TestSuiteViewSet(viewsets.ModelViewSet):
    queryset = TestSuite.objects.all()
    serializer_class = TestSuiteSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        test_suite = serializer.save()

        # Check if files are in the request and create TestSuiteFile objects
        files = request.FILES.getlist('files')
        for file in files:
            TestSuiteFile.objects.create(test_suite_id=test_suite, file=file)

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
