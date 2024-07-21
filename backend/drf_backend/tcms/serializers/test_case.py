from rest_framework import serializers
from ..models import TestCase, TypesForTestCase, PriorityForTestCase, TemplateForTestCase, TestCaseFiles, TestCaseTickets, \
StatusForTestCase, TestCaseResultFiles, BugTrackerTickets, TestCaseResults

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

class TestCaseFilesSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestCaseFiles
        fields = '__all__'

class TestCaseTicketsSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestCaseTickets
        fields = '__all__'

class TestCaseSerializer(serializers.ModelSerializer):
    files = TestCaseFilesSerializer(many=True, read_only=True)
    tickets = TestCaseTicketsSerializer(many=True, read_only=True)

    class Meta:
        model = TestCase
        fields = '__all__'

class StatusForTestCaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = StatusForTestCase
        fields = '__all__'

class TestCaseResultFilesSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestCaseResultFiles
        fields = '__all__'

class BugTrackerTicketsSerializer(serializers.ModelSerializer):
    class Meta:
        model = BugTrackerTickets
        fields = '__all__'

class TestCaseResultsSerializer(serializers.ModelSerializer):
    files = TestCaseResultFilesSerializer(many=True, read_only=True)
    tickets = BugTrackerTicketsSerializer(many=True, read_only=True)

    class Meta:
        model = TestCaseResults
        fields = '__all__'


























