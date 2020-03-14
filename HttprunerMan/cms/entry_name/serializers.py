from rest_framework import serializers#导入序列化模块
from cms.entry_name.models import ProjectInfo

class ProjectInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectInfo
        fields = ('id','project_name')