from django.db import models

# Create your models here.
class GridData(models.Model):
    grid_id = models.IntegerField(primary_key=True)
    location_1 = models.TextField(blank=True, null=True)
    location_2 = models.TextField(blank=True, null=True)
    location_3 = models.TextField(blank=True, null=True)
    nx = models.IntegerField(db_column='NX', blank=True, null=True)  # Field name made lowercase.
    ny = models.IntegerField(db_column='NY', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'grid_data'
        
class Scheduler(models.Model):
    schedule_no = models.AutoField(primary_key=True)   
    plant_no = models.IntegerField()
    disease_code = models.TextField()
    disease_name = models.CharField(max_length=45, blank=True, null=True)
    disease_start = models.DateField()
    disease_end = models.DateField()
    disease_announcement = models.CharField(max_length=45, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'scheduler'
