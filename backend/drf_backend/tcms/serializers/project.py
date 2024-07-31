from ..models import *
from rest_framework import serializers

class ProjectSerializer(serializers.ModelSerializer):
    test_suite_count = serializers.SerializerMethodField()
    active_test_run_count = serializers.SerializerMethodField()
    active_milestone_count = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = '__all__'

    def get_test_suite_count(self, obj):
        return TestSuite.objects.filter(project_id=obj).count()

    def get_active_test_run_count(self, obj):
        return TestRun.objects.filter(project_id=obj, is_complete=False).count()

    def get_active_milestone_count(self, obj):
        return Milestone.objects.filter(project_id=obj, is_complete=False).count()
