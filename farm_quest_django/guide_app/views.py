
from django.shortcuts import get_object_or_404, render, redirect
from .models import GuideTb
from django.db.models import Q

def guide_index(request):    
    guide_content = GuideTb.objects.all()
    guide_filter = GuideTb.objects.filter(Q(farm_guide__contains='키워드'))
    
    guide_context = {
        'guide_content':guide_content,
        'guide_comment':guide_filter,
    }
    
    return render(request, 'guide_app/guide_index.html', guide_context)

def guide_detail(request):
    guide_detail_content = GuideTb.objects.all()
    guide_detail_filter = GuideTb.objects.filter(Q(farm_guide__contains='키워드'))
    
    guide_detail_context = {
        'guide_content':guide_detail_content,
        'guide_comment':guide_detail_filter,
    }
    return render(request, 'guide_app/guide_detail.html', guide_detail_context)
