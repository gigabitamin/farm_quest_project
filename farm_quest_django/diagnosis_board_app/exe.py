import os
import sys

# Django settings 모듈의 경로를 추가
sys.path.append('C:/FINAL_PROJECT/farm_quest_project/farm_quest_django')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'farm_quest_project.settings')

# Django 앱 초기화
import django
django.setup()

# 이제 모델을 import 할 수 있습니다.
from diagnosis_board_app.models import DiagnosisBoardTb



instance = DiagnosisBoardTb(thread_content='test1')
instance.save()
