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
    test_case_results = serializers.SerializerMethodField()
    class Meta:
        model = TestRun
        fields = '__all__'

    def get_test_case_results(self, obj):
        # id, title, assigned_to, status
        test_case_results = []
        for test_case_result in obj.test_case_results.all():
            if (test_case_result.latest_change_id.assigned_to is not None):
                assigned_to = test_case_result.latest_change_id.assigned_to.first_name + ' ' + test_case_result.latest_change_id.assigned_to.last_name
            else:
                assigned_to = ""
            test_case_results.append({
                'id': test_case_result.pk,
                'title': test_case_result.test_case_id.title,
                'status': test_case_result.latest_change_id.status,
                'assigned_to': assigned_to
            })
        return test_case_results


    