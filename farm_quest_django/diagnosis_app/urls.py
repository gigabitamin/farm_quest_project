from django.urls import path
from . import views
from .views import DiagnosisRecommendList, DiagnosisResultAPIMixins, DiagnosisQuestionsAPIMixins, DiagnosisQuestionHistoryAPIMixins, PlantAPIMixins, SolutionTbAPIMixins

urlpatterns = [
    path( 'diagnosis_index/', views.diagnosis_index, name='diagnosis_index'),
    path( 'diagnosis_result/', views.diagnosis_result, name='diagnosis_result'),
    path('choice/', views.diagnosis_choice, name='diagnosis_choice'),
    path('answer/', views.diagnosis_answer, name='diagnosis_answer'),
    path('image/', views.diagnosis_image, name='diagnosis_image'),
    path("diagnosis_questions_api/", DiagnosisQuestionsAPIMixins.as_view()),
    path("diagnosis_questions_history_api/", DiagnosisQuestionHistoryAPIMixins.as_view()),
    path("plant_api/", PlantAPIMixins.as_view()),
    path("solution_api/", SolutionTbAPIMixins.as_view()),
    path("upload/", views.file_upload_one, name='file_upload_one'),
    path("save_diagnosis_result_api/", DiagnosisResultAPIMixins.as_view()),
    path("diagnosis_recommend/<str:solution_word>/", DiagnosisRecommendList.as_view(), name="diagnosis_recommend"),
]
