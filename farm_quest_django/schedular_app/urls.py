from django.urls import path
from . import views



urlpatterns = [
    path('schedular', views.schedular, name='schedular'),    
    path('weather', views.weather, name='weather'),    
    path('get_location_options/<int:level>/', views.get_location_options, name='get_location_options'),    
    path('submit_selected_locations/', views.submit_selected_locations, name='submit_selected_locations'),

]