from django.shortcuts import get_object_or_404, render
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied
from rest_framework.response import Response
from rest_framework.decorators import APIView
from rest_framework import status, mixins, generics
from hitcount.views import HitCountMixin
from hitcount.models import HitCount
from . import models, serializers, pagination

# Create your views here.
class CommunityList(generics.ListAPIView):
    serializer_class = serializers.CommunityListShowSerializer
    pagination_class = pagination.CommunityPagination

    def get_queryset(self):
        queryset = models.CommunityTb.objects.all()
        if self.kwargs['ctg'] == 'farmlog':
            ctg = 0
        elif self.kwargs['ctg'] == 'qna':
            ctg = 1
        else:
            return queryset.order_by('-thread_no')
        return queryset.filter(thread_type=ctg).order_by('-thread_no')
  

class CommunityCreate(generics.CreateAPIView):
    queryset = models.CommunityTb.objects.all()
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = serializers.CommunityModifySerializer
    
    def post(self, request, *args, **kwargs):       
        if request.auth:
            user_id = request.user.id
            request.data['user'] = user_id
            return self.create(request, *args, **kwargs)
        raise PermissionError('You have no token information.')


class CommunityDetailShow(generics.RetrieveAPIView):
    queryset = models.CommunityTb.objects.all()
    serializer_class = serializers.CommunityDetailShowSerializer
    lookup_field = 'thread_no'

    def get(self, request, *args, **kwargs):
        hit_count = HitCount.objects.get_for_object(self.get_object())
        hit_count_resp = HitCountMixin.hit_count(request, hit_count)
        return self.retrieve(request, *args, **kwargs)


class CommunityDetailModify(generics.UpdateAPIView, generics.DestroyAPIView):
    queryset = models.CommunityTb.objects.all()
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = serializers.CommunityModifySerializer
    lookup_field = 'thread_no'

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
            raise PermissionDenied("You have no permission to control this thread.")

class CommunityCommentAdd(generics.CreateAPIView):
    queryset = models.CommunityCmtTb.objects.all()
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = serializers.CommunityCommentModifySerializer

    def post(self, request, *args, **kwargs):       
        if request.auth:
            user_id = request.user.id
            request.data['user'] = user_id
            return self.create(request, *args, **kwargs)
        raise PermissionError('You have no token information.')
    

class CommunityCommentDelete(generics.DestroyAPIView):
    queryset = models.CommunityCmtTb.objects.all()
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = serializers.CommunityCommentModifySerializer
    lookup_field = 'cmt_no'

    def delete(self, request, *args, **kwargs):
        cmt_no = self.kwargs['cmt_no']
        comment = self.queryset.get(cmt_no=cmt_no)
        if request.user.id != comment.user_id:
            raise PermissionDenied("You have no permission to control this comment.")
        return self.destroy(request, *args, **kwargs)