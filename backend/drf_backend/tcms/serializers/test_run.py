from rest_framework import serializers
from ..models import TestRun, TestRunFile, TestRunTicket, TestRunTestCase

class TestRunSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestRun
        fields = '__all__'

class TestRunFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestRunFile
        fields = '__all__'

class TestRunTicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestRunTicket
        fields = '__all__'

class TestRunTestCaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestRunTestCase
        fields = '__all__'