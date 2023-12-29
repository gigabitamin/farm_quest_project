from django.urls import path
from . import views

urlpatterns = [
    path('gardening_shop_index/', views.gardening_shop_index, name='gardening_shop_index'),      
]
