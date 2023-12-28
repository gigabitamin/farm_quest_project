from django.urls import path
from . import views
from .views import RegisterView, LoginView, ProfileView



urlpatterns = [
    # 로그인
    path('sign_in/', views.sign_in, name='sign_in'),    
    path('sign_out/', views.sign_out, name='sign_out'),    
    path('sign_up/', views.sign_up, name='sign_up'),
    path('sign_up2/', views.sign_up2, name='sign_up2'),
    
    # DRF
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path('profile/', ProfileView.as_view()),
        
    # 리액트 연동
    path('sign_in2/', views.sign_in2, name='sign_in2'),        
            
    # 회원정보변동
    path('my_page/', views.my_page, name='my_page'),
    path('my_page/update/<int:id>/', views.my_page_update, name='my_page_update'),
    path('my_page/delete/move<int:id>/', views.my_page_delete_move, name='my_page_delete_move'),
    path('my_page/delete/', views.my_page_delete, name='my_page_delete'),
    path('my_page/delete/view/', views.MyPageDeleteView.as_view(), name='my_page_delete_view'),

    # 마이페이지
    path('mypage/', views.mypage, name='mypage'),
    path('./', views.user_plant_render, name='user_plant'),
    path('mypage/', views.user_farmlog_render, name='user_farmlog'),
    path('mypage/', views.user_QnA_render, name='user_QnA'),
    path('mypage/', views.user_bookmark_render, name='user_bookmark'),
]