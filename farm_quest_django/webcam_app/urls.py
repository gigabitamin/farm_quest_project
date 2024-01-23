from django.urls import path
from .views import webcam_feed, index

urlpatterns = [
    path('', index, name='index'),
    path('webcam_feed/', webcam_feed, name='webcam_feed'),
]
