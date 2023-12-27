from django.urls import path
from . import views

urlpatterns = [
    path( 'diagnosis_index/', views.diagnosis_index, name='diagnosis_index'),
    path('choice/', views.diagnosis_choice, name='diagnosis_choice'),
    path('answer/', views.diagnosis_answer, name='diagnosis_answer'),
    path('image/', views.diagnosis_image, name='diagnosis_image'),
]
