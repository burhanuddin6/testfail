from rest_framework import serializers
from ..models import TestPlan, TestPlanFile, TestPlanTicket, TestPlanTestRun
from .user import UserSerializer

class TestPlanFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestPlanFile
        fields = '__all__'

class TestPlanTicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestPlanTicket
        fields = '__all__'

class TestPlanSerializer(serializers.ModelSerializer):
    files = TestPlanFileSerializer(many=True, read_only=True)
    tickets = TestPlanTicketSerializer(many=True, read_only=True)
    created_by_info = UserSerializer(read_only=True, source='created_by')
    class Meta:
        model = TestPlan
        fields = '__all__'

class TestPlanTestRunSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestPlanTestRun
        fields = '__all__'

