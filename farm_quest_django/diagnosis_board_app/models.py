from django.db import models

   

class DiagnosisBoardCmtTb(models.Model):
    cmt_no = models.AutoField(primary_key=True)
    cmt_content = models.TextField(blank=True, null=True)   
    cmt_date = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    thread_no = models.IntegerField(blank=True, null=True)  
    user = models.ForeignKey('users_app.UsersAppUser', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'diagnosis_board_cmt_tb'

    # def __str__(self):
    #     return self.cmt_content       

class DiagnosisBoardTb(models.Model):  
    thread_no = models.AutoField(primary_key=True, )
    thread_title = models.CharField(max_length=255, blank=True, null=True)    
    thread_content = models.TextField(blank=True, null=True)
    thread_img = models.TextField(blank=True, null=True)
    thread_date = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    thread_type = models.IntegerField(blank=True, null=True)
    user = models.ForeignKey('users_app.UsersAppUser', models.DO_NOTHING, blank=True, null=True)
    thread_count = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'diagnosis_board_tb'
        
    # def __str__(self):
    #     return self.thread_content
