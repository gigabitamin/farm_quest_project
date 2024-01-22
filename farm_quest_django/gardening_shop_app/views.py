
from django.shortcuts import get_object_or_404, render, redirect
from django.http import JsonResponse
from .models import ShoppingReview, ShopingTb
from django.db.models import Q
from rest_framework.pagination import PageNumberPagination
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import ShopingTbSerializer  # 시리얼라이저를 불러옵니다

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

class ShopingTbList(APIView):
    pagination_class = StandardResultsSetPagination

    def get(self, request, format=None):
        products = ShopingTb.objects.all()
        category = request.query_params.get('category')
        if category and category != 'all':
            products = products.filter(category=category)

        paginator = StandardResultsSetPagination()
        result_page = paginator.paginate_queryset(products, request)
        serializer = ShopingTbSerializer(result_page, many=True)  # 시리얼라이저를 사용합니다
        return paginator.get_paginated_response(serializer.data)  # 시리얼라이즈된 데이터를 반환합니다