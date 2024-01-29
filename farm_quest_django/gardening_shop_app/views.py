
from django.shortcuts import get_object_or_404, render, redirect
from django.http import JsonResponse
from .models import ShoppingReview, ShopingTb
from django.db.models import Q
from rest_framework.pagination import PageNumberPagination
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import ShopingTbSerializer  # 시리얼라이저를 불러옵니다
from django.core.exceptions import ObjectDoesNotExist
import random
from django.views.decorators.csrf import csrf_exempt
import json
import time
import subprocess
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
    pagination_class = StandardResultsSetPagination

    def get(self, request, format=None):
        products = ShopingTb.objects.all()
        category = request.query_params.get('category')
        try:
            if category and category != 'all':
                products = products.filter(shoping_tb_rss_channel_item_category1=category)

            paginator = StandardResultsSetPagination()
            result_page = paginator.paginate_queryset(products, request)
            serializer = ShopingTbSerializer(result_page, many=True)
            return paginator.get_paginated_response(serializer.data)
        except FieldError:
            # 적절한 예외 처리 또는 로깅
            return Response({"error": "Invalid category field"}, status=status.HTTP_400_BAD_REQUEST)


def recommended_products(request):
    # shopping_review_scores에 따라 상위 50개의 상품을 추출
    top_50_products = ShopingTb.objects.order_by('-shopping_review_scores')[:50]

    # 상위 50개 중에서 무작위로 10개를 선택
    recommended = random.sample(list(top_50_products), 10)

    data = [
        {
            'shoping_tb_rss_channel_item_productid': p.shoping_tb_rss_channel_item_productid,
            'shoping_tb_rss_channel_item_image': p.shoping_tb_rss_channel_item_image,
            'shoping_tb_rss_channel_item_title': p.shoping_tb_rss_channel_item_title,
            'shoping_tb_rss_channel_item_lprice': p.shoping_tb_rss_channel_item_lprice,
            'shopping_review_scores': p.shopping_review_scores  # 평점도 포함
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