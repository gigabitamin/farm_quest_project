from django.db import models


class ShopingTb(models.Model):
    shoping_tb_no = models.AutoField(primary_key=True)
    shoping_tb_s = models.JSONField(blank=True, null=True)
    shoping_tb_rss_channel = models.JSONField(blank=True, null=True)
    shoping_tb_rss_channel_lastbuilddate = models.DateTimeField(db_column='shoping_tb_rss_channel_lastBuildDate', blank=True, null=True)  # Field name made lowercase.
    shoping_tb_rss_channel_total = models.IntegerField(blank=True, null=True)
    shoping_tb_rss_channel_start = models.IntegerField(blank=True, null=True)
    shoping_tb_rss_channel_display = models.IntegerField(blank=True, null=True)
    shoping_tb_rss_channel_item = models.JSONField(blank=True, null=True)
    shoping_tb_rss_channel_item_title = models.CharField(max_length=255, blank=True, null=True)
    shoping_tb_rss_channel_item_link = models.CharField(max_length=255, blank=True, null=True)
    shoping_tb_rss_channel_item_image = models.CharField(max_length=255, blank=True, null=True)
    shoping_tb_rss_channel_item_lprice = models.IntegerField(blank=True, null=True)
    shoping_tb_rss_channel_item_hprice = models.IntegerField(blank=True, null=True)
    shoping_tb_rss_channel_item_mallname = models.CharField(db_column='shoping_tb_rss_channel_item_mallName', max_length=255, blank=True, null=True)  # Field name made lowercase.
    shoping_tb_rss_channel_item_productid = models.IntegerField(db_column='shoping_tb_rss_channel_item_productId', blank=True, null=True)  # Field name made lowercase.
    shoping_tb_rss_channel_item_producttype = models.IntegerField(db_column='shoping_tb_rss_channel_item_productType', blank=True, null=True)  # Field name made lowercase.
    shoping_tb_rss_channel_item_maker = models.CharField(max_length=255, blank=True, null=True)
    shoping_tb_rss_channel_item_brand = models.CharField(max_length=255, blank=True, null=True)
    shoping_tb_rss_channel_item_category1 = models.CharField(max_length=255, blank=True, null=True)
    shoping_tb_rss_channel_item_category2 = models.CharField(max_length=255, blank=True, null=True)
    shoping_tb_rss_channel_item_category3 = models.CharField(max_length=255, blank=True, null=True)
    shoping_tb_rss_channel_item_category4 = models.CharField(max_length=255, blank=True, null=True)

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