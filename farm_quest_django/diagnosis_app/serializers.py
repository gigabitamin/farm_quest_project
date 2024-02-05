from requests import Response
from rest_framework import serializers
from community_app.serializers import UserInfoSerializer
from .models import DiagnosisItemCart, DiagnosisResult, DiagnosisQuestion, DiagnosisQuestionHistory, PlantTb, SolutionTb, DiagnosisShopingTb
from gardening_shop_app.models import ShopingTb
from users_app.models import UsersAppUser 

class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = UsersAppUser
        fields = [
            "id",
            "username"
        ]

class DiagnosisItemCartSerializer(serializers.ModelSerializer):
    user = UserInfoSerializer(read_only=True)
    class Meta:
        model = DiagnosisItemCart
        fields = [
            "diagnosis_item_cart_id",
            "diagnosis_item_cart_list",
            "user"
        ]        

class PlantTbSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlantTb
        fields = '__all__'
        

class DiagnosisShopingTbSerializer(serializers.ModelSerializer):
    shoping_tb_no = serializers.IntegerField() 

    class Meta:
        model = DiagnosisShopingTb
        fields = '__all__'
    
class ShopingTbSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShopingTb
        fields = '__all__' 


class DiagnosisResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = DiagnosisResult
        fields = '__all__'
        
    def create(self, validated_data):
            # 여기에서는 객체를 생성만 하고 저장하지 않음
            instance = DiagnosisResult(**validated_data)
            return instance 

class DiagnosisQuestionHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = DiagnosisQuestionHistory
        fields = '__all__'

    def create(self, validated_data):
        # 각각의 질문에 대한 답변을 validated_data에서 추출
        question_answers = {}
        for i in range(1, 11):
            key = f"diagnosis_question_{i}"
            if key in validated_data:
                question_answers[key] = validated_data.pop(key)
            else:
                # 특정 키가 없을 경우 기본값으로 null 또는 원하는 값을 설정
                question_answers[key] = None

        # 나머지 부분은 원래의 create 메서드 수행
        instance = DiagnosisQuestionHistory.objects.create(**validated_data, **question_answers)
        return instance


class DiagnosisQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = DiagnosisQuestion
        fields = [
            'diagnosis_question_no',
            'diagnosis_question_content',
        ]
        
class PlantSerializer(serializers.ModelSerializer):
    class Meta:
        model =  PlantTb
        fields = [
            'plant_no',
            'plant_name',
            'plant_main_img',
            'plant_content',
        ]
        
class SolutionTbSerializer(serializers.ModelSerializer):
    class Meta:
        model = SolutionTb
        fields = '__all__'

    def to_representation(self, instance):
        data = super().to_representation(instance)        
        data = {key: value[1] if isinstance(value, tuple) else value for key, value in data.items()}
        return data