from rest_framework import serializers
from django.contrib.auth import authenticate
from users_app.models import UsersAppUser 
from .models import *

class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = UsersAppUser
        fields = [
            "id",
            "username",
            "nickname"
        ]

class CommunityCommentSerializer(serializers.ModelSerializer):
    user = UserInfoSerializer(read_only=True)
    class Meta:
        model = CommunityCmtTb
        fields = [
            "cmt_no",
            "cmt_content",
            "cmt_date",
            "thread_no",
            "user"
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
            "user",
            "thread_count",
        ]

class CommunityDetailShowSerializer(serializers.ModelSerializer):
    user = UserInfoSerializer(read_only=True)
    thread_comments = CommunityCommentSerializer(many=True)
    class Meta:
        model = CommunityTb
        fields = [
            "thread_no",
            "thread_title",
            "thread_content",
            "thread_img",
            "thread_date",
            "thread_type",
            "user",
            "thread_comments",
            "thread_count",
        ]

class CommunityModifySerializer(serializers.ModelSerializer):
    class Meta:
        model = CommunityTb
        fields = [
            "thread_no",
            "thread_title",
            "thread_content",
            "thread_img",
            "thread_type",
            "user"
        ]

class CommunityCommentModifySerializer(serializers.ModelSerializer):
    class Meta:
        model = CommunityCmtTb
        fields = [
            "cmt_no",
            "cmt_content",
            "thread_no",
            "user"
        ]