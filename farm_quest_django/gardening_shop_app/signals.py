from django.db.models.signals import post_save
from django.dispatch import receiver
from django.db.models import Sum
from .models import ShoppingReview, ShopingTb

@receiver(post_save, sender=ShoppingReview)
def update_shopping_review_score(sender, instance, **kwargs):
    total_score = ShoppingReview.objects.filter(shoping_tb_no=instance.shoping_tb_no)\
                                        .aggregate(Sum('shopping_review_rank_positive_negative'))['shopping_review_rank_positive_negative__sum'] or 0
    ShopingTb.objects.filter(shoping_tb_no=instance.shoping_tb_no).update(shopping_review_scores=total_score)
