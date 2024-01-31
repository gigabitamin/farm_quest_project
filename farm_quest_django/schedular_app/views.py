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


from django.shortcuts import render
from django.http import JsonResponse
from .models import GridData

def get_grid_data(request):
    location1_data = GridData.objects.values_list('location_1', flat=True).distinct()
    location2_data = GridData.objects.values_list('location_2', flat=True).distinct()
    location3_data = GridData.objects.values_list('location_3', flat=True).distinct()

    locations1 = set(location1_data)
    locations2 = set(location2_data)
    locations3 = set(location3_data)

    return JsonResponse({'location1': list(locations1), 'location2': list(locations2), 'location3': list(locations3)})

def get_location2_data(request):
    location1 = request.GET.get('location1', '')

    # location_1이 선택되지 않았을 경우 빈 배열 반환
    if not location1:
        return JsonResponse({'location2': []})

    # location_1에 해당하는 location_2 데이터를 필터링하여 가져옴
    location2_data = GridData.objects.filter(location_1=location1).values_list('location_2', flat=True).distinct()

    return JsonResponse({'location2': list(location2_data)})
    
def get_location3_data(request):
    location2 = request.GET.get('location2', '')
    location1 = request.GET.get('location1', '')

    # location_1이 선택되지 않았을 경우 빈 배열 반환
    if not location2:
        return JsonResponse({'location3': []})

    # location_1에 해당하는 location_2 데이터를 필터링하여 가져옴
    location3_data = GridData.objects.filter(location_1=location1, location_2=location2).values_list('location_3', flat=True).distinct()

    return JsonResponse({'location3': list(location3_data)})



# 위치 호출
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def get_nx_ny_from_locations(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        location_1 = data.get('location1')
        location_2 = data.get('location2')
        location_3 = data.get('location3')

        try:
            grid_data = GridData.objects.get(
                location_1=location_1,
                location_2=location_2,
                location_3=location_3
            )
            nx = grid_data.nx
            ny = grid_data.ny
            return JsonResponse({'nx': nx, 'ny': ny})
        except GridData.DoesNotExist:
            return JsonResponse({'error': '해당 위치에 대한 데이터가 없습니다.'}, status=404)

    return JsonResponse({'error': '잘못된 요청입니다.'}, status=400)


# 스케줄러DB 불러오기
from .models import Scheduler

def get_scheduler_info(request, plant_no):
    scheduler_info = Scheduler.objects.filter(plant_no=plant_no).values()

    # JsonResponse로 반환
    return JsonResponse(list(scheduler_info), safe=False)
    
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

#옵션선택

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


# 옵션변환
# @require_POST
@api_view(['POST'])
def submit_selected_locations(request):
    try:
        stream = io.BytesIO(request.body)
        data = JSONParser().parse(stream)
        print(data)
        nx, ny = get_nx_ny_from_location(data['location_1'], data['location_2'], data['location_3'])

        return JsonResponse({"nx":nx, "ny":ny})
    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON format in the request"}, status=400)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
    
    
# 격자변환
def get_nx_ny_from_location(location_1, location_2, location_3):
    try:
        grid_data = GridData.objects.get(Q(location_1=location_1) & Q(location_2=location_2) & Q(location_3=location_3))
        nx, ny = str(grid_data.nx), str(grid_data.ny)
        print(f'Converted nx: {nx}, ny: {ny}')
        return nx, ny
    except GridData.DoesNotExist:
        return "0","0"

@api_view(['GET'])
def weather(request):
    if request.method == 'GET':
        location_1 = request.GET.get('location_1', '')
        location_2 = request.GET.get('location_2', '')
        location_3 = request.GET.get('location_3', '')
        nx, ny = get_nx_ny_from_location(location_1, location_2, location_3)
        print(f'Converted nx: {nx}, ny: {ny}')

        # 현재 시간 기준으로 API 제공 시간에 따라 base_time 설정
        current_time = datetime.now()
        if current_time.hour == 2 and current_time.minute < 10:
            # 현재 시간이 00:00 ~ 02:10 사이인 경우 0200의 정보를 제공하지 않음
            return JsonResponse({'error': 'Not service time'})
        elif current_time.hour < 5:
            base_time = '0200'
        elif current_time.hour < 8:
            base_time = '0500'
        elif current_time.hour < 11:
            base_time = '0800'
        elif current_time.hour < 14:
            base_time = '1100'
        elif current_time.hour < 17:
            base_time = '1400'
        elif current_time.hour < 20:
            base_time = '1700'
        elif current_time.hour < 23:
            base_time = '2000'
        else:
            # 현재 시간이 23:10 이후인 경우 0200의 정보를 제공하지 않음
            return JsonResponse({'error': 'Not service time'})

        url = "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst"
        base_date = datetime.now().strftime("%Y%m%d")
        # base_time = datetime.now().strftime("%H00")
        params={
            'serviceKey': settings.API_KEY,
            'numOfRows' :'50',
            'pageNo' : '1',
            'dataType' : 'json',
            'base_date' : base_date,
            'base_time' : '0200',
            'nx' : '60',
            'ny' : '123'
        }

        try:
            response = requests.get(url, params=params)
            response.raise_for_status()
            data = response.json()

            if 'response' in data and 'body' in data['response']:
                # 날씨 정보 출력 함수 호출
                template = weather_response(data, location_1, location_2, location_3, base_date)
                return JsonResponse({'data': template}, status=200)
            else:
                return JsonResponse({'error': 'Invalid response from the weather API'}, status=500)
        except RequestException as e:
            return JsonResponse({'error': f'RequestException: {e}'}, status=500)
        except JSONDecodeError as e:
            return JsonResponse({'error': f'JSONDecodeError: {e}'}, status=500)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=400)

def weather_response(res, location_1, location_2, location_3, base_date):
    # 필요한 정보를 딕셔너리 형태로 가공
    informations = dict()
    for items in res['response']['body']['items']['item']:
        cate = items['category']
        fcstTime = items['fcstTime']
        fcstValue = items['fcstValue']
        temp = dict()
        temp[cate] = fcstValue

        if fcstTime not in informations.keys():
            informations[fcstTime] = dict()

        informations[fcstTime][cate] = fcstValue

    # 기상 정보 출력
    pyt_code = {0: '강수 없음', 1: '비', 2: '비/눈', 3: '눈', 5: '빗방울', 6: '진눈깨비', 7: '눈날림'}
    sky_code = {1: '맑음', 2: '맑음', 3: '맑음', 4: '맑음', 5: '맑음', 6: '구름많음', 7: '구름많음', 8: '구름많음', 9: '흐림', 10: '흐림'}

    location_str = " ".join(str(info) for info in [location_1, location_2, location_3] if info)

    def deg_to_dir(deg):
        deg_code = {0: 'N', 360: 'N', 180: 'S', 270: 'W', 90: 'E', 22.5: 'NNE', 45: 'NE', 67.5: 'ENE',
                    112.5: 'ESE', 135: 'SE', 157.5: 'SSE', 202.5: 'SSW', 225: 'SW', 247.5: 'WSW', 292.5: 'WNW',
                    315: 'NW', 337.5: 'NNW'}

        close_dir = ''
        min_abs = 360
        if deg not in deg_code.keys():
            for key in deg_code.keys():
                if abs(key - deg) < min_abs:
                    min_abs = abs(key - deg)
                    close_dir = deg_code[key]
        else:
            close_dir = deg_code[deg]
        return close_dir

    template = ""
    for key, val in zip(informations.keys(), informations.values()):
        template += f"{base_date[:4]}년 {base_date[4:6]}월 {base_date[-2:]}일 {key[:2]}시 {key[2:]}분 {location_str} 지역의 날씨는 "

        if val.get('SKY'):
            template += sky_code[int(val['SKY'])] + " "

        if val.get('PTY'):
            template += pyt_code[int(val['PTY'])]
            if val.get('PCP') and val['PCP'] != '강수없음':
                template += f"시간당 {val['PCP']}mm "

        if val.get('TMP'):
            template += f"평균기온 {float(val['TMP'])}℃ "

        if val.get('REH'):
            template += f"습도 {float(val['REH'])}% "

        if val.get('VEC') and val.get('WSD'):
            vec_temp = deg_to_dir(float(val['VEC']))
            wsd_temp = float(val['WSD'])

            # 풍속 강도 표기
            if wsd_temp < 4:
                wind_strength = '약한 바람'
            elif 4 <= wsd_temp < 9:
                wind_strength = '약간 강한 바람'
            elif 9 <= wsd_temp < 14:
                wind_strength = '강한 바람'
            else:
                wind_strength = '매우 강한 바람'

            template += f"방향 {vec_temp} 풍속 {wsd_temp}m/s ({wind_strength})"

        template += "\n"

    return template