from django.shortcuts import get_object_or_404, render, redirect
from rest_framework.response import Response
from rest_framework.decorators import api_view   
from rest_framework import mixins, generics
from .models import DiagnosisQuestion, DiagnosisQuestionHistory, PlantTb, SolutionTb
from .serializers import DiagnosisQuestionSerializer, DiagnosisQuestionHistorySerializer, PlantSerializer, SolutionSerializer


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
