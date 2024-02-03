from django.shortcuts import render
from django.conf import settings

import io
from rest_framework.parsers import JSONParser
from django.shortcuts import get_object_or_404, get_list_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
import requests, json

from datetime import datetime, timedelta
from requests.exceptions import RequestException, HTTPError, JSONDecodeError
from .models import GridData
from django.db.models import Q
from django.http import JsonResponse

from django.views.decorators.http import require_POST

#scheduler
def schedular(request):    
    return render(request, 'scheduler_app/schedular.html')

# 기상청 격자 위경도 변환-사용X
# import math
# NX = 149            ## X축 격자점 수
# NY = 253            ## Y축 격자점 수

# Re = 6371.00877     ##  지도반경
# grid = 5.0          ##  격자간격 (km)
# slat1 = 30.0        ##  표준위도 1
# slat2 = 60.0        ##  표준위도 2
# olon = 126.0        ##  기준점 경도
# olat = 38.0         ##  기준점 위도
# xo = 210 / grid     ##  기준점 X좌표
# yo = 675 / grid     ##  기준점 Y좌표
# first = 0

# if first == 0 :
#     PI = math.asin(1.0) * 2.0
#     DEGRAD = PI/ 180.0
#     RADDEG = 180.0 / PI


#     re = Re / grid
#     slat1 = slat1 * DEGRAD
#     slat2 = slat2 * DEGRAD
#     olon = olon * DEGRAD
#     olat = olat * DEGRAD

#     sn = math.tan(PI * 0.25 + slat2 * 0.5) / math.tan(PI * 0.25 + slat1 * 0.5)
#     sn = math.log(math.cos(slat1) / math.cos(slat2)) / math.log(sn)
#     sf = math.tan(PI * 0.25 + slat1 * 0.5)
#     sf = math.pow(sf, sn) * math.cos(slat1) / sn
#     ro = math.tan(PI * 0.25 + olat * 0.5)
#     ro = re * sf / math.pow(ro, sn)
#     first = 1

# def mapToGrid(lat, lon, code = 0 ):
#     ra = math.tan(PI * 0.25 + lat * DEGRAD * 0.5)
#     ra = re * sf / pow(ra, sn)
#     theta = lon * DEGRAD - olon
#     if theta > PI :
#         theta -= 2.0 * PI
#     if theta < -PI :
#         theta += 2.0 * PI
#     theta *= sn
#     x = (ra * math.sin(theta)) + xo
#     y = (ro - ra * math.cos(theta)) + yo
#     x = int(x + 1.5)
#     y = int(y + 1.5)
#     return x, y

# def gridToMap(x, y, code = 1):
#     x = x - 1
#     y = y - 1
#     xn = x - xo
#     yn = ro - y + yo
#     ra = math.sqrt(xn * xn + yn * yn)
#     if sn < 0.0 :
#         ra = -ra
#     alat = math.pow((re * sf / ra), (1.0 / sn))
#     alat = 2.0 * math.atan(alat) - PI * 0.5
#     if math.fabs(xn) <= 0.0 :
#         theta = 0.0
#     else :
#         if math.fabs(yn) <= 0.0 :
#             theta = PI * 0.5
#             if xn < 0.0 :
#                 theta = -theta
#         else :
#             theta = math.atan2(xn, yn)
#     alon = theta / sn + olon
#     lat = alat * RADDEG
#     lon = alon * RADDEG

#     return lat, lon

# 날씨

@api_view(['GET'])
def weather(request):
    if request.method == 'GET':
        location_1 = request.GET.get('location_1', '')
        location_2 = request.GET.get('location_2', '')
        location_3 = request.GET.get('location_3', '')
        nx, ny = get_nx_ny_from_location(location_1, location_2, location_3)

    url = "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst"
    base_date = datetime.now().strftime("%Y%m%d")
    # base_time = datetime.now().strftime("%H00")
    params={
        'serviceKey':settings.API_KEY,
        'numOfRows' :'12',
        'pageNo' : '1',
        'dataType' : 'json',
    
        'base_date' : base_date,
        'base_time' : '0500',
        'nx' : nx,
        'ny' : ny
    }

    response = requests.get(url, params=params, verify=False)
    response.raise_for_status()
    res = json.loads(response.text)
    return Response({'message': 'Weather data fetched successfully', 'data': res})

# 위치 고정값 넣을시 반환되는것 확인, 프론트 페이지 작업 => 전송 확인 필요

def get_nx_ny_from_location(location_1, location_2, location_3):
    try:
        grid_data = GridData.objects.get(Q(location_1=location_1) & Q(location_2=location_2) & Q(location_3=location_3))
        return str(grid_data.nx), str(grid_data.ny)
    except GridData.DoesNotExist:
        return '0', '0'
    
def get_location_options(request, level, parent_location=None):
    print(request.POST)
    query_field = f'location_{level}'

    if level == 1:
        locations = GridData.objects.values(query_field).distinct()
    else:
        if parent_location:
            locations = GridData.objects.filter(**{f'location_{level-1}': parent_location}).values(query_field).distinct()
        else:
            locations = GridData.objects.values(query_field).distinct()
            
    options = [{'id': location[query_field], 'name': location[query_field]} for location in locations]

    return JsonResponse({'options': options})

# @require_POST
@api_view(['POST'])
def submit_selected_locations(request):
    try:
        # 요청에서 JSON 데이터 가져오기
        # data = json.loads(request.body)
        print('request : ', request)
        print('method : ', request.method)
        print('body : ', request.body)

        stream = io.BytesIO(request.body)
        data = JSONParser().parse(stream)
        print(data)
        
        # 여기에서 data의 내용에 따라 선택된 위치 정보 처리
        # location1 = data.get('location1')
        # location2 = data.get('location2')
        # location3 = data.get('location3')
        
        # 처리 로직 추가
        
        return JsonResponse({"message": "Selected locations submitted successfully!"})
    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON format in the request"}, status=400)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)