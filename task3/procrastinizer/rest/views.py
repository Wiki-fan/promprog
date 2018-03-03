from django.shortcuts import render
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, generics
from .serializers import *
from todolist.models import Task


# Create your views here.
class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    #lookup_field = 'is_done'

    def get_serializer_class(self):
        return TaskSerializer

    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('is_done', 'set_date')
    # def list(self, request, *args, **kwargs):
    #     print(request, kwargs)
    #     is_done = kwargs.get('is_done', None)
    #     self.queryset = Task.objects.filter(is_done=is_done)
    #     return super(TaskViewSet, self).retrieve(request, *args, **kwargs)

#
# class TaskList(generics.ListAPIView):
#     serializer_class = TaskSerializer
#     queryset = Task.objects.all()
#
#     def get_queryset(self):
#         """
#         This view should return a list of all the purchases for
#         the user as determined by the username portion of the URL.
#         """
#         queryset = Task.objects.all()
#         is_done = self.request.query_params.get('is_done', None)
#         if is_done is not None:
#             queryset = queryset.filter(task__is_done=is_done)
#         return queryset
