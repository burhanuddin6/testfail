from rest_framework import serializers
from ..models import TestRun, TestRunFiles, TestRunTicket, TestRunTestCase

class TestRunSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestRun
        fields = '__all__'

class TestRunFilesSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestRunFiles
        fields = '__all__'

class TestRunTicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestRunTicket
        fields = '__all__'

class TestRunTestCaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestRunTestCase
        fields = '__all__'