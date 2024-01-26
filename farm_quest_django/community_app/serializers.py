from rest_framework import serializers
from django.contrib.auth import authenticate
from users_app.models import UsersAppUser 
from .models import *

class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = UsersAppUser
        fields = [
            "id",
            "username"
        ]

class CommunityListShowSerializer(serializers.ModelSerializer):
    user = UserInfoSerializer(read_only=True)
    class Meta:
        model = CommunityTb
        fields = [
            "thread_no",
            "thread_title",
            "thread_date",
            "thread_type",
            "user"
        ]

class CommunityDetailShowSerializer(serializers.ModelSerializer):
    user = UserInfoSerializer(read_only=True)
    class Meta:
        model = CommunityTb
        fields = [
            "thread_no",
            "thread_title",
            "thread_content",
            "thread_img",
            "thread_date",
            "thread_type",
            "user"
        ]

class CommunityModifySerializer(serializers.ModelSerializer):
    class Meta:
        model = CommunityTb
        fields = [
            "thread_no",
            "thread_title",
            "thread_content",
            "thread_img",
            "thread_date",
            "thread_type",
            "user"
        ]