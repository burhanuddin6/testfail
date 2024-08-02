from rest_framework import serializers
from ..models import TestCaseResultFile, BugTrackerTicket, TestCaseResult
from .user import UserSerializer

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
    created_by_info = UserSerializer(read_only=True)

    class Meta:
        model = TestCaseResult
        fields = '__all__'


