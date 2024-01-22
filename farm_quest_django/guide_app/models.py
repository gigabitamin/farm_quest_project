from django.db import models

        
class GuideTb(models.Model):
    guide_no = models.BigIntegerField(primary_key=True)
    guide_title = models.CharField(max_length=45, blank=True, null=True)
    plant_descript = models.TextField(blank=True, null=True)
    farm_guide = models.TextField(blank=True, null=True)
    plant_image_url = models.CharField(max_length=45, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'guide_tb'
        
        