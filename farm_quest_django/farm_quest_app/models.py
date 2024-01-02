from django.db import models
class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class AuthtokenToken(models.Model):
    key = models.CharField(primary_key=True, max_length=40)
    created = models.DateTimeField()
    user = models.OneToOneField('UsersAppUser', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'authtoken_token'


class CartTb(models.Model):
    cart_no = models.BigIntegerField(primary_key=True)
    cart_productid = models.IntegerField(db_column='cart_productId', blank=True, null=True)  # Field name made lowercase.
    user_id = models.BigIntegerField(blank=True, null=True)
    cart_datetime = models.DateTimeField(blank=True, null=True)
    cart_quantity = models.IntegerField(blank=True, null=True)
    product_price = models.IntegerField(blank=True, null=True)
    cart_price = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'cart_tb'


class CommunityCmtTb(models.Model):
    cmt_no = models.AutoField(primary_key=True)
    cmt_content = models.TextField()
    cmt_date = models.DateTimeField(blank=True, null=True)
    thread_no = models.ForeignKey('CommunityTb', models.DO_NOTHING, db_column='thread_no')
    user = models.ForeignKey('UsersAppUser', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'community_cmt_tb'


class CommunityTb(models.Model):
    thread_no = models.AutoField(primary_key=True)
    thread_title = models.CharField(max_length=300, blank=True, null=True)
    thread_content = models.TextField()
    thread_img = models.TextField(blank=True, null=True)
    thread_date = models.DateTimeField(blank=True, null=True)
    thread_type = models.IntegerField(blank=True, null=True)
    user = models.ForeignKey('UsersAppUser', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'community_tb'


class CsCmtTb(models.Model):
    cmt_no = models.AutoField(primary_key=True)
    cmt_content = models.TextField()
    cmt_date = models.DateTimeField(blank=True, null=True)
    is_admin = models.IntegerField(blank=True, null=True)
    cs_no = models.ForeignKey('CsTb', models.DO_NOTHING, db_column='cs_no')

    class Meta:
        managed = False
        db_table = 'cs_cmt_tb'


class CsTb(models.Model):
    cs_no = models.AutoField(primary_key=True)
    cs_title = models.TextField()
    cs_content = models.TextField()
    cs_date = models.DateTimeField(blank=True, null=True)
    cs_img = models.TextField(blank=True, null=True)
    user = models.ForeignKey('UsersAppUser', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'cs_tb'


class DiagnosisHistory(models.Model):
    diagnosis_history_no = models.CharField(primary_key=True, max_length=45)
    diagnosis_history_content = models.CharField(max_length=45, blank=True, null=True)
    user = models.ForeignKey('UsersAppUser', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'diagnosis_history'


class DiagnosisQuestion(models.Model):
    diagnosis_question_no = models.AutoField(primary_key=True)
    diagnosis_question_content = models.CharField(max_length=45)

    class Meta:
        managed = False
        db_table = 'diagnosis_question'


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.PositiveSmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey('UsersAppUser', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    id = models.BigAutoField(primary_key=True)
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'


class GSchedulerTb(models.Model):
    g_schedule_no = models.AutoField(primary_key=True)
    solar_term = models.CharField(max_length=30, blank=True, null=True)
    recommendation = models.TextField(blank=True, null=True)
    plant_no = models.ForeignKey('PlantTb', models.DO_NOTHING, db_column='plant_no')

    class Meta:
        managed = False
        db_table = 'g_scheduler_tb'


class GrowPlant(models.Model):
    grow_plant_no = models.CharField(primary_key=True, max_length=45)
    grow_plant = models.CharField(max_length=45, blank=True, null=True)
    user_no = models.CharField(max_length=45, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'grow_plant'


class GuideTb(models.Model):
    guide_no = models.BigIntegerField(primary_key=True)
    guide_title = models.CharField(max_length=45, blank=True, null=True)
    plant_descript = models.TextField(blank=True, null=True)
    farm_guide = models.TextField(blank=True, null=True)
    plant_image_url = models.CharField(max_length=45, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'guide_tb'


class PSchedulerTb(models.Model):
    p_schedule_no = models.AutoField(primary_key=True)
    user_plant_no = models.ForeignKey('UserPlantTb', models.DO_NOTHING, db_column='user_plant_no')
    water_last_date = models.DateField(blank=True, null=True)
    repot_last_data = models.DateField(blank=True, null=True)
    nutrition_last_data = models.DateField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'p_scheduler_tb'


class PlantTb(models.Model):
    plant_no = models.AutoField(primary_key=True)
    plant_name = models.CharField(max_length=60)
    plant_main_img = models.TextField(blank=True, null=True)
    plant_content = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'plant_tb'


class PostsComment(models.Model):
    id = models.BigAutoField(primary_key=True)
    text = models.TextField()
    author = models.ForeignKey('UsersAppUser', models.DO_NOTHING)
    profile = models.ForeignKey('UsersAppProfile', models.DO_NOTHING)
    post = models.ForeignKey('PostsPost', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'posts_comment'


class PostsPost(models.Model):
    id = models.BigAutoField(primary_key=True)
    title = models.CharField(max_length=128)
    category = models.CharField(max_length=128)
    body = models.TextField()
    image = models.CharField(max_length=100)
    published_date = models.DateTimeField()
    author = models.ForeignKey('UsersAppUser', models.DO_NOTHING)
    profile = models.ForeignKey('UsersAppProfile', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'posts_post'


class PostsPostLikes(models.Model):
    id = models.BigAutoField(primary_key=True)
    post = models.ForeignKey(PostsPost, models.DO_NOTHING)
    user = models.ForeignKey('UsersAppUser', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'posts_post_likes'
        unique_together = (('post', 'user'),)


class SearchHistory(models.Model):
    search_history_no = models.CharField(primary_key=True, max_length=45)
    search_history_content = models.TextField(blank=True, null=True)
    user_no = models.CharField(max_length=45, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'search_history'


class SearchPlantTb(models.Model):
    sp_no = models.AutoField(primary_key=True)
    sp_content = models.TextField()
    sp_date = models.DateTimeField(blank=True, null=True)
    user_plant_no = models.ForeignKey('UserPlantTb', models.DO_NOTHING, db_column='user_plant_no')

    class Meta:
        managed = False
        db_table = 'search_plant_tb'


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
    shopping_review_no = models.IntegerField(primary_key=True)
    shopping_review_content = models.TextField(blank=True, null=True)
    shopping_review_rank = models.IntegerField(blank=True, null=True)
    shopping_review_rank_positive_negative = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'shopping_review'


class SolutionTb(models.Model):
    disease_code = models.IntegerField(blank=True, null=True)
    plant_no = models.IntegerField(blank=True, null=True)
    disease_category = models.TextField(blank=True, null=True)
    disease_name = models.TextField(blank=True, null=True)
    chinese_character = models.TextField(db_column='Chinese_character', blank=True, null=True)  # Field name made lowercase.
    english_name = models.TextField(blank=True, null=True)
    pathogen = models.TextField(blank=True, null=True)
    occurence_environment = models.TextField(blank=True, null=True)
    symptom = models.TextField(blank=True, null=True)
    solution_content = models.TextField(blank=True, null=True)
    solution_word = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'solution_tb'


class TokenBlacklistBlacklistedtoken(models.Model):
    id = models.BigAutoField(primary_key=True)
    blacklisted_at = models.DateTimeField()
    token = models.OneToOneField('TokenBlacklistOutstandingtoken', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'token_blacklist_blacklistedtoken'


class TokenBlacklistOutstandingtoken(models.Model):
    id = models.BigAutoField(primary_key=True)
    token = models.TextField()
    created_at = models.DateTimeField(blank=True, null=True)
    expires_at = models.DateTimeField()
    user = models.ForeignKey('UsersAppUser', models.DO_NOTHING, blank=True, null=True)
    jti = models.CharField(unique=True, max_length=255)

    class Meta:
        managed = False
        db_table = 'token_blacklist_outstandingtoken'


class UserPlantTb(models.Model):
    user_plant_no = models.AutoField(primary_key=True)
    user_plant_img = models.TextField(blank=True, null=True)
    user = models.ForeignKey('UsersAppUser', models.DO_NOTHING, blank=True, null=True)
    plant_no = models.ForeignKey(PlantTb, models.DO_NOTHING, db_column='plant_no')

    class Meta:
        managed = False
        db_table = 'user_plant_tb'


class UsersAppProfile(models.Model):
    id = models.BigAutoField(primary_key=True)
    nickname = models.CharField(max_length=128)
    position = models.CharField(max_length=128)
    subjects = models.CharField(max_length=128)
    image = models.CharField(max_length=100)
    user = models.OneToOneField('UsersAppUser', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'users_app_profile'


class UsersAppUser(models.Model):
    id = models.BigAutoField(primary_key=True)
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.IntegerField(blank=True, null=True)
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=150, blank=True, null=True)
    last_name = models.CharField(max_length=150, blank=True, null=True)
    email = models.CharField(max_length=254, blank=True, null=True)
    is_staff = models.IntegerField(blank=True, null=True)
    is_active = models.IntegerField(blank=True, null=True)
    date_joined = models.DateTimeField(blank=True, null=True)
    profile_image = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'users_app_user'


class UsersAppUserGroups(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(UsersAppUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'users_app_user_groups'
        unique_together = (('user', 'group'),)


class UsersAppUserUserPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(UsersAppUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'users_app_user_user_permissions'
        unique_together = (('user', 'permission'),)