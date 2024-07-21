from rest_framework import serializers
from ..models import TestSuite, Section, TestSuiteFile


class TestSuiteSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestSuite
        fields = '__all__'

class SectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Section
        fields = '__all__'

class TestSuiteFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestSuiteFile
        fields = '__all__'