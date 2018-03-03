from django.urls import include, path
from rest_framework.routers import DefaultRouter
from .views import *


router = DefaultRouter()
router.register(r'task', TaskViewSet)


urlpatterns = [
    path(r'', include(router.urls))
]
