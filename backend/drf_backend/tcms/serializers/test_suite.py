from rest_framework import serializers
from ..models import TestSuite, Section, TestSuiteFile, TestCase



class SectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Section
        fields = '__all__'

class TestSuiteFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestSuiteFile
        fields = '__all__'

class TestSuiteSerializer(serializers.ModelSerializer):
    number_of_testcases = serializers.SerializerMethodField()
    number_of_active_testruns = serializers.SerializerMethodField()
    files = TestSuiteFileSerializer(many=True, read_only=True)
    class Meta:
        model = TestSuite
        fields = '__all__'
    
    def get_number_of_testcases(self, obj):
        return TestCase.objects.filter(section_id__test_suite_id=obj).count()
    
    def get_number_of_active_testruns(self, obj):
        return obj.testruns.filter(is_complete=False).count()
    
