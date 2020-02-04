#我们如果做序列化，一定要在我们在序列化的app里创建一个python文件写序列化

from rest_framework import serializers#导入序列化模块
from cms.use_case.models import Usecase
from cms.module_name.serializers import ModuleInfoSerializer

class UsecaseSerializer(serializers.ModelSerializer):#定义的类一定要继承serializers.ModelSerializer
    #module=ModuleInfoSerializer()
    class Meta:
        model = Usecase
        fields = ('id','case_name','case_order','req')