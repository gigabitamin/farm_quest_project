
from django.shortcuts import get_object_or_404, render, redirect

def index(request):
    return render(request, 'farm_quest_app/index.html')
    
def customer_service_center(request):    
    return render(request, 'farm_quest_app/customer_service_center.html')



#scheduler
def scheduler_general(request):    
    return render(request, 'farm_quest_app/scheduler_general.html')
def scheduler_personal(request):    
    return render(request, 'farm_quest_app/scheduler_personal.html')

#mypage

def scheduler_general(request):    
    return render(request, 'farm_quest_app/scheduler_general.html')
def scheduler_personal(request):    
    return render(request, 'farm_quest_app/scheduler_personal.html')