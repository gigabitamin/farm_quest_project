from django.urls import path
from . import views
from .views import *

urlpatterns = [
    path('gardening_shop_index/', views.gardening_shop_index, name='gardening_shop_index'),
    path('api/gardening_shop_search/<str:keyword>/', views.gardening_shop_search, name='gardening_shop_search'),

    path('api/products/', ShopingTbList.as_view(), name='shopingtb_list'),
    path('api/recommended_products', recommended_products, name='recommended_products'),
    
    path('api/products/<int:id>/', views.product_detail, name='product_detail'),
    path('api/shopping_reviews/<int:shoping_tb_no>/', views.shopping_reviews, name='shopping_reviews'),
    path('api/reviews/', views.post_review, name='post_review'),

    path('gardening_shop_review_anlystics', views.gardening_shop_review_anlystics, name='gardening_shop_review_anlystics'),
    path('gardening_shop_search/<str:keyword>', views.gardening_shop_search, name='gardening_shop_search'),
]
