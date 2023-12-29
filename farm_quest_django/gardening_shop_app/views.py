
from django.shortcuts import get_object_or_404, render, redirect
from .models import ShoppingReview, ShopingTb

# def gardening_shop_index(request):    
#     return render(request, 'gardening_shop_app/gardening_shop_index.html')


def gardening_shop_index(request):    
    shopping_review_all = ShoppingReview.objects.all()
    # shopping_review_keyword = ShoppingReview.objects.filter(shopping_review_content___icontains=keyword)
    shopping_all = ShopingTb.objects.all()
    # shopping_keyword = ShopingTb.objects.filter(shoping_tb_rss_channel_item_title__icontains=keyword)
    
    context = {
        'shopping_review_all' : shopping_review_all,
        # 'shopping_review_keyword' : shopping_review_keyword,
        'shopping_all' : shopping_all,
        # 'shopping_keyword' : shopping_keyword,
    }
    return render(request, 'gardening_shop_app/gardening_shop_index.html', context)

