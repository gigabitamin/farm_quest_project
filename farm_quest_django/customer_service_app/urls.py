from django.urls import path
from . import views

urlpatterns = [
    path( 'customer_service_index/', views.customer_service_index, name='customer_service_index'),
    path('customer_service_notice/', views.customer_service_notice, name='customer_service_notice'),
    path('customer_service_faq/', views.customer_service_faq, name='customer_service_faq'),
    path('customer_service_1vs1/', views.customer_service_1vs1, name='customer_service_1vs1'),
]
