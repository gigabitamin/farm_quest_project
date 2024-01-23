from django.shortcuts import get_object_or_404, render
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
    serializer_class = serializers.CommunityDetailSerializer


class CommunityDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.CommunityTb.objects.all()
    serializer_class = serializers.CommunityDetailSerializer
    lookup_field = 'thread_no'
