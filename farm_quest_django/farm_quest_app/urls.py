from django.urls import path
from . import views

urlpatterns = [
    path( '', views.index, name='index'),
    path('customer_service_center/', views.customer_service_center, name='customer_service_center'),
    path('diagnosis_temp/', views.diagnosis_temp, name='diagnosis_temp'),
    path('cs_1vs1/', views.cs_1vs1, name='cs_1vs1'),
    path('cs_faq/', views.cs_faq, name='cs_faq'),
    path('cs_notice/', views.cs_notice, name='cs_notice'),
]
