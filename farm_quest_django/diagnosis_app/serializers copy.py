from rest_framework import serializers
from .models import DiagnosisResult, DiagnosisQuestion, DiagnosisQuestionHistory, PlantTb, SolutionTb



class DiagnosisResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = DiagnosisResult
        fields = '__all__'

    def create(self, validated_data):
        # user_select_plant 값 추출
        user_select_plant_data = validated_data.pop('user_select_plant', None)

        # user_select_plant에 해당하는 객체 가져오기
        user_select_plant_instance = user_select_plant_data

        # 나머지 필드에 대한 기본값 또는 원하는 값 지정
        defaults = {
            'boxes': None,
            'keypoints': None,
            'masks': None,
            'names': None,
            'orig_shape': None,
            'path': None,
            'probs': None,
            'save_dir': None,
            'speed': None,
        }

        # user_select_plant에 객체 할당하고 나머지 필드는 디폴트값으로 생성
        instance = DiagnosisResult.objects.create(user_select_plant=user_select_plant_instance, **defaults)

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