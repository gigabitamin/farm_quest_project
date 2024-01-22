from django.urls import path
from . import views



urlpatterns = [
    path('scheduler_general', views.scheduler_general, name='scheduler_general'),    
    path('scheduler_personal', views.scheduler_personal, name='scheduler_personal'),    
]