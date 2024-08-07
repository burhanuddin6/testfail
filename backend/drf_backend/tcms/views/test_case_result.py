from rest_framework import viewsets, status
from rest_framework.response import Response
from ..models import TestCaseResult, TestCaseResultChanges
from ..serializers import TestCaseResultSerializer, TestCaseResultChangesSerializer

class TestCaseResultViewSet(viewsets.ModelViewSet):
    queryset = TestCaseResult.objects.all()
    serializer_class = TestCaseResultSerializer

    def create(self, request, *args, **kwargs):
        result_serializer = self.get_serializer(data=request.data)
        if result_serializer.is_valid():
            print("result_serializer is valid\n\n")
            result = result_serializer.save()
            change_data = {
                'test_case_result_id': result.pk,
                'status': request.data.get('status', TestCaseResult.UNTESTED),
                'version': request.data.get('version', ''),
                'comment': request.data.get('comment', ''),
                'result_time': request.data.get('result_time', None),
                'defect': request.data.get('defect', ''),
                'elapsed_time_in_seconds': request.data.get('elapsed_time_in_seconds', 0),
                'created_by': request.data.get('created_by'),
                'files': request.data.get('files', [])
            }
            change_serializer = TestCaseResultChangesSerializer(data=change_data)
            if change_serializer.is_valid():
                print("change_serializer is valid\n\n")
                change = change_serializer.save()
                result.latest_change_id = change
                result.save()
                headers = self.get_success_headers(result_serializer.data)
                return Response(result_serializer.data, status=status.HTTP_201_CREATED, headers=headers)
            else:
                result.delete()
                return Response(change_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(result_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        if serializer.is_valid():
            result = serializer.save()
            change_data = {
                'test_case_result_id': result.pk,
                'status': request.data.get('status', TestCaseResult.UNTESTED),
                'version': request.data.get('version', ''),
                'comment': request.data.get('comment', ''),
                'result_time': request.data.get('result_time', None),
                'defect': request.data.get('defect', ''),
                'elapsed_time_in_seconds': request.data.get('elapsed_time_in_seconds', 0),
                'created_by': request.data.get('created_by'),
                'files': request.data.get('files', [])
            }
            change_serializer = TestCaseResultChangesSerializer(data=change_data)
            if change_serializer.is_valid():
                change = change_serializer.save()
                result.latest_change_id = change
                result.save()
                if getattr(instance, '_prefetched_objects_cache', None):
                    instance._prefetched_objects_cache = {}
                return Response(serializer.data)
            return Response(change_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
