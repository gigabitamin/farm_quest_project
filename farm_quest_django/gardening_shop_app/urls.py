from django.urls import path
from . import views
from .views import ShopingTbList

urlpatterns = [
    path('gardening_shop_index/', views.gardening_shop_index, name='gardening_shop_index'),
    path('api/products/', ShopingTbList.as_view(), name='shopingtb-list'),
    path('gardening_shop_review_anlystics', views.gardening_shop_review_anlystics, name='gardening_shop_review_anlystics'),
    path('gardening_shop_search/<str:keyword>', views.gardening_shop_search, name='gardening_shop_search'),
]
