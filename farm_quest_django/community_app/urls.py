from django.urls import path
from . import views

urlpatterns = [
    path('community_index/', views.community_index, name='community_index'),
    path('farm_log_index/', views.farm_log_index, name='farm_log_index'),
    path('qna_index/', views.qna_index, name='qna_index'),
]
