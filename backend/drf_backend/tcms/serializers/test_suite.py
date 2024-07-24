from rest_framework import serializers
from ..models import TestSuite, Section, TestSuiteFile



class SectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Section
        fields = '__all__'

class TestSuiteFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestSuiteFile
        fields = '__all__'

class TestSuiteSerializer(serializers.ModelSerializer):
    files = TestSuiteFileSerializer(many=True, read_only=True)
    class Meta:
        model = TestSuite
        fields = '__all__'