from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from ..models import *
from ..serializers.project import *
from ..permissions import HasModelPermissions

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [HasModelPermissions]

    # def create(self, request, *args, **kwargs):
    #     serializer = self.get_serializer(data=request.data)
    #     serializer.is_valid(raise_exception=True)
    #     test_plan = serializer.save()

    #     # Check if files are in the request and create TestPlanFile objects
    #     files = request.FILES.getlist('files')
    #     for file in files:
    #         TestPlanFile.objects.create(test_plan_id=test_plan, file=file)

    #     headers = self.get_success_headers(serializer.data)
    #     return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
