from rest_framework import serializers
from todolist.models import Task


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = [
            'id',
            'name',
            'details',
            'is_done',
            'set_date'
        ]
