
from django.shortcuts import get_object_or_404, render, redirect
from .models import CsTb, CsCmtTb
# from users_app.models import *

def customer_service_index(request):    
    customer_service_content = CsTb.objects.all()
    customer_service_comment = CsCmtTb.objects.all()
    
    customer_service_context = {
        'customer_service_content':customer_service_content,
        'customer_service_comment':customer_service_comment,       
    }
    
    return render(request, 'customer_service_app/customer_service_index.html', customer_service_context)

def customer_service_notice(request):
    return render(request, 'customer_service_app/customer_service_notice.html')
    
def customer_service_faq(request):    
    return render(request, 'customer_service_app/customer_service_faq.html')

def customer_service_1vs1(request):    
    return render(request, 'customer_service_app/customer_service_1v1.html')
