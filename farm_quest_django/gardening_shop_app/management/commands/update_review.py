from konlpy.tag import Okt
from joblib import load
from django.core.management.base import BaseCommand
from gardening_shop_app.models import ShoppingReview
import os
import pandas as pd

# 여기에 함수를 추가합니다
okt = Okt()
def tokenize_korean_text(text):
    return okt.morphs(text)

class Command(BaseCommand):
    help = 'Update shopping review predictions'

    def handle(self, *args, **kwargs):
        # 현재 스크립트 파일의 디렉토리 위치를 기준으로 상대 경로 설정
        current_dir = os.path.dirname(__file__)
        tfidf_vectorizer_path = os.path.join(current_dir, '../../../gardening_shop_app/tfidf_vectorizer.pkl')
        model_path = os.path.join(current_dir, '../../../gardening_shop_app/logistic_regression_model.pkl')

        # 모델 로드
        tfidf_vectorizer = load(tfidf_vectorizer_path)
        model = load(model_path)

        # 모든 리뷰 불러오기
        reviews = ShoppingReview.objects.all()

        # 리뷰 데이터를 위한 DataFrame 생성
        df = pd.DataFrame(list(reviews.values('shopping_review_no', 'shopping_review_content')))

        # 모델을 사용하여 예측
        if not df.empty:
            transformed_reviews = tfidf_vectorizer.transform(df['shopping_review_content'])
            df['shopping_review_predict'] = model.predict(transformed_reviews)
            df['shopping_review_predict_rate'] = model.predict_proba(transformed_reviews)[:, 1]

        # 데이터베이스 업데이트
        for _, row in df.iterrows():
            review = reviews.get(shopping_review_no=row['shopping_review_no'])
            review.shopping_review_predict = row['shopping_review_predict']
            review.shopping_review_predict_rate = row['shopping_review_predict_rate']
            review.save()

        self.stdout.write(self.style.SUCCESS('Successfully updated shopping review predictions'))
