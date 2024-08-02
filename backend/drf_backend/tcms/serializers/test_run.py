from rest_framework import serializers
from ..models import TestRun, TestRunFile, TestRunTicket, TestRunTestCaseResult
from .user import UserSerializer

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
    tickets = TestRunTicketSerializer(many=True, read_only=True)
    created_by_info = UserSerializer(read_only=True)
    class Meta:
        model = TestRun
        fields = '__all__'


class TestRunTestCaseResultsSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestRunTestCaseResult
        fields = '__all__'
    