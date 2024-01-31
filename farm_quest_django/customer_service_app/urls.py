from django.urls import path
from . import views

urlpatterns = [
    path('customer_service_index/', views.customer_service_index, name='customer_service_index'),
    path('customer_service_notice/', views.customer_service_notice, name='customer_service_notice'),
    path('customer_service_faq/', views.customer_service_faq, name='customer_service_faq'),
    path('customer_service_1vs1/', views.customer_service_1vs1, name='customer_service_1vs1'),
    
    # 리액트
    path('cs_notice/create/', views.CsCreate.as_view()),
    path('cs_notice/main/<str:ctg>', views.CsNoticeList.as_view()),    
    path('cs_notice/detail/show/<int:thread_no>', views.CsDetailShow.as_view()),
    path('cs_notice/detail/modify/<int:thread_no>', views.CsDetailModify.as_view()),
    
    path('cs_faq/main/<str:ctg>', views.CsFaqList.as_view()),
        
]
