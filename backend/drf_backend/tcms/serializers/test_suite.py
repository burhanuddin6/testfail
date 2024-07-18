from rest_framework import serializers
from ..models.test_suite import *


class TestSuiteSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestSuite
        fields = '__all__'

class SectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Section
        fields = '__all__'

class TestSuiteFilesSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestSuiteFiles
        fields = '__all__'