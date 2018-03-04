from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets
from rest_framework.permissions import AllowAny

from .serializers import *
from todolist.models import Task


# Create your views here.
class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    permission_classes = (AllowAny,)

    def get_serializer_class(self):
        return TaskSerializer

    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('is_done', 'set_date')
