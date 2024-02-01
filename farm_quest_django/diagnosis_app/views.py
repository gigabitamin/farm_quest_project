from django.http import HttpResponse
from django.conf import settings
import os
from urllib.parse import unquote

from django.http import JsonResponse
from django.shortcuts import get_object_or_404, render, redirect
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view   
from rest_framework import mixins, generics
from .models import *
from .serializers import *
from users_app.models import User, UsersAppUser

# yolov8 관련
from django.core.files.storage import FileSystemStorage
from uuid import uuid4
from .modules.yolo_detection import detect
import os

# 추천 상품 관련
from rest_framework.pagination import PageNumberPagination
from rest_framework.views import APIView
from gardening_shop_app.models import ShopingTb
from django.db.models import Q

from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
import json


class DiagnosisItemLoadCartAPIMixins(APIView):
    def get(self, request, *args, **kwargs):
        diagnosis_item_cart_id = request.query_params.get('diagnosis_item_cart_id', None)
        print('diagnosis_item_cart_id = ', diagnosis_item_cart_id)
        
        if diagnosis_item_cart_id:
            try:
                diagnosis_item_cart = DiagnosisItemCart.objects.get(pk=diagnosis_item_cart_id)
                print('diagnosis_item_cart', diagnosis_item_cart)
                diagnosis_item_cart_list = diagnosis_item_cart.diagnosis_item_cart_list
                print('diagnosis_item_cart_list = ', diagnosis_item_cart_list)
                                
                products = ShopingTb.objects.filter(Q(shoping_tb_no__in=diagnosis_item_cart_list))
                print('products = ', products)
                serializer = ShopingTbSerializer(products, many=True)
                print('serializer =', serializer)
                return Response(serializer.data, status=200)
            except DiagnosisItemCart.DoesNotExist:
                return Response({'error': '없는데?'}, status=404)
        else:
            return Response({'error': '진짜없는데??'}, status=400)



class DiagnosisItemSaveCartAPIMixins(generics.CreateAPIView):
    queryset = DiagnosisItemCart.objects.all()
    serializer_class = DiagnosisItemCartSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    def post(self, request, *args, **kwargs):
        print('Received POST data:', request.data)
        if request.auth:
            user_id = request.user.id
            user_instance = get_object_or_404(UsersAppUser, id=user_id)            
            diagnosis_item_cart_list_str = request.data.get('diagnosis_item_cart_list', '[]')
            diagnosis_item_cart_list = json.loads(diagnosis_item_cart_list_str)

            request.data['user'] = user_instance.id
            print('user_instance.id = ', user_instance.id)            
            
            request.data['diagnosis_item_cart_list'] = diagnosis_item_cart_list
            print('request.data = ', request.data)
                        
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
            
        raise PermissionError('토큰가져와')


class DiagnosisRecommendList(APIView):
    def get(self, request, solution_word, format=None):        
        try:
            print('solution word ', solution_word)            
            page = int(request.GET.get('page', 1))
            page_size = 10
            print('page', page)

            start_index = (page - 1) * page_size
            print('start_index', start_index)
            end_index = start_index + page_size
            print('end_index', end_index)

            recommendations = ShopingTb.objects.filter(Q(shoping_tb_rss_channel_item_title__contains=solution_word))[start_index:end_index]
            serializer = ShopingTbSerializer(recommendations, many=True)            
            return Response(serializer.data, status=200)
        except Exception as e:
            return Response({"에러": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class SolutionTbAPIMixins(
    mixins.ListModelMixin, mixins.CreateModelMixin, generics.GenericAPIView
):
    queryset = SolutionTb.objects.all()    
    serializer_class = SolutionTbSerializer
    
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


@api_view(['POST'])   
def diagnosis_upload(request):
    if request.method == "POST":
        origin_file = request.FILES.get('imgFile')       
        fs = FileSystemStorage() # ../media

        plant_name = request.POST.get('plant_name')
        print(plant_name)
        plant_no = request.POST.get('plant_no')

        uuid = uuid4().hex
        save_file_name = uuid + '_' +  origin_file.name
        save_file_path = os.path.join('diagnosis', 'yolo', 'origin_img', save_file_name)
        print('save_file_path : ', save_file_path)
                
        fs.save(save_file_path, origin_file)
    
        detect_result = detect(save_file_path, plant_name,plant_no)

        context = {
            'detect_result': detect_result,
            'save_file_name': save_file_name,
            'plant_name': plant_name,
            'plant_no' : plant_no,
        }
                
        print('완료, 전송')
        
    return JsonResponse(context, status=200)


class DiagnosisResultAPIMixins(
    mixins.ListModelMixin, mixins.CreateModelMixin, generics.GenericAPIView
):    
    queryset = DiagnosisResult.objects.all()
    serializer_class = DiagnosisResultSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        diagnosis_result_id = serializer.instance.diagnosis_result_id
        user_select_plant = PlantTbSerializer(serializer.instance.user_select_plant).data
        print(user_select_plant)
        
        response_data = {
            'diagnosis_result_id': diagnosis_result_id, 
            'user_select_plant': user_select_plant,
        }
        print('DiagnosisResultAPIMixins 완료')
        return Response(response_data, status=status.HTTP_201_CREATED, headers=headers)


class DiagnosisQuestionsAPIMixins(
    mixins.ListModelMixin, mixins.CreateModelMixin, generics.GenericAPIView
):
    queryset = DiagnosisQuestion.objects.all()    
    serializer_class = DiagnosisQuestionSerializer
    
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)
    
class DiagnosisQuestionHistoryAPIMixins(
    mixins.ListModelMixin, mixins.CreateModelMixin, generics.GenericAPIView
):
    queryset = DiagnosisQuestionHistory.objects.all()
    serializer_class = DiagnosisQuestionHistorySerializer
    
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)    
    
class PlantAPIMixins(
    mixins.ListModelMixin, mixins.CreateModelMixin, generics.GenericAPIView
):    
    queryset = PlantTb.objects.all()
    serializer_class = PlantSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    
def diagnosis_index(request):
    diagnosisQuestions = DiagnosisQuestion.objects.all()    
    plantSpecies = PlantTb.objects.all()
    solutionContent = SolutionTb.objects.all()    
    
    diagnosisContext = {
        'diagnosisQuestions':diagnosisQuestions,
        'plantSpecies':plantSpecies,
        'solutionContent' : solutionContent,
    }
    
    return render(request, 'diagnosis_app/diagnosis_index.html', diagnosisContext)

def diagnosis_result(request):
    diagnosisQuestions = DiagnosisQuestion.objects.all()
    plantSpecies = PlantTb.objects.all()

    diagnosisContext = {
        'diagnosis_questions':diagnosisQuestions,
        'plant_species':plantSpecies,        
    }
    
    return render(request, 'diagnosis_app/diagnosis_result.html', diagnosisContext)

def diagnosis_choice(request):    
    return render(request, 'diagnosis_app/diagnosis_choice.html')
    
def diagnosis_image(request):    
    return render(request, 'diagnosis_app/diagnosis_image.html')

def diagnosis_answer(request):    
    return render(request, 'diagnosis_app/diagnosis_answer.html')


# 크롭 이미지 한글 파싱 문제 -> 해결되서 굳이 유지할 필요 없음, 필요시 삭제
def view_crop_image(request, file_name, label_name, image_name):    
    print('왔냐1', file_name)
    decoded_file_name = unquote(file_name)
    decoded_label_name = unquote(label_name)
    decoded_image_name = unquote(image_name)
    
    
    print('왔냐2', decoded_file_name)
    image_path = os.path.join(settings.MEDIA_ROOT, 'diagnosis/yolo/origin_img/result_img', decoded_file_name, 'crops', decoded_label_name, decoded_image_name)
    print('왔냐3', image_path)
    
    try:
        with open(image_path, 'rb') as image_file:
            return HttpResponse(image_file.read(), content_type='image/jpeg')
    except FileNotFoundError:
        return HttpResponse(status=404)