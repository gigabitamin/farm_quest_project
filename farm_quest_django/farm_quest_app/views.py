
from django.shortcuts import get_object_or_404, render, redirect

def index(request):
    return render(request, 'farm_quest_app/index.html')
    

