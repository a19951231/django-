#我们如果做序列化，一定要在我们在序列化的app里创建一个python文件写序列化

from rest_framework import serializers#导入序列化模块
from cms.module_name.models import ModuleInfo
from cms.entry_name.serializers import ProjectInfoSerializer

class ModuleInfoSerializer(serializers.ModelSerializer):#定义的类一定要继承serializers.ModelSerializer
    belong_project=ProjectInfoSerializer()
    class Meta:
        model = ModuleInfo
        fields = ('id','module_name','module_order','belong_project')