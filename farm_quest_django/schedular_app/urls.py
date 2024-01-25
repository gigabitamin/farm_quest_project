from django.urls import path
from . import views



urlpatterns = [
    path('schedular', views.schedular, name='schedular'),    
]