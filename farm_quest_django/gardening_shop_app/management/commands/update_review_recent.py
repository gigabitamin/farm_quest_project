from konlpy.tag import Okt
from joblib import load
from django.core.management.base import BaseCommand
from gardening_shop_app.models import ShoppingReview
import os

# 여기에 함수를 추가합니다
okt = Okt()
def tokenize_korean_text(text):
    return okt.morphs(text)

class Command(BaseCommand):
    help = 'Update the latest shopping review prediction'

    def handle(self, *args, **kwargs):
        # 현재 스크립트 파일의 디렉토리 위치를 기준으로 상대 경로 설정
        current_dir = os.path.dirname(__file__)
        tfidf_vectorizer_path = os.path.join(current_dir, '../../../gardening_shop_app/tfidf_vectorizer.pkl')
        model_path = os.path.join(current_dir, '../../../gardening_shop_app/logistic_regression_model.pkl')

        # 모델 로드
        tfidf_vectorizer = load(tfidf_vectorizer_path)
        model = load(model_path)

        # 가장 최근 리뷰 불러오기
        latest_review = ShoppingReview.objects.all().order_by('-shopping_review_no').first()

        if latest_review:
            # 리뷰 내용을 통한 예측
            transformed_review = tfidf_vectorizer.transform([latest_review.shopping_review_content])
            latest_review.shopping_review_predict = model.predict(transformed_review)[0]
            latest_review.shopping_review_predict_rate = model.predict_proba(transformed_review)[0, 1]

            # 데이터베이스 업데이트
            latest_review.save()

            self.stdout.write(self.style.SUCCESS('Successfully updated the latest shopping review prediction'))
