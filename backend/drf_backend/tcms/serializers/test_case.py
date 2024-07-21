from rest_framework import serializers
from ..models import TestCase, TypesForTestCase, PriorityForTestCase, TemplateForTestCase, TestCaseFile, TestCaseTicket, \
StatusForTestCase, TestCaseResultFile, BugTrackerTicket, TestCaseResult

class TypesForTestCaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = TypesForTestCase
        fields = '__all__'

class PriorityForTestCaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = PriorityForTestCase
        fields = '__all__'

class TemplateForTestCaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = TemplateForTestCase
        fields = '__all__'

class TestCaseFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestCaseFile
        fields = '__all__'

class TestCaseTicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestCaseTicket
        fields = '__all__'

class TestCaseSerializer(serializers.ModelSerializer):
    files = TestCaseFileSerializer(many=True, read_only=True)
    tickets = TestCaseTicketSerializer(many=True, read_only=True)

    class Meta:
        model = TestCase
        fields = '__all__'

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


























