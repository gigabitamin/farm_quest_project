
from django.shortcuts import get_object_or_404, render, redirect
from .models import DiagnosisQuestion, PlantTb

def diagnosis_index(request):
    diagnosis_questions = DiagnosisQuestion.objects.all()
    plant_species = PlantTb.objects.all()
    
    diagnosis_context = {
        'diagnosis_questions':diagnosis_questions,
        'plant_species':plant_species
    }
    
    return render(request, 'diagnosis_app/diagnosis_index.html', diagnosis_context)

def diagnosis_choice(request):    
    return render(request, 'diagnosis_app/diagnosis_choice.html')
    
def diagnosis_image(request):    
    return render(request, 'diagnosis_app/diagnosis_image.html')

def diagnosis_answer(request):    
    return render(request, 'diagnosis_app/diagnosis_answer.html')
