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

class DiagnosisBoardCommentSerializer(serializers.ModelSerializer):
    user = UserInfoSerializer(read_only=True)
    class Meta:
        model = DiagnosisBoardCmtTb
        fields = [
            "cmt_no",
            "cmt_content",
            "cmt_date",
            "thread_no",
            "user"
        ]

class DiagnosisBoardListShowSerializer(serializers.ModelSerializer):
    user = UserInfoSerializer(read_only=True)
    class Meta:
        model = DiagnosisBoardTb
        fields = [
            "thread_no",
            "thread_title",
            "thread_date",
            "thread_type",
            "user"
        ]

class DiagnosisBoardDetailShowSerializer(serializers.ModelSerializer):
    user = UserInfoSerializer(read_only=True)
    thread_comments = DiagnosisBoardCommentSerializer(many=True)
    class Meta:
        model = DiagnosisBoardTb
        fields = [
            "thread_no",
            "thread_title",
            "thread_content",
            "thread_img",
            "thread_date",
            "thread_type",
            "user",
            "thread_comments"
        ]

class DiagnosisBoardModifySerializer(serializers.ModelSerializer):
    class Meta:
        model = DiagnosisBoardTb
        fields = [
            "thread_no",
            "thread_title",
            "thread_content",
            "thread_img",
            "thread_date",
            "thread_type",
            "user"
        ]

class DiagnosisBoardCommentModifySerializer(serializers.ModelSerializer):
    class Meta:
        model = DiagnosisBoardCmtTb
        fields = [
            "cmt_no",
            "cmt_content",
            "cmt_date",
            "thread_no",
            "user"
        ]