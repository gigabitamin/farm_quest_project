from django.db import models

class diagnosis_yolo_result(models.Model):
    boxes = models.JSONField()
    keypoints = models.JSONField(null=True, blank=True)
    masks = models.JSONField(null=True, blank=True)
    names = models.JSONField(null=True, blank=True)
    orig_shape = models.JSONField(null=True, blank=True)
    path = models.CharField(max_length=255, null=True, blank=True)
    probs = models.JSONField(null=True, blank=True)
    save_dir = models.CharField(max_length=255, null=True, blank=True)
    speed = models.JSONField(null=True, blank=True)
    # orig_img = models.BinaryField(null=True, blank=True)

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
        
class DiagnosisHistory(models.Model):
    diagnosis_history_no = models.CharField(primary_key=True, max_length=45)
    diagnosis_history_content = models.CharField(max_length=45, blank=True, null=True)
    user_plant_no = models.ForeignKey('UserPlantTb', models.DO_NOTHING, db_column='user_plant_no')
    solution_id = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'diagnosis_history'                    
        
       
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

class UserPlantTb(models.Model):
    user_plant_no = models.AutoField(primary_key=True)
    user_plant_img = models.TextField(blank=True, null=True)
    user = models.ForeignKey('UsersAppUser', models.DO_NOTHING, blank=True, null=True)
    plant_no = models.ForeignKey(PlantTb, models.DO_NOTHING, db_column='plant_no')

    class Meta:
        managed = False
        db_table = 'user_plant_tb'        
        
        

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