from rest_framework import serializers
from ..models import Milestone, MilestoneTicket, MilestoneFile
from .user import UserSerializer

class MilestoneTicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = MilestoneTicket
        fields = '__all__'

class MilestoneFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = MilestoneFile
        fields = '__all__'

class MilestoneSerializer(serializers.ModelSerializer):
    files = MilestoneFileSerializer(many=True, read_only=True)
    tickets = MilestoneTicketSerializer(many=True, read_only=True)
    created_by_info = UserSerializer(read_only=True)
    class Meta:
        model = Milestone
        fields = '__all__'