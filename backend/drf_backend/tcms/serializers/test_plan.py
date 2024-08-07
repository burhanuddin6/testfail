from rest_framework import serializers
from ..models import TestPlan, TestPlanFile, TestPlanTicket, TestPlanTestRun
from .user import UserSerializer
from .test_run import TestRunSerializer
from .milestone import MilestoneSerializer

class TestPlanFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestPlanFile
        fields = '__all__'

class TestPlanTicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestPlanTicket
        fields = '__all__'

class TestPlanTestRunSerializer(serializers.ModelSerializer):
    test_run_info = serializers.SerializerMethodField()
    class Meta:
        model = TestPlanTestRun
        fields = '__all__'

    def get_test_run_info(self, obj):
        return {
            'test_run_id': obj.test_run_id.pk,
            'test_run_name': obj.test_run_id.name,
            'number_of_passed_test_cases': obj.test_run_id.number_of_passed_test_cases,
            'number_of_failed_test_cases': obj.test_run_id.number_of_failed_test_cases,
            'number_of_blocked_test_cases': obj.test_run_id.number_of_blocked_test_cases,
            'number_of_untested_test_cases': obj.test_run_id.number_of_untested_test_cases,
            'number_of_partial_test_cases': obj.test_run_id.number_of_partial_test_cases,
            'number_of_test_cases': obj.test_run_id.number_of_test_cases,
        }

class TestPlanSerializer(serializers.ModelSerializer):
    files = TestPlanFileSerializer(many=True, read_only=True)
    tickets = TestPlanTicketSerializer(many=True, read_only=True)
    created_by_info = UserSerializer(read_only=True, source='created_by')
    milestone_info = MilestoneSerializer(read_only=True, source='milestone_id')

    test_plan_test_runs = TestPlanTestRunSerializer(many=True, read_only=True, source='test_runs')
    class Meta:
        model = TestPlan
        fields = '__all__'



