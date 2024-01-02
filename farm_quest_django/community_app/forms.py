from django import forms # 상속
from .models import CommunityCmtTb, CommunityTb


# 커스텀
class CommunityCmtForm(forms.ModelForm):
    class Meta:
        model = CommunityCmtTb

        fields = (
            'cmt_no',
            'cmt_content',
            'cmt_date',
            'thread_no',
        )

        labels = {
            'cmt_no' : '댓글 번호',
            'cmt_content' : '댓글 내용',
            'cmt_date' : '댓글 작성 날짜',
            'thread_no' : '댓글 쓰레드 번호',
        }


class CommunityForm(forms.ModelForm):
    class Meta:
        model = CommunityTb

        fields = (
            'thread_no',
            'thread_title',
            'thread_content',
            'thread_img',
            'thread_date',
            'thread_type',
        )

        labels = {
            'thread_no' : '스레드 번호', 
            'thread_title' : '스레드 제목',
            'thread_content' : '스레드 본문',
            'thread_img' : '스레드 이미지 주소',
            'thread_date' : '스레드 작성 날짜',
            'thread_type' : '스레드 타입',
        }
                