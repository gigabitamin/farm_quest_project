# 회원가입 로그인

import statistics
from urllib import response
from django.http import JsonResponse
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import login, logout, authenticate
from .models import User, UsersAppUser
from .forms import CustomUserCreationForm, UserForm, UserInfoForm

# 마이페이지
# 로그인 관련
from imaplib import _Authenticator
from django.views.generic.edit import DeleteView
from django.contrib.auth.decorators import login_required
# from django.contrib.auth.models import User
from django.contrib.auth.signals import user_logged_in
from django.conf import settings


# 기타
from datetime import datetime, timedelta
from django.shortcuts import get_object_or_404, render, redirect

# DRF
from rest_framework import generics, status
from rest_framework.response import Response
from .serializers import CustomUserSerializer, RegisterSerializer, LoginSerializer, ProfileSerializer, UserSerializers
from .models import Profile

# 리액트 로그인 관련
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from .serializers import RegisterSerializer, LoginSerializer, ProfileSerializer
from .models import Profile

from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework.authtoken.models import Token
from django.contrib.auth.mixins import LoginRequiredMixin

import base64
from django.views import View
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly



from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication



class UserProfileDeleteView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        print('hi')
        user = request.user
        print('hi2')
        user.delete()
        print('hi3')
        return Response({"message": "탈퇴 성공"}, status=status.HTTP_204_NO_CONTENT)


class ProfileImageView(View):
    def get(self, request, pk):
        print('hi1')
        try:
            print('hi2')
            profile = User.objects.get(id=pk)
            print('profiel = ', profile)
            if profile.profile_image:
                print('hi3')
                image_data = base64.b64encode(profile.profile_image).decode('utf-8')
                print('hi4', image_data)
                return JsonResponse({'image_data': image_data})
            else:
                return JsonResponse({'error': '이미지 없다'})
        except User.DoesNotExist:
            return JsonResponse({'error': '없어'})


class ProfileView(generics.RetrieveUpdateAPIView):    
    queryset = User.objects.all()
    serializer_class = ProfileSerializer


@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def login_check(request):    
    token = request.data.get('token', None)
    print('token = ', token)

    if token:        
        try:
            token_obj = Token.objects.get(key=token)
            print('token_obj = ', token_obj)
        except Token.DoesNotExist:
            return Response({'error': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)
        
        user = token_obj.user
        print('user = ', user)
        user_context = {'id': user.id, 'username':user.username}
        print('user_context = ', user_context)
        return Response(user_context, status=status.HTTP_200_OK)

    return Response({'error': 'Token not provided'}, status=status.HTTP_400_BAD_REQUEST)



class UserInfoView(generics.RetrieveAPIView):
    serializer_class = CustomUserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer


class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        token, serialized_user = serializer.validated_data
        
        return Response({"token": token.key, 'user': serialized_user}, status=status.HTTP_200_OK)





# 리액트 연동
def sign_in2(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)       
            
    # 로그인신호 psh            
            # update_last_login(sender=None, user=user, request=request)
            print(f"update_last_login called for user: {user.username}")

            return JsonResponse({'message': '로그인 성공'})
        else:            
            return JsonResponse({'message': '로그인 실패'}, status=400)

# django
def sign_in(request):
    if request.method == 'POST':
        form = AuthenticationForm(request, request.POST)

        if form.is_valid():
            login(request, form.get_user())
            return redirect('index')

    else:
        form = AuthenticationForm()

    return render(request, 'users_app/sign_in.html', {'form':form})

def sign_out(request):
    logout(request)
    return redirect('index')

def sign_up(request):
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            login(request, form.save())
            return redirect('sign_in')
    else:
        form = CustomUserCreationForm()

    return render(request, 'users_app/sign_up.html', {'form':form})

def sign_up2(request):   
    if request.method == 'POST':
        
                
        email = request.POST['email']
        password = request.POST['password']
        username = request.POST['username']
        
        # user_name = request.POST['user_name']
        # user_phone = request.POST['user_phone']
        # user_address = request.POST['user_address']    

        user = UserForm(request.POST)
        # 매개변수는 3개만 전달 가능
        # 순서 주의 : username, email, password

        user = User.objects.create_user(username, email, password)
        # 3개 외 나머지는 별도로 추가
        # user.user_name = user_name
        # user.user_phone = user_phone
        # user.user_address = user_address        
            
        user.save()        

        return redirect('sign_in')
    
    else:
        form = UserForm()

    return render(request, 'users_app/sign_up2.html', {'form':form})


# 마이페이지
@login_required
def my_page(request):
    user_info = request.user  # 현재 로그인한 사용자
    return render(request, 'users_app/my_page.html', {'user_info' : user_info})


# 회원정보 수정
@login_required
def my_page_update(request, id):  
    user_info = get_object_or_404(UsersAppUser, pk=id)
    if request.method == "POST":
        user_form = UserInfoForm(request.POST, instance=user_info)
        if user_form.is_valid():
            user_info = user_form.save(commit=False)
            user_info.save()
            return redirect('index')
    else:
        user_form = UserInfoForm(instance=user_info)
    
    return render(request, 'users_app/my_page_update.html', {'user_form':user_form, 'user_info_update':user_info})


# 회원정보 탈퇴 페이지로 이동 후 회원정보 삭제
class MyPageDeleteView(DeleteView):
    model = UsersAppUser
    success_url = 'index'  # 회원 탈퇴 후 리디렉션할 URL

    # 'my_page_delete_confirm.html' 템플릿을 사용하도록 설정
    template_name = 'users_app/my_page_delete_confirm.html'

@login_required
def my_page_delete_move(request, id):
    user_info = get_object_or_404(UsersAppUser, pk=id)        
    return render(request, 'users_app/my_page_delete_confirm.html', {'user_info':user_info})

@login_required
def my_page_delete(request):
    if request.method == "POST":
        user = request.user  # 현재 로그인한 사용자
        user.delete()  # 사용자 정보 삭제
        return redirect('index')  # 탈퇴 후 리디렉션할 URL
    return render(request, 'users_app/my_page_delete_confirm.html')


# 마이페이지

def mypage(request):
    return render(request, 'users_app/mypages/mypage.html')

def user_plant_render(request):
    return render(request, 'users_app/mypages/user_plant.html')

def user_farmlog_render(request):
    return render(request, 'users_app/mypages/user_farmlog.html')

def user_QnA_render(request):
    return render(request, 'users_app/mypages/user_QnA.html')

def user_bookmark_render(request):
    return render(request, 'users_app/mypages/user_bookmark.html')

