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
    print('1')
    def get_queryset(self):
        print('2')
        queryset = DiagnosisResultAll.objects.all().filter().order_by('-diagnosis_result_all_id')
        # print('diagnosisBoard', queryset)
        # diagnosisResult = DiagnosisResultAll.objects.all()
        # print('diagnosisResult', diagnosisResult)
        
        # queryset = {
        #     'diagnosisBoard':queryset,
        #     'diagnosisResult':diagnosisResult,
        # }        
        
        print('queryset', queryset)
        # if self.kwargs['ctg'] == 'result':
        #     ctg = 0
        # elif self.kwargs['ctg'] == 'share':
        #     ctg = 1
        # else:
        #     print('4')
        #     return queryset.order_by('-thread_no')
        print('5')
        # return queryset.filter(thread_type=ctg).order_by('-thread_no')
        
        return queryset
  

# class DiagnosisBoardList(generics.ListAPIView):
#     serializer_class = serializers.DiagnosisBoardListShowSerializer
#     pagination_class = pagination.DiagnosisBoardPagination
#     print('1')
#     def get_queryset(self):
#         print('2')
#         diagnosisBoard = models.DiagnosisBoardTb.objects.all().filter().order_by('-thread_no')
#         print('diagnosisBoard', diagnosisBoard)
#         diagnosisResult = DiagnosisResultAll.objects.all()
#         print('diagnosisResult', diagnosisResult)
        
#         queryset = {
#             'diagnosisBoard':diagnosisBoard,
#             'diagnosisResult':diagnosisResult,
#         }        
        
#         print('queryset', queryset)
#         # if self.kwargs['ctg'] == 'result':
#         #     ctg = 0
#         # elif self.kwargs['ctg'] == 'share':
#         #     ctg = 1
#         # else:
#         #     print('4')
#         #     return queryset.order_by('-thread_no')
#         print('5')
#         # return queryset.filter(thread_type=ctg).order_by('-thread_no')
        
#         return queryset




class DiagnosisBoardCreate(generics.CreateAPIView):
    print('1')
    queryset = models.DiagnosisBoardTb.objects.all()
    print('2',queryset)
    authentication_classes = [TokenAuthentication]
    print('3')
    permission_classes = [IsAuthenticated]
    print('4')
    serializer_class = serializers.DiagnosisBoardModifySerializer
    print('5', serializer_class)
    
    def post(self, request, *args, **kwargs):       
        
        if request.auth:
            user_id = request.user.id
            print('user_id',user_id)
            print('request.data',request.data)
            request.data['user'] = user_id
            print('request.data',request.data)
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

class DiagnosisBoardCommentAdd(generics.CreateAPIView):
    queryset = models.DiagnosisBoardCmtTb.objects.all()
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = serializers.DiagnosisBoardCommentModifySerializer

    def post(self, request, *args, **kwargs):       
        if request.auth:
            user_id = request.user.id
            request.data['user'] = user_id
            print('post : ', request.data)
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