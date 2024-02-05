from django.db import models
from django.contrib.contenttypes.fields import GenericRelation
from hitcount.models import HitCount, HitCountMixin

class CommunityCmtTb(models.Model):
    cmt_no = models.AutoField(primary_key=True)
    cmt_content = models.TextField()
    cmt_date = models.DateTimeField(auto_now_add=True)
    thread_no = models.ForeignKey('CommunityTb', models.DO_NOTHING, db_column='thread_no', related_name="thread_comments")
    user = models.ForeignKey('users_app.UsersAppUser', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'community_cmt_tb'


class CommunityTb(models.Model, HitCountMixin):
    thread_no = models.AutoField(primary_key=True)
    thread_title = models.CharField(max_length=300, blank=True, null=True)
    thread_content = models.TextField()
    thread_img = models.TextField(blank=True, null=True)
    thread_date = models.DateTimeField(auto_now_add=True)
    thread_type = models.IntegerField(blank=True, null=True)
    user = models.ForeignKey('users_app.UsersAppUser', models.DO_NOTHING, blank=True, null=True)
    thread_count = models.IntegerField(blank=True, null=True)
    hit_count_generic = GenericRelation(HitCount, object_id_field='object_pk', related_query_name='hit_count_generic_relation')

    class Meta:
        managed = False
        db_table = 'community_tb'
