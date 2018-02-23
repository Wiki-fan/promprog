from django.urls import path
from django.conf.urls.static import static
from django.conf import settings

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('<int:task_id>/', views.task_info, name='task_info'),
    path('<int:task_id>/do', views.do_task, name='do_task')
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
