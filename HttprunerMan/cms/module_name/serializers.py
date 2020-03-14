from rest_framework import serializers#导入序列化模块
from cms.module_name.models import ModuleInfo
from cms.entry_name.serializers import ProjectInfoSerializer

class ModuleInfoSerializer(serializers.ModelSerializer):
    belong_project=ProjectInfoSerializer()
    class Meta:
        model = ModuleInfo
        fields = ('id','module_name','module_order','belong_project')