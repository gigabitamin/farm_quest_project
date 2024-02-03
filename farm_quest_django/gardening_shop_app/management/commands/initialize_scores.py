from django.core.management.base import BaseCommand
from django.db.models import Sum
from gardening_shop_app.models import ShopingTb, ShoppingReview

class Command(BaseCommand):
    help = 'Initializes shopping review scores for each shoping_tb record'

    def handle(self, *args, **kwargs):
        for shoping in ShopingTb.objects.all():
            total_score = ShoppingReview.objects.filter(shoping_tb_no=shoping.shoping_tb_no)\
                                                .aggregate(Sum('shopping_review_rank_positive_negative'))['shopping_review_rank_positive_negative__sum'] or 0
            ShopingTb.objects.filter(shoping_tb_no=shoping.shoping_tb_no).update(shopping_review_scores=total_score)
            self.stdout.write(self.style.SUCCESS(f'Successfully updated scores for shoping_tb_no: {shoping.shoping_tb_no}'))

