from rest_framework import serializers#导入序列化模块
from cms.request_mode.models import operation_information
from cms.use_case.serializers import UsecaseSerializer

class operation_informationSerializer(serializers.ModelSerializer):
    use=UsecaseSerializer()
    class Meta:
        model = operation_information
        fields = ('id','information','result','dy_value','use')