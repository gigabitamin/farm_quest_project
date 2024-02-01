from django.urls import path
from . import views
from .views import DiagnosisItemLoadCartAPIMixins, DiagnosisItemSaveCartAPIMixins, DiagnosisRecommendList, DiagnosisResultAPIMixins, DiagnosisQuestionsAPIMixins, DiagnosisQuestionHistoryAPIMixins, PlantAPIMixins, SolutionTbAPIMixins


urlpatterns = [
    # 장고
    path('diagnosis_index/', views.diagnosis_index, name='diagnosis_index'),
    path('diagnosis_result/', views.diagnosis_result, name='diagnosis_result'),
    path('choice/', views.diagnosis_choice, name='diagnosis_choice'),
    path('answer/', views.diagnosis_answer, name='diagnosis_answer'),
    path('image/', views.diagnosis_image, name='diagnosis_image'),
    
    # 리액트
    path("diagnosis_questions_api/", DiagnosisQuestionsAPIMixins.as_view()),
    path("diagnosis_questions_history_api/", DiagnosisQuestionHistoryAPIMixins.as_view()),
    path("plant_api/", PlantAPIMixins.as_view()),
    path("solution_api/", SolutionTbAPIMixins.as_view()),
    path("diagnosis_upload/", views.diagnosis_upload, name='diagnosis_upload'),
    path("save_diagnosis_result_api/", DiagnosisResultAPIMixins.as_view()),
    path("diagnosis_recommend/<str:solution_word>/", DiagnosisRecommendList.as_view(), name="diagnosis_recommend"),
    path("diagnosis_save_cart/", DiagnosisItemSaveCartAPIMixins.as_view()),
    path("diagnosis_load_cart/", DiagnosisItemLoadCartAPIMixins.as_view()),
    path("diagnosis_load_cart/", DiagnosisItemLoadCartAPIMixins.as_view()),
    path('media/diagnosis/yolo/origin_img/result_img/<str:file_name>/crops/<str:label_name>/<str:image_name>/', views.view_crop_image, name='view_crop_image'),
            
]
