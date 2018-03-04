from django.shortcuts import render
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, generics
from rest_framework.authentication import BasicAuthentication
from rest_framework.permissions import AllowAny

from rest.middleware import CsrfExemptSessionAuthentication
from .serializers import *
from todolist.models import Task


# Create your views here.
class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    permission_classes = (AllowAny,)
    #authentication_classes = (CsrfExemptSessionAuthentication, BasicAuthentication)
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
