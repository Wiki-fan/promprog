from django.shortcuts import render, redirect
from django.http import HttpResponse, HttpResponseRedirect
from .models import Task
from .forms import TaskCreationForm


def index(request):
    latest_tasks_list = Task.objects.order_by('-set_date')
    context_dict = {'active_tasks_list': latest_tasks_list.filter(is_done=False),
                    'completed_tasks_list': latest_tasks_list.filter(is_done=True)}
    if request.method == 'POST':
        form = TaskCreationForm(request.POST, request.FILES)
        if form.is_valid():
            # Filling some fields directly from form
            instance = form.save(commit=False)
            instance.is_done = False
            instance.save()
            return HttpResponseRedirect('')

        else:
            print(form.errors)
    else:
        form = TaskCreationForm()
    context_dict['task_creation_form'] = form
    return render(request, 'todolist/index.html', context_dict)


def task_info(request, task_id):
    task = Task.objects.get(id=task_id)
    context_dict = {'task': task}

    if request.method == 'POST':
        task.is_done = True
        task.save()

    #context_dict['task_creation_form'] = form
    return render(request, 'todolist/task_info.html', context_dict)

def do_task(request, task_id):
    task = Task.objects.get(id=task_id)
    if request.method == 'POST':
        task.is_done = True
        task.save()
    return redirect('/')
