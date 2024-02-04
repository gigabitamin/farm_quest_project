from django.db import models

class DiagnosisResultAll(models.Model):
    diagnosis_result_all_id = models.AutoField(primary_key=True)
    detect_result = models.JSONField(blank=True, null=True)
    save_file_name = models.CharField(max_length=255, blank=True, null=True)
    plant_name = models.CharField(max_length=255, blank=True, null=True)
    plant_no = models.IntegerField(blank=True, null=True)
    diagnosis_create_time = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey('users_app.UsersAppUser', models.DO_NOTHING, blank=True, null=True)    
    
    class Meta:
        managed = False
        db_table = 'diagnosis_result_all'    
    
    def __str__(self):
        return self.save_file_name        


class DiagnosisResult(models.Model):
    diagnosis_result_id = models.AutoField(primary_key=True)
    user_select_plant = models.ForeignKey('PlantTb', models.DO_NOTHING, db_column='user_select_plant', blank=True, null=True)
    boxes = models.JSONField(blank=True, null=True)
    keypoints = models.JSONField(blank=True, null=True)
    masks = models.JSONField(blank=True, null=True)
    names = models.JSONField(blank=True, null=True)
    orig_shape = models.JSONField(blank=True, null=True)
    path = models.CharField(max_length=255, blank=True, null=True)
    probs = models.JSONField(blank=True, null=True)
    save_dir = models.CharField(max_length=255, blank=True, null=True)
    speed = models.JSONField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'diagnosis_result'
    

class DiagnosisQuestion(models.Model):
    diagnosis_question_no = models.AutoField(primary_key=True)
    diagnosis_question_content = models.CharField(max_length=45)

    class Meta:
        managed = False
        db_table = 'diagnosis_question'
        
class DiagnosisQuestionHistory(models.Model):
    diagnosis_question_history_id = models.AutoField(primary_key=True)
    diagnosis_question_1 = models.CharField(max_length=45, blank=True, null=True)
    diagnosis_question_2 = models.CharField(max_length=45, blank=True, null=True)
    diagnosis_question_3 = models.CharField(max_length=45, blank=True, null=True)
    diagnosis_question_4 = models.CharField(max_length=45, blank=True, null=True)
    diagnosis_question_5 = models.CharField(max_length=45, blank=True, null=True)
    diagnosis_question_6 = models.CharField(max_length=45, blank=True, null=True)
    diagnosis_question_7 = models.CharField(max_length=45, blank=True, null=True)
    diagnosis_question_8 = models.CharField(max_length=45, blank=True, null=True)
    diagnosis_question_9 = models.CharField(max_length=45, blank=True, null=True)
    diagnosis_question_10 = models.CharField(max_length=45, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'diagnosis_question_history'                    
        
class PlantTb(models.Model):
    plant_no = models.AutoField(primary_key=True)
    plant_name = models.CharField(max_length=60)
    plant_main_img = models.TextField(blank=True, null=True)
    plant_content = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'plant_tb'
          
        
       
class SolutionTb(models.Model):
    solution_id = models.AutoField(primary_key=True)
    disease_code = models.TextField(blank=True, null=True)
    plant_no = models.IntegerField(blank=True, null=True)
    plant_name = models.TextField(blank=True, null=True)
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

        
        
class DiagnosisItemCart(models.Model):
    diagnosis_item_cart_id = models.AutoField(primary_key=True)
    diagnosis_item_cart_list = models.JSONField(blank=True, null=True)
    user = models.ForeignKey('users_app.UsersAppUser', models.DO_NOTHING, blank=True, null=True)
    
    class Meta:
        managed = False
        db_table = 'diagnosis_item_cart'
                

class DiagnosisShopingTb(models.Model):
    shoping_tb_no = models.IntegerField(primary_key=True)
    shoping_tb_rss_channel_item_title = models.TextField(blank=True, null=True)
    shoping_tb_rss_channel_item_link = models.TextField(blank=True, null=True)
    shoping_tb_rss_channel_item_image = models.TextField(blank=True, null=True)
    shoping_tb_rss_channel_item_lprice = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'shoping_tb'