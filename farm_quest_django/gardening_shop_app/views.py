
from django.db.models import Avg
from django.shortcuts import get_object_or_404, render, redirect
from django.http import JsonResponse
from .models import ShoppingReview, ShopingTb, UserSearchTerms, ShoppingSearchData, UserSearchTermsBackup
from django.db.models import Q
from rest_framework.pagination import PageNumberPagination
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import ShopingTbSerializer  # 시리얼라이저를 불러옵니다
from django.core.exceptions import ObjectDoesNotExist
import random
from django.views.decorators.csrf import csrf_exempt
import json
import urllib.parse
import subprocess
from django.core.paginator import Paginator
# def gardening_shop_index(request):    
#     return render(request, 'gardening_shop_app/gardening_shop_index.html')

def gardening_shop_index(request):
    # shopping_all = ShopingTb.objects.all()
    shopping_review_all = ShoppingReview.objects.all()                    
    context = {
        'shopping_reviews' : shopping_review_all,        
        # 'shopping_items' : shopping_all,
    }
    return render(request, 'gardening_shop_app/gardening_shop_index.html', context)

def gardening_shop_review_anlystics(request):
    # shopping_all = ShopingTb.objects.all()
    shopping_review_all = ShoppingReview.objects.all()                    
    context = {
        'shopping_reviews' : shopping_review_all,        
        # 'shopping_items' : shopping_all,
    }        
    return render(request, 'gardening_shop_app/gardening_shop_review_anlystics.html', context)

def gardening_shop_search(request, keyword):
    # shopping_keyword = ShopingTb.objects.filter(shoping_tb_rss_channel_item_title__contains=keyword)
    shopping_review_keyword = ShoppingReview.objects.filter(Q(shopping_review_content__contains=keyword))
    
    context = {        
        'shopping_reviews' : shopping_review_keyword,
        # 'shopping_items' : shopping_keyword,
    }    
    
    return render(request, 'gardening_shop_app/gardening_shop_index.html', context)



class StandardResultsSetPagination(PageNumberPagination):
    page_size = 20
    page_size_query_param = 'page_size'
    max_page_size = 100

from django.core.exceptions import FieldError

class ShopingTbList(APIView):
    def get(self, request, format=None):
        products = ShopingTb.objects.all()
        category = request.query_params.get('category', 'all')

        if category != 'all':
            products = products.filter(shoping_tb_rss_channel_item_category1=category)

        # Paginator 객체 생성
        paginator = Paginator(products, 20)  # 20개 항목 당 페이지
        page_number = request.query_params.get('page', 1)
        page_obj = paginator.get_page(page_number)
        
        serializer = ShopingTbSerializer(page_obj, many=True)

        # 전체 페이지 수를 응답에 추가
        response_data = {
            'results': serializer.data,
            'total_pages': paginator.num_pages
        }

        return Response(response_data)


def recommended_products(request, user_id):
    # user_id로 연결된 search_keyword_scores의 평균을 구하기
    user_search_terms = UserSearchTerms.objects.filter(user_id=user_id)
    if user_search_terms.exists():
        avg_score = user_search_terms.aggregate(Avg('search_keyword_scores'))['search_keyword_scores__avg']
        
        if avg_score >= 0.6:
            # 평균 점수가 0.6 이상인 경우, 높은 search_keyword_scores를 가진 상품 추천
            top_50_products = ShopingTb.objects.order_by('-search_keyword_scores')[:50]
            recommended = random.sample(list(top_50_products), 10)
        else:
            # 평균 점수가 0.6 미만인 경우, 낮은 search_keyword_scores를 가진 상품 추천
            top_50_products = ShopingTb.objects.order_by('search_keyword_scores')[:50]
            recommended = random.sample(list(top_50_products), 10)
    else:
        # user_id에 연결된 검색어가 없는 경우, 무작위 추천
            top_50_products = ShopingTb.objects.order_by('-shopping_review_scores')[:50]
            # 상위 50개 중에서 무작위로 10개를 선택
            recommended = random.sample(list(top_50_products), 10)

    # 추천 상품 데이터 구성
    data = [
        {
            'shoping_tb_rss_channel_item_productid': p.shoping_tb_rss_channel_item_productid,
            'shoping_tb_rss_channel_item_image': p.shoping_tb_rss_channel_item_image,
            'shoping_tb_rss_channel_item_title': p.shoping_tb_rss_channel_item_title,
            'shoping_tb_rss_channel_item_lprice': p.shoping_tb_rss_channel_item_lprice,
            'shopping_review_scores': p.shopping_review_scores
        } for p in recommended
    ]

    return JsonResponse(data, safe=False)


def product_detail(request, id):
    try:
        product = ShopingTb.objects.filter(shoping_tb_rss_channel_item_productid=id).first()
        if product is None:
            raise ShopingTb.DoesNotExist
        data = {
            "shoping_tb_no": product.shoping_tb_no,
            "shoping_tb_rss_channel_item_image": product.shoping_tb_rss_channel_item_image,
            "shoping_tb_rss_channel_item_title": product.shoping_tb_rss_channel_item_title,
            "shoping_tb_rss_channel_item_lprice": product.shoping_tb_rss_channel_item_lprice
        }
        return JsonResponse(data)
    except ShopingTb.DoesNotExist:
        return JsonResponse({"error": "Product not found"}, status=404)

def shopping_reviews(request, shoping_tb_no):
    try:
        # shoping_tb_no를 기반으로 해당 상품과 관련된 리뷰만 필터링
        reviews = ShoppingReview.objects.filter(shoping_tb_no=shoping_tb_no)

        # 필터링된 리뷰 중 최대 10개 선택
        num_reviews_to_select = min(len(reviews), 10)
        selected_reviews = reviews[:num_reviews_to_select]

        data = [{
                 "shopping_review_no": review.shopping_review_no, 
                 "shopping_review_content": review.shopping_review_content,
                 "shopping_review_rank": review.shopping_review_rank
                 } 
                 for review in selected_reviews
        ]
        return JsonResponse(data, safe=False)
    except ObjectDoesNotExist:
        return JsonResponse({'error': 'No reviews found for the specified product.'}, status=404)

   
@csrf_exempt
def post_review(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        try:
            # Determine the value of shopping_review_rank_positive_negative
            if int(data['shopping_review_rank']) >= 4:
                shopping_review_rank_positive_negative = 1
            else:
                shopping_review_rank_positive_negative = 0

            new_review = ShoppingReview.objects.create(
                user_id=data['user'],
                shoping_tb_no_id=data['shoping_tb_no'],
                shopping_review_content=data['shopping_review_content'],
                shopping_review_rank=data['shopping_review_rank'],
                shopping_review_rank_positive_negative=shopping_review_rank_positive_negative  # Add this field to your model if it's not already there
            )

            # Execute the update_review_recent.py script using manage.py
            subprocess.run(["python", "manage.py", "update_review_recent"])
            subprocess.run(["python", "manage.py", "initialize_scores"])
            return JsonResponse({'message': 'Review added successfully'})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request'}, status=400)
    
class GardeningShopSearch(APIView):
    def get(self, request, keyword, user_id=None, format=None):
        search_results = ShopingTb.objects.filter(shoping_tb_rss_channel_item_title__icontains=keyword)
        paginator = Paginator(search_results, 20) # 20개 항목 당 페이지
        page = request.GET.get('page') or 1
        results = paginator.get_page(page)
        serializer = ShopingTbSerializer(results, many=True)

        # 검색어 로깅과 점수 계산 로직
        score = 0.5  # 기본 점수
        matching_keywords = ShoppingSearchData.objects.filter(shopping_search_data_word__icontains=keyword).order_by('-shopping_search_data_score')
        if matching_keywords.exists():
            exact_match = matching_keywords.filter(shopping_search_data_word=keyword)
            if exact_match.exists():
                score = exact_match.first().shopping_search_data_score
            else:
                score = matching_keywords.first().shopping_search_data_score

        if user_id != 0:
            UserSearchTerms.objects.create(
                user_id=user_id,
                search_term=keyword,
                search_keyword_scores=score
            )

            UserSearchTermsBackup.objects.create(
                user_id=user_id,
                search_term=keyword,
                search_keyword_scores=score
            )

            # 사용자 ID와 연결된 행의 개수를 확인
            count = UserSearchTerms.objects.filter(user_id=user_id).count()

            # 5개를 초과하는 경우, 해당 행 모두 삭제
            if count > 5:
                UserSearchTerms.objects.filter(user_id=user_id).delete()

        # 전체 페이지 수와 함께 결과 반환
        response_data = {
            'results': serializer.data,
            'total_pages': paginator.num_pages,
        }
        return Response(response_data)