
from django.shortcuts import get_object_or_404, render, redirect
from .models import ShoppingReview, ShopingTb
from django.db.models import Q


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
