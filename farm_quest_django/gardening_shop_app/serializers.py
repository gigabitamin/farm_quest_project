from rest_framework import serializers
from .models import ShopingTb

class ShopingTbSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShopingTb
        fields = '__all__'  # 필요한 경우 특정 필드만 지정할 수 있습니다.
