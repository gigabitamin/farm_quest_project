from rest_framework import serializers
from .models import DiagnosisResult, DiagnosisQuestion, DiagnosisQuestionHistory, PlantTb, SolutionTb


class DiagnosisResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = DiagnosisResult
        fields = '__all__'
        
    def create(self, validated_data):
        # id 값을 validated_data에서 제거
        # id_value = validated_data.pop('id', None)

        # DiagnosisResult 모델의 모든 필드에 대해 반복
        diagnosis_results = {}
        for field in DiagnosisResult._meta.fields:
            if field.name != 'id':  # primary key 필드인 id는 제외
                key = field.name
                if key in validated_data:
                    diagnosis_results[key] = validated_data.pop(key)
                else:
                    # 특정 키가 없을 경우 기본값으로 null 또는 원하는 값을 설정
                    diagnosis_results[key] = None

        # 나머지 부분은 원래의 create 메서드 수행
        instance = DiagnosisResult.objects.create(**validated_data, **diagnosis_results)
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
        
class SolutionSerializer(serializers.ModelSerializer):
    class Meta:
        model = SolutionTb
        fields = [
            'diagnosis_history_no',
            'diagnosis_history_content',
            'user_plant_no',
            'solution_id',
        ]            