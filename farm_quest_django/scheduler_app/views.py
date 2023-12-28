from django.shortcuts import render
# Create your views here.

#scheduler
def scheduler_general(request):    
    return render(request, 'scheduler_app/scheduler_general.html')
def scheduler_personal(request):    
    return render(request, 'scheduler_app/scheduler_personal.html')