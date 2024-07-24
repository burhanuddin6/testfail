from rest_framework import serializers
from ..models import StatusForTestCase, TestCaseResultFile, BugTrackerTicket, TestCaseResult

class StatusForTestCaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = StatusForTestCase
        fields = '__all__'

class TestCaseResultFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestCaseResultFile
        fields = '__all__'

class BugTrackerTicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = BugTrackerTicket
        fields = '__all__'

class TestCaseResultSerializer(serializers.ModelSerializer):
    files = TestCaseResultFileSerializer(many=True, read_only=True)
    tickets = BugTrackerTicketSerializer(many=True, read_only=True)

    class Meta:
        model = TestCaseResult
        fields = '__all__'


