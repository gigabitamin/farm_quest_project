
from django.shortcuts import get_object_or_404, render, redirect
from .models import CommunityCmtTb, CommunityTb

def community_index(request):    
    community_content = CommunityTb.objects.all()
    community_comment = CommunityCmtTb.objects.all()
    
    community_context = {
        'community_content':community_content,
        'community_comment':community_comment,       
    }
    
    return render(request, 'community_app/community_index.html', community_context)

def farm_log_index(request):
    return render(request, 'community_app/farm_log_index.html')
    
def qna_index(request):    
    return render(request, 'community_app/qna_index.html')
