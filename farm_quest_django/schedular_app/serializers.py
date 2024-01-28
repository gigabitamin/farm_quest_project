# serializers.py
from rest_framework import serializers
from .models import GridData

class GridDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = GridData
        fields = ['grid_id', 'location_1', 'location_2', 'location_3', 'nx', 'ny']
