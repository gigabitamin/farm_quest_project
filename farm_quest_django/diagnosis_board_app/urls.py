from django.urls import path
from . import views
# from .views import *

urlpatterns = [
    
    path('diagnosis_board/create/', views.DiagnosisBoardCreate.as_view()),    
    path('diagnosis_board/main', views.DiagnosisBoardList.as_view()),    
    path('diagnosis_board/detail/show/<int:thread_no>', views.DiagnosisBoardDetailShow.as_view()),
    path('diagnosis_board/detail/modify/<int:thread_no>', views.DiagnosisBoardDetailModify.as_view()),
    path('diagnosis_board/detail/comment/add/', views.DiagnosisBoardCommentAdd.as_view()),
    path('diagnosis_board/detail/comment/delete/<int:cmt_no>', views.DiagnosisBoardCommentDelete.as_view()),
       
]
