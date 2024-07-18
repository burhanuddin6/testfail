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



# added  by mariam

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


class TestRunSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestRun
        fields = '__all__'

class TestRunFilesSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestRunFiles
        fields = '__all__'

class TestRunTicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestRunTicket
        fields = '__all__'

class TestPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestPlan
        fields = '__all__'

class TestPlanFilesSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestPlanFiles
        fields = '__all__'

class TestPlanTicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestPlanTicket
        fields = '__all__'






class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class UserApiKeySerializer(serializers.ModelSerializer):
    class Meta:
        model = UserApiKey
        fields = '__all__'

class UserAccountIntegrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccountIntegration
        fields = '__all__'





class TestRunTestCaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestRunTestCase
        fields = '__all__'





class TestPlanTestCaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestPlanTestCase
        fields = '__all__'

class TestPlanTestSuiteSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestPlanTestSuite
        fields = '__all__'
