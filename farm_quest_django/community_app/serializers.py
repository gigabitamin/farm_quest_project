from rest_framework import serializers
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
        fields = [
            "thread_no",
            "thread_title",
            "thread_content",
            "thread_img",
            "thread_date",
            "thread_type",
            "user_id"
        ]