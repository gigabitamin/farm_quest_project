import os
import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'farm_quest_django.settings')
django.setup()

from gardening_shop_app.ml_model import ReviewPredictor

# 테스트를 위한 인스턴스 생성
predictor = ReviewPredictor()

# 샘플 리뷰 텍스트
sample_review = "여기에 테스트할 리뷰 텍스트를 입력하세요"

# 예측 수행
predicted_label, predicted_probability = predictor.predict_review(sample_review)

# 결과 출력
print(f"Predicted Label: {predicted_label}, Predicted Probability: {predicted_probability}")
