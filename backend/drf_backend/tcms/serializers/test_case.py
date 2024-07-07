from rest_framework import serializers
from ..models.test_case import *

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

# class TestCaseCreateUpdateSerializer(serializers.ModelSerializer):
#     files = TestCaseFilesSerializer(many=True, write_only=True)
#     tickets = TestCaseTicketsSerializer(many=True, write_only=True)

#     class Meta:
#         model = TestCase
#         fields = '__all__'
