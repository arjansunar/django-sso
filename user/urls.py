from django.urls import path
from . import views

urlpatterns=[
    path('create', view=views.CreateUser.as_view())
]

