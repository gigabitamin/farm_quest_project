from django.urls import path
from . import views

urlpatterns = [
    path('guide_index/', views.guide_index, name='guide_index'),
    path('guide_detail/', views.guide_detail, name='guide_detail'),
    
]
