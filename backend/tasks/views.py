from django.shortcuts import render

from rest_framework import viewsets
from .serialzers import TaskSerializer
from .models import Task


class TaskView(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
