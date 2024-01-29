from django.db import models


class ShopingTb(models.Model):
    shoping_tb_no = models.IntegerField(primary_key=True)
    shoping_tb_s = models.TextField(blank=True, null=True)
    shoping_tb_rss_channel = models.TextField(blank=True, null=True)   
    shoping_tb_rss_channel_lastbuilddate = models.TextField(db_column='shoping_tb_rss_channel_lastBuildDate', blank=True, null=True)  # Field name made lowercase.
    shoping_tb_rss_channel_total = models.TextField(blank=True, null=True)
    shoping_tb_rss_channel_start = models.TextField(blank=True, null=True)
    shoping_tb_rss_channel_display = models.TextField(blank=True, null=True)
    shoping_tb_rss_channel_item = models.TextField(blank=True, null=True)
    shoping_tb_rss_channel_item_title = models.TextField(blank=True, null=True)
    shoping_tb_rss_channel_item_link = models.TextField(blank=True, null=True)
    shoping_tb_rss_channel_item_image = models.TextField(blank=True, null=True)
    shoping_tb_rss_channel_item_lprice = models.IntegerField(blank=True, null=True)
    shoping_tb_rss_channel_item_hprice = models.TextField(blank=True, null=True)
    shoping_tb_rss_channel_item_mallname = models.TextField(db_column='shoping_tb_rss_channel_item_mallName', blank=True, null=True)  # Field name made lowercase.
    shoping_tb_rss_channel_item_productid = models.BigIntegerField(db_column='shoping_tb_rss_channel_item_productId', blank=True, null=True)  # Field name made lowercase.
    shoping_tb_rss_channel_item_producttype = models.IntegerField(db_column='shoping_tb_rss_channel_item_productType', blank=True, null=True)  # Field name made lowercase.
    shoping_tb_rss_channel_item_maker = models.TextField(blank=True, null=True)
    shoping_tb_rss_channel_item_brand = models.TextField(blank=True, null=True)
    shoping_tb_rss_channel_item_category1 = models.TextField(blank=True, null=True)
    shoping_tb_rss_channel_item_category2 = models.TextField(blank=True, null=True)
    shoping_tb_rss_channel_item_category3 = models.TextField(blank=True, null=True)
    shoping_tb_rss_channel_item_category4 = models.TextField(blank=True, null=True)
    shopping_review_scores = models.IntegerField(blank=True, null=True)

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
    user = models.ForeignKey('users_app.UsersAppUser', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'shopping_review'