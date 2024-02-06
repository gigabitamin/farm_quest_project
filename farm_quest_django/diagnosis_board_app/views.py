from django.shortcuts import get_object_or_404, render
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied
from rest_framework.response import Response
from rest_framework.decorators import APIView
from rest_framework import status, mixins, generics
from . import serializers, models, pagination
from diagnosis_app.models import DiagnosisResultAll


class DiagnosisBoardList(generics.ListAPIView):
    serializer_class = serializers.DiagnosisResultAllSerializer
    pagination_class = pagination.DiagnosisBoardPagination
    def get_queryset(self):
        queryset = DiagnosisResultAll.objects.all().filter().order_by('-diagnosis_result_all_id')
        return queryset
  

class DiagnosisBoardCreate(generics.CreateAPIView):
    queryset = models.DiagnosisBoardTb.objects.all()

    authentication_classes = [TokenAuthentication]

    permission_classes = [IsAuthenticated]

    serializer_class = serializers.DiagnosisBoardModifySerializer

    
    def post(self, request, *args, **kwargs):       
        
        if request.auth:
            user_id = request.user.id
            request.data['user'] = user_id
            return self.create(request, *args, **kwargs)
        raise PermissionError('You have no token information.')


class DiagnosisBoardDetailShow(generics.RetrieveAPIView):
    queryset = models.DiagnosisBoardTb.objects.all()
    serializer_class = serializers.DiagnosisBoardDetailShowSerializer
    lookup_field = 'thread_no'


class DiagnosisBoardDetailModify(generics.UpdateAPIView, generics.DestroyAPIView):
    queryset = models.DiagnosisBoardTb.objects.all()
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = serializers.DiagnosisBoardModifySerializer
    lookup_field = 'thread_no'

    def put(self, request, *args, **kwargs):
        self.is_right_user(request)
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        self.is_right_user(request)
        return self.destroy(request, *args, **kwargs)
    
    def is_right_user(self, request):
        thread_no = self.kwargs['thread_no']
        thread = self.queryset.get(thread_no=thread_no)
        if request.user.id != thread.user_id:
            raise PermissionDenied("You have no permission to control this thread.")

class DiagnosisBoardCommentAdd(generics.CreateAPIView):
    queryset = models.DiagnosisBoardCmtTb.objects.all()
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = serializers.DiagnosisBoardCommentModifySerializer

    def post(self, request, *args, **kwargs):       
        if request.auth:
            user_id = request.user.id
            request.data['user'] = user_id
            return self.create(request, *args, **kwargs)
        raise PermissionError('You have no token information.')
    

class DiagnosisBoardCommentDelete(generics.DestroyAPIView):
    queryset = models.DiagnosisBoardCmtTb.objects.all()
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = serializers.DiagnosisBoardCommentModifySerializer
    lookup_field = 'cmt_no'

    def delete(self, request, *args, **kwargs):
        cmt_no = self.kwargs['cmt_no']
        comment = self.queryset.get(cmt_no=cmt_no)
        if request.user.id != comment.user_id:
            raise PermissionDenied("You have no permission to control this comment.")
        return self.destroy(request, *args, **kwargs)
    