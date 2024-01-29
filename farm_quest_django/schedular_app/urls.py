from django.urls import path
from . import views



urlpatterns = [
    path('schedular', views.schedular, name='schedular'),    
    path('weather', views.weather, name='weather'),    
    # path('api/weather', views.api_weather, name='api/weather'),    
    path('get_location_options/<int:level>/', views.get_location_options, name='get_location_options'),    
    path('submit_selected_locations/', views.submit_selected_locations, name='submit_selected_locations'),
    path('api/get_grid_data/', views.get_grid_data, name='get_grid_data'),
    path('api/get_location2_data/', views.get_location2_data, name='get_location2_data'),
    path('api/get_location3_data/', views.get_location3_data, name='get_location2_data'),
    path('api/get_nx_ny/', views.get_nx_ny_from_locations, name='get_nx_ny_from_locations'),
    path('api/scheduler/<int:plant_no>/', views.get_scheduler_info, name='get_scheduler_info'),

    # 다른 URL 패턴들 추가 가능

]