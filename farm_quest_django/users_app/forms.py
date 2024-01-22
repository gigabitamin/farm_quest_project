from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import get_user_model 
from django.contrib.auth.models import User

from django import forms # 상속
from .models import User, UsersAppUser


# 회원가입 폼 : 빌트인 폼 
# UserCreationForm 상속
class CustomUserCreationForm(UserCreationForm):
    class Meta:
        model = get_user_model()

        # fields = ('username', 'email', 'user_name', 'user_phone', 'user_address',)
        fields = ('username', 'email',)

        labels = {
            'username': '아이디',
            'email': '이메일',
            # 'user_name': '성명',
            # 'user_phone': '전화번호',
            # 'user_address': '주소',
        }
        


# 커스텀
class UserForm(forms.ModelForm):
    class Meta:
        model = User

        fields = (
            'username',
            'password',
            'email',
            # 'user_name',
            # 'user_phone',
            # 'user_address',
        )

        labels = {
            'username' : '아이디',
            'password' : '비밀번호',
            'email' : '이메일',
            # 'user_name' : '성명',
            # 'user_phone' : '전화번호',
            # 'user_address' : '주소',
        }
        
        
class UserInfoForm(forms.ModelForm):

    class Meta:
        model = UsersAppUser
        
        fields = (
            # 'profile_image'
            # 'username',
            'email',                     
            # 'user_name',
            # 'user_phone',
            # 'user_address',
        )

        labels = {
            # 'profile_image':'프로필 이미지'
            # 'username':'아이디',
            'email':'이메일',            
            # 'user_name':'성명',
            # 'user_phone':'전화번호',
            # 'user_address':'주소',
        }


class UserInfoForm_custom(forms.ModelForm):

    class Meta:
        model = UsersAppUser
        
        fields = (
            'email',                     
            # 'user_name',
            # 'user_phone',
            # 'user_address',
            # 'profile_image',
        )

        labels = {            
            'email':'이메일',            
            # 'user_name':'성명',
            # 'user_phone':'전화번호',
            # 'user_address':'주소',
            # 'profile_image':'프로필 이미지',
        }

