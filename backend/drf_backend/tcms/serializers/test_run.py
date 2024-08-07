from rest_framework import serializers
from ..models import TestRun, TestRunFile, TestRunTicket
from .user import UserSerializer
from .milestone import MilestoneSerializer

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
    created_by_info = UserSerializer(read_only=True, source='created_by')
    milestone_info = MilestoneSerializer(read_only=True, source='milestone_id')
    class Meta:
        model = TestRun
        fields = '__all__'


    