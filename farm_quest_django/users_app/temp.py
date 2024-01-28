import base64
from PIL import Image
from io import BytesIO
from django.db import models

class YourModel(models.Model):
    # 다른 필드들...
    image_blob = models.BinaryField()


# blob을 이미지로 변환하여 표시하는 함수
def display_image_from_blob(model_instance):
    image_blob = model_instance.image_blob
    if image_blob:
        image_data = base64.b64encode(image_blob).decode('utf-8')
        image = Image.open(BytesIO(base64.b64decode(image_data)))
        image.show()


# 모델 인스턴스를 얻고 이미지 표시 예제
model_instance = User.objects.first()
display_image_from_blob(model_instance)
