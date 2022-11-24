from django.shortcuts import render
from rest_framework.generics import CreateAPIView

from .serializer import CustomUserSerializer

# Create your views here.
class CreateUser(CreateAPIView): 
    # queryset= CustomUser.objects.all()
    serializer_class=CustomUserSerializer
