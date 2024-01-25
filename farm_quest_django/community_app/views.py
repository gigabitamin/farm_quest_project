from django.shortcuts import get_object_or_404, render
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied
from rest_framework.response import Response
from rest_framework.decorators import APIView
from rest_framework import status, mixins, generics
from . import models, serializers, pagination

# Create your views here.
class CommunityList(generics.ListAPIView):
    serializer_class = serializers.CommunityListSerializer
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
    

# class CommunitySublist(CommunityList):
#     def get_queryset(self):
#         queryset = super().get_queryset()
#         if self.kwargs['ctg'] == 'farmlog':
#             ctg = 0
#         elif self.kwargs['ctg'] == 'qna':
#             ctg = 1
#         else:
#             return queryset
#         return queryset.filter(thread_type=ctg)
    

class CommunityCreate(generics.CreateAPIView):
    queryset = models.CommunityTb.objects.all()
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = serializers.CommunityDetailSerializer
    
    def post(self, request, *args, **kwargs):       
        if request.auth:
            print('request = ', request)
            print('request.auth = ', request.auth)
            user_id = request.user.id
            request.data['user'] = user_id
            print(request.data)
            return self.create(request, *args, **kwargs)
        raise PermissionError('You have no token information.')


class CommunityDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.CommunityTb.objects.all()
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = serializers.CommunityDetailSerializer
    lookup_field = 'thread_no'

    def get(self, request, *args, **kwargs): 
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        self.is_right_user(request)
        return self.update(request, *args, **kwargs)

    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        self.is_right_user(request)
        return self.destroy(request, *args, **kwargs)
    
    def is_right_user(self, request):
        thread_no = self.kwargs['thread_no']
        thread = self.queryset.get(thread_no=thread_no)
        if request.user.id != thread.user_id:
            raise PermissionDenied("You have no permission to control this thread.")
