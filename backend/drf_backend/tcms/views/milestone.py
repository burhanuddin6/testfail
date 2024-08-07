from rest_framework import viewsets
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.decorators import parser_classes
from ..models import Milestone, MilestoneTicket, MilestoneFile
from ..serializers import MilestoneSerializer, MilestoneTicketSerializer, MilestoneFileSerializer
from ..permissions import HasModelPermissions

class MilestoneTicketViewSet(viewsets.ModelViewSet):
    queryset = MilestoneTicket.objects.all()
    serializer_class = MilestoneTicketSerializer
    permission_classes = [HasModelPermissions]

class MilestoneFileViewSet(viewsets.ModelViewSet):
    queryset = MilestoneFile.objects.all()
    serializer_class = MilestoneFileSerializer
    permission_classes = [HasModelPermissions]

class MilestoneViewSet(viewsets.ModelViewSet):
    queryset = Milestone.objects.all()
    serializer_class = MilestoneSerializer
    permission_classes = [HasModelPermissions]

    @parser_classes([MultiPartParser, FormParser])
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        milestone = serializer.save()

        # Check if files are in the request and create MilestoneFile objects
        files = request.FILES.getlist('files')
        for file in files:
            MilestoneFile.objects.create(milestone_id=milestone, file=file)

        try:
            tickets = request.data.getlist('tickets')
        except:
            tickets = request.data.get('tickets', [])
        if tickets:
            for ticket in tickets:
                MilestoneTicket.objects.create(milestone_id=milestone, ticket=ticket)

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    
    def get_queryset(self):
        
        project_id = self.request.query_params.get('project_id', None)
        milestone_id = self.request.query_params.get('parent_milestone_id', None)

        if project_id:
            return Milestone.objects.filter(project_id=project_id)
        
        if milestone_id:
            return Milestone.objects.filter(parent_id= milestone_id)

        return Milestone.objects.all()
    
    @action(detail=False, methods=['get'])
    def get_name_id(self, request):
        
        project_id = request.query_params.get('project_id', None)
        
        if project_id:
            milestones = Milestone.objects.filter(project_id=project_id, is_complete=False).values('id', 'name')

        return Response({'milestones': list(milestones)})
    