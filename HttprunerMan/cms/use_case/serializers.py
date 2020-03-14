from rest_framework import serializers#导入序列化模块
from cms.use_case.models import Usecase


class UsecaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usecase
        fields = ('id','case_name','case_order','req')