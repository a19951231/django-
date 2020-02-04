#我们如果做序列化，一定要在我们在序列化的app里创建一个python文件写序列化

from rest_framework import serializers#导入序列化模块
from cms.request_mode.models import operation_information
from cms.use_case.serializers import UsecaseSerializer

class operation_informationSerializer(serializers.ModelSerializer):#定义的类一定要继承serializers.ModelSerializer
    use=UsecaseSerializer()
    class Meta:
        model = operation_information
        fields = ('id','information','result','dy_value','use')