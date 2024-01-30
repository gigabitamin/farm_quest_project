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

class CsNoticeListShowSerializer(serializers.ModelSerializer):
    user = UserInfoSerializer(read_only=True)
    class Meta:
        model = CsNoticeTb
        fields = [
            "cs_notice_no",
            "cs_notice_ctg_type",
            "cs_notice_title",
            "cs_notice_content",
            "cs_notice_date",
            "cs_notice_img",
            "user"
        ]

class CsNoticeCommentSerializer(serializers.ModelSerializer):
    user = UserInfoSerializer(read_only=True)
    class Meta:
        model = CsCmtTb
        fields = [
            "cmt_no",
            "cmt_content",
            "cmt_date",
            "is_admin",
            "cs_no"
        ]


class CsNoticeDetailShowSerializer(serializers.ModelSerializer):
    user = UserInfoSerializer(read_only=True)
    thread_comments = CsNoticeCommentSerializer(many=True)
    class Meta:
        model = CsNoticeTb
        fields = [
            "cs_notice_no",
            "cs_notice_ctg_type",
            "cs_notice_title",
            "cs_notice_content",
            "cs_notice_date",
            "cs_notice_img",
            "user"
        ]

class CsNoticeModifySerializer(serializers.ModelSerializer):
    class Meta:
        model = CsNoticeTb
        fields = [
            "cs_notice_no",
            "cs_notice_ctg_type",
            "cs_notice_title",
            "cs_notice_content",
            "cs_notice_date",
            "cs_notice_img",
            "user"
        ]

class CsNoticeCommentModifySerializer(serializers.ModelSerializer):
    class Meta:
        model = CsCmtTb
        fields = [
            "cmt_no",
            "cmt_content",
            "cmt_date",
            "is_admin",
            "cs_no"
        ]



class CsFaqListShowSerializer(serializers.ModelSerializer):    
    class Meta:
        model = CsFaqTb
        fields = [
            "cs_faq_no",
            "cs_faq_ctg_type",
            "cs_faq_title",
            "cs_faq_content",            
            "cs_faq_img",            
        ]
