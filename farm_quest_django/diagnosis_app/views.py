from django.http import JsonResponse
from django.shortcuts import get_object_or_404, render, redirect
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view   
from rest_framework import mixins, generics
from .models import DiagnosisResult, DiagnosisQuestion, DiagnosisQuestionHistory, PlantTb, SolutionTb
from .serializers import ShopingTbSerializer, PlantTbSerializer, DiagnosisResultSerializer, DiagnosisQuestionSerializer, DiagnosisQuestionHistorySerializer, PlantSerializer, SolutionTbSerializer

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
from rest_framework.pagination import PageNumberPagination



# class DiagnosisRecommendList(APIView):
#     pagination_class = PageNumberPagination
#     page_size = 10  # 한 페이지당 보여줄 아이템 수

#     def get(self, request, solution_word, format=None):
#         try:
#             recommendations = ShopingTb.objects.filter(Q(shoping_tb_rss_channel_item_title__contains=solution_word))
            
#             # 페이지네이션 적용
#             page = self.paginate_queryset(recommendations)
            
#             if page is not None:
#                 serializer = ShopingTbSerializer(page, many=True)
#                 return self.get_paginated_response(serializer.data)

#             serializer = ShopingTbSerializer(recommendations, many=True)
#             return Response(serializer.data)
#         except Exception as e:
#             return Response({"에러": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        
class DiagnosisRecommendList(APIView):
    def get(self, request, solution_word, format=None):
        # solution_word = solution_word
        solution_word = '화분'
        try:
            print('solution_word = ', solution_word)
            recommendations = ShopingTb.objects.filter(Q(shoping_tb_rss_channel_item_title__contains=solution_word))
            print('recommendations = ', recommendations)
            serializer = ShopingTbSerializer(recommendations, many=True)
            print('serializer = ', serializer)
            return Response(serializer.data)
        except Exception as e:
            return Response({"에러": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# class DiagnosisRecommendList(APIView):
#     pagination_class = StandardResultsSetPagination

#     def get(self, request, recommend_keyword, format=None):        
#         products = ShopingTb.objects.filter(Q(disease_code__contains=recommend_keyword))
#         category = request.query_params.get('category')
#         if category and category != 'all':
#             products = products.filter(category=category)

#         paginator = StandardResultsSetPagination()
#         result_page = paginator.paginate_queryset(products, request)
#         serializer = ShopingTbSerializer(result_page, many=True)
#         return paginator.get_paginated_response(serializer.data)


class SolutionTbAPIMixins(
    mixins.ListModelMixin, mixins.CreateModelMixin, generics.GenericAPIView
):
    queryset = SolutionTb.objects.all()    
    serializer_class = SolutionTbSerializer
    
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)





# @api_view(['POST'])   
# def select_plant(request):
#     if request.method == "POST":                     
#         context = {
#             'select_plant_name': select_plant_name, 
#             'diagnosis_result_id': diagnosis_result_id,
#         }                

#     return JsonResponse(context, status=200)




@api_view(['POST'])   
def file_upload_one(request):
    if request.method == "POST":
        origin_file = request.FILES.get('imgFile')       
        fs = FileSystemStorage() # ../upload
            
        # diagnosis_result_id = request.POST.get('diagnosis_result_id')
        # print('diagnosis_result_id', diagnosis_result_id)
        plant_name = request.POST.get('plant_name')
        print(plant_name)
        plant_no = request.POST.get('plant_no')

        
        uuid = uuid4().hex
        save_file_name = uuid + '_' +  origin_file.name
        save_file_path = os.path.join('diagnosis', 'yolo', 'origin_img', save_file_name)
        print('save_file_path : ', save_file_path)
        
        # save_file_name, origin_file # upload 폴더(fs)에 저장
        fs.save(save_file_path, origin_file)
        
        # 디버깅용
        # print('origin_file.name : ', origin_file.name)
        # print('save_file_name : ', save_file_name)
        # print('diagnosis_result_id', diagnosis_result_id)
        # YOLO 객체 탐지 함수 호출, 서버 upload 폴더에 업로드 된 파일명만 전달하도록 수정
        
                
        detect_result = detect(save_file_path, plant_name,plant_no)
        # print('detect_result = ', detect_result)
        # print('results : ', results)
        # print('직렬화')
        # serialized_results = serialize_results(results)
        # print('serialized_results : ', serialized_results[0])
        # print('diagnosis_result_id', diagnosis_result_id)
        # print('tf_pred_prob', tf_pred_prob[0])
        # print('tf_pred_prob', str(tf_pred_prob[0]))
        # solution_row_list_serialized = []
        # print('solution_row_list_serialized3 = ', solution_row_list_serialized)
                                                                    
        context = {
            'detect_result': detect_result,
            'save_file_name': save_file_name,
            # 'serialized_results': serialized_results[0] if serialized_results else None,
            # 'diagnosis_result_id': diagnosis_result_id,
            'plant_name': plant_name,
            'plant_no' : plant_no,
            # 'tf_predict_desease_list_sorted' : tf_predict_desease_list_sorted,            
            # 'crops_path_list': crops_path_list,
            # 'solution_row_list_serialized' : solution_row_list_serialized,
        }
        
        
        
        # print('plant_name : ', plant_name)
        # print('crops_path_list', crops_path_list)
        print('완료, 전송')
        # print('save_file_name : ', save_file_name)
        # print('tf_pred_prob', tf_pred_prob)        
        # print('user_select_plant_name: ', plant_name)
        # print('user_select_plant_no: ', plant_no)

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

        # 생성된 객체의 ID를 응답에 포함
        response_data = {
            'diagnosis_result_id': diagnosis_result_id, 
            'user_select_plant': user_select_plant,
        }
        print('DiagnosisResultAPIMixins 완료')
        return Response(response_data, status=status.HTTP_201_CREATED, headers=headers)


# class DiagnosisResultAPIMixins(
#     mixins.ListModelMixin, mixins.CreateModelMixin, generics.GenericAPIView
# ):    
#     queryset = DiagnosisResult.objects.all()
#     serializer_class = DiagnosisResultSerializer

#     def get(self, request, *args, **kwargs):
#         return self.list(request, *args, **kwargs)

#     def post(self, request, *args, **kwargs):
#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         self.perform_create(serializer)
#         headers = self.get_success_headers(serializer.data)
#         diagnosis_result_id = serializer.instance.diagnosis_result_id
#         user_select_plant = PlantTbSerializer(serializer.instance.user_select_plant).data
#         # print(user_select_plant)

#         # 생성된 객체의 ID를 응답에 포함
#         response_data = {
#             'diagnosis_result_id': diagnosis_result_id, 
#             'user_select_plant': user_select_plant,
#         }
#         print('DiagnosisResultAPIMixins 완료')
#         return Response(response_data, status=status.HTTP_201_CREATED, headers=headers)
    

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
