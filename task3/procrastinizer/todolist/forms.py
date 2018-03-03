from django import forms

from .models import Task


class TaskCreationForm(forms.ModelForm):
    name = forms.CharField(label="Task name:", required=True, max_length=200)
    details = forms.TextInput()#label="Description"

    class Meta:
        model = Task
        fields = ('name', 'details')
