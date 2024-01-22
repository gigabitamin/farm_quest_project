from django.db import models
# from users_app.models import *

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
        db_table = 'users_app_user'
        
        
        
class UsersAppUser(models.Model):
    id = models.BigAutoField(primary_key=True)
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.IntegerField(blank=True, null=True)
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=150, blank=True, null=True)
    last_name = models.CharField(max_length=150, blank=True, null=True)
    email = models.CharField(max_length=254)
    is_staff = models.IntegerField()
    is_active = models.IntegerField()
    date_joined = models.DateTimeField()
    # user_name = models.CharField(max_length=30)
    # user_phone = models.CharField(max_length=20)
    # user_address = models.CharField(max_length=200)    
    profile_image = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'users_app_user'