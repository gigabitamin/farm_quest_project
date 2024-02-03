from django.http import JsonResponse
from django.shortcuts import get_object_or_404, render, redirect
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view   
from rest_framework import mixins, generics
from .models import DiagnosisResult, DiagnosisQuestion, DiagnosisQuestionHistory, PlantTb, SolutionTb
from .serializers import PlantTbSerializer, DiagnosisResultSerializer, DiagnosisQuestionSerializer, DiagnosisQuestionHistorySerializer, PlantSerializer, SolutionSerializer

# yolov8 관련
from django.core.files.storage import FileSystemStorage
from uuid import uuid4
from .modules.yolo_detection import detect
import os



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
        plant_no = request.POST.get('plant_no')

        
        uuid = uuid4().hex
        save_file_name = uuid + '_' +  origin_file.name
        save_file_path = os.path.join('diagnosis', 'yolo', save_file_name)
        # print('save_file_path : ', save_file_path)
        
        # save_file_name, origin_file # upload 폴더(fs)에 저장
        fs.save(save_file_path, origin_file)
        
        # 디버깅용
        # print('origin_file.name : ', origin_file.name)
        # print('save_file_name : ', save_file_name)
        # print('diagnosis_result_id', diagnosis_result_id)
        # YOLO 객체 탐지 함수 호출, 서버 upload 폴더에 업로드 된 파일명만 전달하도록 수정
        serialized_results, diagnosis_result_id, tf_pred_prob, tf_predict_desease_list, crops_path_list = detect(save_file_path, plant_name,plant_no)
        # print('results : ', results)
        # print('직렬화')
        # serialized_results = serialize_results(results)
        # print('serialized_results : ', serialized_results[0])
        print('diagnosis_result_id', diagnosis_result_id)
        print('tf_pred_prob', tf_pred_prob[0])
        print('tf_pred_prob', str(tf_pred_prob[0]))
        
        tf_pred_prob = str(tf_pred_prob[0]).strip('[]').split()
        tf_pred_prob = [float(number.replace(',', '')) for number in tf_pred_prob]
        tf_pred_prob = sorted(tf_pred_prob, reverse=True)
        
        print('tf_pred_prob', type(tf_pred_prob))
        
        context = {
            'save_file_name': save_file_name,
            'serialized_results': serialized_results[0] if serialized_results else None,
            'diagnosis_result_id': diagnosis_result_id,
            'plant_name': plant_name,
            'plant_no' : plant_no,
            'tf_pred_prob' : tf_pred_prob,
            'tf_predict_desease_list' : tf_predict_desease_list,
            'crops_path_list': crops_path_list,
        }
        
        
        
        # print('plant_name : ', plant_name)
        print('crops_path_list', crops_path_list)
        print('완료, 전송')
        # print('save_file_name : ', save_file_name)
        print('tf_pred_prob', tf_pred_prob)
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
    
class SolutionAPIMixins(
    mixins.ListModelMixin, mixins.CreateModelMixin, generics.GenericAPIView
):    
    queryset = SolutionTb.objects.all()        
    serializer_class = SolutionSerializer

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
