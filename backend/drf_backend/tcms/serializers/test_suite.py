from rest_framework import serializers
from ..models import TestSuite, Section, TestSuiteFile, TestCase
from .user import UserSerializer


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
    suite_data = serializers.SerializerMethodField()
    files = TestSuiteFileSerializer(many=True, read_only=True)
    created_by_info = UserSerializer(read_only=True)
    class Meta:
        model = TestSuite
        fields = '__all__'
    
    def get_number_of_testcases(self, obj):
        return TestCase.objects.filter(section_id__test_suite_id=obj).count()
    
    def get_number_of_active_testruns(self, obj):
        return obj.testruns.filter(is_complete=False).count()
    
    def get_suite_data(self, obj):
        # make json object of suites and  cases
        suites = []
        for section in Section.objects.filter(test_suite_id=obj):
            section_json = {
                'section_id': section.section_id,
                'name': section.name,
                'testcases': []
            }
            for testcase in TestCase.objects.filter(section_id=section):
                section_json['testcases'].append({
                    'test_case_id': testcase.test_case_id,
                    'title': testcase.title
                })
            suites.append(section_json)
        return suites    
