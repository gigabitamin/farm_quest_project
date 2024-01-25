from django.shortcuts import render
from django.conf import settings

from django.shortcuts import get_object_or_404, get_list_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
import requests, json


#scheduler
def schedular(request):    
    return render(request, 'scheduler_app/schedular.html')



API_KEY=settings.API_KEY
numOfRows = '4'
pageNo = '4'
dataType = 'json'
base_date = '20240119'  # 발표 일자
base_time = '0800'  # 발표 시간
nx = '38'  # 예보 지점 x좌표
ny = '123'  # 예보 지점 y좌표

# @api_view(['GET'])
# def weather(request):
#     url = f"http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey={API_KEY}&numOfRows={numOfRows}&pageNo={pageNo}&dataType={dataType}&base_date={base_date}&base_time={base_time}&nx={nx}&ny={ny}"
#     response = requests.get(url)
#     products_data = response.json()['result']['baseList']
    
#     return Response(products_data)