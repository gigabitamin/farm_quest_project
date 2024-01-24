from rest_framework import serializers
from django.contrib.auth import authenticate 
from . import models

class CommunityListSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CommunityTb
        fields = [
            "thread_no",
            "thread_title",
            "thread_date",
            "thread_type",
            "user_id"
        ]

class CommunityDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CommunityTb
        fields = "__all__"