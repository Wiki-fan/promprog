from django.db import models


# Create your models here.
class Task(models.Model):
    name = models.CharField(max_length=200)
    details = models.CharField(max_length=1000)
    is_done = models.BooleanField(default=False)
    set_date = models.DateTimeField(auto_now=True)
