from rest_framework import serializers#导入序列化模块
from cms.request_mode.models import operation_information

class Presentation(serializers.ModelSerializer):#定义的类一定要继承serializers.ModelSerializer
    class Meta:
        model = operation_information
        fields = ('id','information','result','data_time','function_time','use','user')
