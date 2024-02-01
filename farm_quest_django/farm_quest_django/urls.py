
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),     
    path('', include("users_app.urls")), 
    path('', include("farm_quest_app.urls")),
    path('', include("schedular_app.urls")),    
    path('', include("diagnosis_app.urls")),
    path('', include("gardening_shop_app.urls")),
    path('', include("customer_service_app.urls")),
    path('', include("community_app.urls")),
    path('', include("guide_app.urls")),
    # path('', include("webcam_app.urls")),
            
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


# 카메라 스크린샷 html 화면에 표시
# if settings.DEBUG:
#     urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


