
from django.shortcuts import get_object_or_404, render, redirect
from .models import *

from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied
from rest_framework.response import Response
from rest_framework.decorators import APIView
from rest_framework import status, mixins, generics
from . import models, serializers, pagination
from hitcount.views import HitCountDetailView


class CsFaqList(generics.ListAPIView):
    serializer_class = serializers.CsFaqListShowSerializer
    pagination_class = pagination.CsPagination

    def get_queryset(self):
        queryset = models.CsFaqTb.objects.all()
        if self.kwargs['ctg'] == 'service':
            ctg = 1
        elif self.kwargs['ctg'] == 'community':
            ctg = 2
        elif self.kwargs['ctg'] == 'shop':
            ctg = 3
        else:
            return queryset.order_by('-cs_faq_no')
        return queryset.filter(thread_type=ctg).order_by('-cs_faq_no')




class CsNoticeList(generics.ListAPIView):
    serializer_class = serializers.CsNoticeListShowSerializer
    pagination_class = pagination.CsPagination

    def get_queryset(self):
        queryset = models.CsNoticeTb.objects.all()
        if self.kwargs['ctg'] == 'service':
            ctg = 1
        elif self.kwargs['ctg'] == 'community':
            ctg = 2
        elif self.kwargs['ctg'] == 'shop':
            ctg = 3
        else:
            return queryset.order_by('-cs_notice_no')
        return queryset.filter(thread_type=ctg).order_by('-cs_notice_no')
    
class CsCreate(generics.CreateAPIView):
    queryset = models.CsNoticeTb.objects.all()
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = serializers.CsNoticeModifySerializer
    
    def post(self, request, *args, **kwargs):       
        if request.auth:
            user_id = request.user.id
            request.data['user'] = user_id
            return self.create(request, *args, **kwargs)
        raise PermissionError('토큰줘')    
    
    
class CsDetailShow(generics.RetrieveAPIView):
    queryset = models.CsNoticeTb.objects.all()
    serializer_class = serializers.CsNoticeDetailShowSerializer
    lookup_field = 'cs_notice_no'


class CsDetailModify(generics.UpdateAPIView, generics.DestroyAPIView):
    queryset = models.CsNoticeTb.objects.all()
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = serializers.CsNoticeModifySerializer
    lookup_field = 'cs_notice_no'

    def put(self, request, *args, **kwargs):
        self.is_right_user(request)
        return self.update(request, *args, **kwargs)

    # def patch(self, request, *args, **kwargs):
    #     return self.partial_update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        self.is_right_user(request)
        return self.destroy(request, *args, **kwargs)
    
    def is_right_user(self, request):
        thread_no = self.kwargs['thread_no']
        thread = self.queryset.get(thread_no=thread_no)
        if request.user.id != thread.user_id:
            raise PermissionDenied("토큰 줘")
    

def customer_service_index(request):    
    customer_service_content = CsNoticeTb.objects.all()
    customer_service_comment = CsCmtTb.objects.all()
    
    customer_service_context = {
        'customer_service_content':customer_service_content,
        'customer_service_comment':customer_service_comment,       
    }
    
    return render(request, 'customer_service_app/customer_service_index.html', customer_service_context)

def customer_service_notice(request):
    return render(request, 'customer_service_app/customer_service_notice.html')
    
def customer_service_faq(request):    
    return render(request, 'customer_service_app/customer_service_faq.html')

def customer_service_1vs1(request):    
    return render(request, 'customer_service_app/customer_service_1vs1.html')
