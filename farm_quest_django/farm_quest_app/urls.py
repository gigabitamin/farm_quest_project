from django.urls import path
from . import views

urlpatterns = [
    path( '', views.index, name='index'),
    path('customer_service_center/', views.customer_service_center, name='customer_service_center'),
    path('scheduler_general/', views.scheduler_general, name='scheduler_general'),
    path('scheduler_personal/', views.scheduler_personal, name='scheduler_personal'),

]
