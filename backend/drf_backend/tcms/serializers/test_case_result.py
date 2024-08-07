from rest_framework import serializers
from ..models import TestCaseResult, TestCaseResultChanges, File

class TestCaseResultChangesSerializer(serializers.ModelSerializer):
    files = serializers.PrimaryKeyRelatedField(many=True, queryset=File.objects.all(), required=False)

    class Meta:
        model = TestCaseResultChanges
        fields = '__all__'

class TestCaseResultSerializer(serializers.ModelSerializer):
    changes = TestCaseResultChangesSerializer(many=True, read_only=True)
    title = serializers.SerializerMethodField()

    class Meta:
        model = TestCaseResult
        fields = '__all__'
        extra_fields = ['changes']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['changes'] = TestCaseResultChangesSerializer(instance.testcaseresultchanges_set.all(), many=True).data
        return representation
    
    def get_title(self, obj):
        return obj.test_case_id.title
