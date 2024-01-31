from django.db import models

class CsCmtTb(models.Model):
    cmt_no = models.AutoField(primary_key=True)
    cmt_content = models.TextField()
    cmt_date = models.DateTimeField(blank=True, null=True)
    is_admin = models.IntegerField(blank=True, null=True)
    cs_no = models.ForeignKey('CsNoticeTb', models.DO_NOTHING, db_column='cs_no')

    class Meta:
        managed = False
        db_table = 'cs_cmt_tb'
        

class CsFaqTb(models.Model):
    cs_faq_no = models.AutoField(primary_key=True)
    cs_faq_ctg_type = models.IntegerField(blank=True, null=True)
    cs_faq_title = models.TextField()
    cs_faq_content = models.TextField()
    cs_faq_img = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'cs_faq_tb'


class CsNoticeTb(models.Model):
    cs_notice_no = models.AutoField(primary_key=True)
    cs_notice_ctg_type = models.IntegerField(blank=True, null=True)
    cs_notice_title = models.TextField()
    cs_notice_content = models.TextField()
    cs_notice_date = models.DateTimeField(blank=True, null=True)
    cs_notice_img = models.TextField(blank=True, null=True)
    user = models.ForeignKey('users_app.UsersAppUser', models.DO_NOTHING, blank=True, null=True)      

    class Meta:
        managed = False
        db_table = 'cs_notice_tb'


class CsOneTb(models.Model):
    cs_one_no = models.AutoField(primary_key=True)
    cs_one_ctg_type = models.IntegerField()
    cs_one_title = models.TextField()
    cs_one_content = models.TextField()
    cs_one_date = models.DateTimeField(blank=True, null=True)
    cs_one_img = models.TextField(blank=True, null=True)
    user = models.ForeignKey('users_app.UsersAppUser', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'cs_one_tb'
