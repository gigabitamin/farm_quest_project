from django.db import models


class ShopingTb(models.Model):
    shoping_tb_no = models.IntegerField(primary_key=True)
    shoping_tb_s = models.TextField()
    shoping_tb_rss_channel = models.TextField()
    shoping_tb_rss_channel_lastBuildDate = models.TextField()
    shoping_tb_rss_channel_total = models.TextField()
    shoping_tb_rss_channel_start = models.TextField()
    shoping_tb_rss_channel_display = models.TextField()
    shoping_tb_rss_channel_item = models.TextField()
    shoping_tb_rss_channel_item_title = models.TextField()
    shoping_tb_rss_channel_item_link = models.TextField()
    shoping_tb_rss_channel_item_image = models.TextField()
    shoping_tb_rss_channel_item_lprice = models.IntegerField()
    shoping_tb_rss_channel_item_hprice = models.TextField()
    shoping_tb_rss_channel_item_mallName = models.TextField()
    shoping_tb_rss_channel_item_productId = models.BigIntegerField()
    shoping_tb_rss_channel_item_productType = models.IntegerField()
    shoping_tb_rss_channel_item_maker = models.TextField()
    shoping_tb_rss_channel_item_brand = models.TextField()
    shoping_tb_rss_channel_item_category1 = models.TextField()
    shoping_tb_rss_channel_item_category2 = models.TextField()
    shoping_tb_rss_channel_item_category3 = models.TextField()
    shoping_tb_rss_channel_item_category4 = models.TextField()

    class Meta:
        managed = False
        db_table = 'shoping_tb'




class ShoppingReview(models.Model):
    shopping_review_no = models.AutoField(primary_key=True)
    shopping_review_content = models.TextField(blank=True, null=True)
    shopping_review_rank = models.IntegerField(blank=True, null=True)
    shopping_review_rank_positive_negative = models.IntegerField(blank=True, null=True)
    shopping_review_predict = models.IntegerField(blank=True, null=True)
    shopping_review_predict_rate = models.TextField(blank=True, null=True)
    shoping_tb_no = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'shopping_review'