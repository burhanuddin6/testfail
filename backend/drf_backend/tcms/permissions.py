from rest_framework.permissions import BasePermission, SAFE_METHODS

class HasModelPermissions(BasePermission):
    """
    Custom permission to dynamically check if the user has the specific permission
    for the model and operation.
    """
    def has_permission(self, request, view):
        model_cls = view.queryset.model
        app_label = model_cls._meta.app_label
        model_name = model_cls._meta.model_name

        # print all permission user has
        # print(request.user.get_all_permissions())
        if request.method == 'POST':
            perm = f'{app_label}.add_{model_name}'
        elif request.method in ['PUT', 'PATCH']:
            perm = f'{app_label}.change_{model_name}'
        elif request.method == 'DELETE':
            perm = f'{app_label}.delete_{model_name}'
        elif request.method in SAFE_METHODS:
            perm = f'{app_label}.view_{model_name}'
        else:
            return False

        return request.user.is_authenticated and request.user.has_perm(perm)

    # def has_object_permission(self, request, view, obj):
    #     model_cls = obj._meta.model
    #     app_label = model_cls._meta.app_label
    #     model_name = model_cls._meta.model_name
    #     if request.method in ['PUT', 'PATCH']:
    #         perm = f'{app_label}.change_{model_name}'
    #     elif request.method == 'DELETE':
    #         perm = f'{app_label}.delete_{model_name}'
    #     elif request.method in SAFE_METHODS:
    #         perm = f'{app_label}.view_{model_name}'
    #     else:
    #         return False
    #     return request.user.has_perm(perm, obj)
