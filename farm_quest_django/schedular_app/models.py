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