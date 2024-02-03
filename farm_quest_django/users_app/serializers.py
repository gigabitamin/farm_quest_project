# from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth import authenticate 
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from rest_framework.authtoken.models import Token
from .models import Profile
from .models import User

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 
                  'password', 
                  'password2', 
                  'email', 
                  'nickname', 
                  'user_name', 
                  'phone_number', 
                  'address'
                  )

class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())],
    )
    password = serializers.CharField(
        write_only=True,
        required=True,
        validators=[validate_password],
    )    
    password2 = serializers.CharField(write_only=True, required=True)  
      
    nickname = serializers.CharField(required=True)
    user_name = serializers.CharField(required=True)
    phone_number = serializers.CharField(required=True)
    address = serializers.CharField(required=True)
    
    class Meta:
        model = User
        fields = ('username', 
                  'password', 
                  'password2', 
                  'email', 
                  'nickname', 
                  'user_name', 
                  'phone_number', 
                  'address')
                
    def validate(self, data):        
        if data['password'] != data['password2']:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."})        
        return data

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            nickname=validated_data['nickname'], 
            user_name=validated_data['user_name'], 
            phone_number=validated_data['phone_number'], 
            address=validated_data['address'],
        )
        print('왜 안돼4')
        user.set_password(validated_data['password'])
        user.save()
        token = Token.objects.create(user=user)
        return user

class UserSerializers(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 
                  'username', 
                  'email', 
                  'nickname', 
                  'user_name', 
                  'phone_number', 
                  'address']

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True, write_only=True)

    def validate(self, data):
        user = authenticate(**data)    
        if user:
            token = Token.objects.get(user=user)            
            serialized_user = UserSerializers(user).data
            return token, serialized_user
        raise serializers.ValidationError(
            {"error": "Unable to log in with provided credentials."})

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ("nickname", 
                  "user_name", 
                  "phone_number", 
                  "address", 
                  "profile_image")
        # extra_kwargs = {"image": {"required": False, "allow_null": True}}
