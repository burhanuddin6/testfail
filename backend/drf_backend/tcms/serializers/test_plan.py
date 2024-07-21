from rest_framework import serializers
from ..models import TestPlan, TestPlanFile, TestPlanTicket, TestPlanTestCase, TestPlanTestSuite

class TestPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestPlan
        fields = '__all__'

class TestPlanFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestPlanFile
        fields = '__all__'

class TestPlanTicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestPlanTicket
        fields = '__all__'

class TestPlanTestCaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestPlanTestCase
        fields = '__all__'

class TestPlanTestSuiteSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestPlanTestSuite
        fields = '__all__'