from django.shortcuts import get_object_or_404, render, redirect
from rest_framework.response import Response
from rest_framework.decorators import api_view   
from rest_framework import mixins, generics
from .models import DiagnosisQuestion, DiagnosisQuestionHistory, PlantTb, SolutionTb
from .serializers import DiagnosisQuestionSerializer, DiagnosisQuestionHistorySerializer, PlantSerializer, SolutionSerializer

# yolov8 관련
from django.core.files.storage import FileSystemStorage
from uuid import uuid4
from .modules.yolo_detection import detect


@api_view(['POST'])   
def file_upload_one(request):
    if request.method == "POST":
        origin_file = request.FILES.get('imgFile')       
        fs = FileSystemStorage() # ../upload

        # 파일명 중복되지 않도록 uuid 사용해서 파일명 변경
        uuid = uuid4().hex
        save_file_name = uuid + '_' +  origin_file.name
        
        # save_file_name, origin_file # upload 폴더(fs)에 저장
        fs.save(save_file_name, origin_file)
        
        # 디버깅용
        print('origin_file.name : ', origin_file.name)
        print('save_file_name : ', save_file_name)

        # YOLO 객체 탐지 함수 호출, 서버 upload 폴더에 업로드 된 파일명만 전달하도록 수정
        detect(save_file_name) 

    return Response(save_file_name)


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
