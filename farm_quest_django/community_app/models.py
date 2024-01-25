from django.db import models


class CommunityCmtTb(models.Model):
    cmt_no = models.AutoField(primary_key=True)
    cmt_content = models.TextField()
    cmt_date = models.DateTimeField(blank=True, null=True)
    thread_no = models.ForeignKey('CommunityTb', models.DO_NOTHING, db_column='thread_no')
    user = models.ForeignKey('users_app.UsersAppUser', models.DO_NOTHING, blank=True, null=True)

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
    user = models.ForeignKey('users_app.UsersAppUser', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'community_tb'
        
        

