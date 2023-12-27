from django.urls import path
from . import views
from .views import RegisterView, LoginView, ProfileView



urlpatterns = [
    # 로그인
    path('sign_in', views.sign_in, name='sign_in'),    
    path('sign_out', views.sign_out, name='sign_out'),    
    path('sign_up', views.sign_up, name='sign_up'),
    path('sign_up2', views.sign_up2, name='sign_up2'),
    
    # DRF
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path('profile/', ProfileView.as_view()),
        
    # 리액트 연동
    path('sign_in2', views.sign_in2, name='sign_in2'),        
            
    # 회원정보변동
    path('my_page/', views.my_page, name='my_page'),
    path('my_page/update/<int:id>', views.my_page_update, name='my_page_update'),
    path('my_page/delete/move<int:id>', views.my_page_delete_move, name='my_page_delete_move'),
    path('my_page/delete/', views.my_page_delete, name='my_page_delete'),
    path('my_page/delete/view/', views.MyPageDeleteView.as_view(), name='my_page_delete_view'),

    # 마이페이지
    path('user/mypage', views.user_mypage, name='user_mypage'),
    path('user/mypage/1', views.user_plant, name='user_plant'),
    # path('user/mypage/2', views.user_review_list, name='user_review_list'),
    # path('user/mypage/3', views.user_favorite_list, name='user_favorite_list'),
    # path('user/mypage/4', views.user_inquiry_list, name='user_inquiry_list'),
    path('user/mypage/5', views.sign_up2, name='sign_up2'),

    # path('user/mypage/1/delete/<str:book_no>/', views.user_booked_delete, name='user_booked_delete'),
    # path('user/mypage/3/delete/<str:fav_id>/', views.user_favorite_delete, name='user_favorite_delete'),
    # path('user/mypage/2/update/<str:review_no>/', views.user_review_update, name='user_review_update'),
    # path('user/mypage/2/delete/<str:review_no>/', views.user_review_delete, name='user_review_delete'),
    # path('user/mypage/delete/<str:camp_no>/', views.camp_register_delete, name='camp_register_delete'),

    # path('user/inquire', views.user_inquire, name='user_inquire'),
    # path('users/user/inquire/rep/<int:inq_no>/', views.user_inquiry_rep, name='user_inquiry_rep'),
]