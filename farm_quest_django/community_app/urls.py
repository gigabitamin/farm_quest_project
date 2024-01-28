from django.urls import path
from . import views

urlpatterns = [
    # path('community_index/', views.community_index, name='community_index'),
    # path('farm_log_index/', views.farm_log_index, name='farm_log_index'),
    # path('qna_index/', views.qna_index, name='qna_index'),
    path('community/main/<str:ctg>', views.CommunityList.as_view()),
    path('community/create/', views.CommunityCreate.as_view()),
    path('community/detail/show/<int:thread_no>', views.CommunityDetailShow.as_view()),
    path('community/detail/modify/<int:thread_no>', views.CommunityDetailModify.as_view()),
    path('community/detail/comment/add/', views.CommunityCommentAdd.as_view()),
    path('community/detail/comment/delete/<int:cmt_no>', views.CommunityCommentDelete.as_view()),
]
