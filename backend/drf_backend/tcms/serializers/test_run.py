from rest_framework import serializers
from ..models import TestRun, TestRunFile, TestRunTicket, TestRunTestCase


class TestRunFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestRunFile
        fields = '__all__'

class TestRunTicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestRunTicket
        fields = '__all__'

class TestRunSerializer(serializers.ModelSerializer):
    files = TestRunFileSerializer(many=True, read_only=True)
    tickets = TestRunTicketSerializer(many=True)
    class Meta:
        model = TestRun
        fields = '__all__'

class TestRunTestCaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestRunTestCase
        fields = '__all__'