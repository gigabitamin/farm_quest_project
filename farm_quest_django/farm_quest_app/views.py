
from django.shortcuts import get_object_or_404, render, redirect

def index(request):
    return render(request, 'farm_quest_app/index.html')
    
def customer_service_center(request):    
    return render(request, 'farm_quest_app/customer_service_center.html')

def diagnosis_temp(request):    
    return render(request, 'farm_quest_app/diagnosis_temp.html')

def cs_1vs1(request):    
    return render(request, 'farm_quest_app/cs_1vs1.html')

def cs_faq(request):    
    return render(request, 'farm_quest_app/cs_faq.html')

def cs_notice(request):    
    return render(request, 'farm_quest_app/cs_notice.html')


