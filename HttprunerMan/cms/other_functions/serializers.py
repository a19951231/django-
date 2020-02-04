#我们如果做序列化，一定要在我们在序列化的app里创建一个python文件写序列化

from rest_framework import serializers#导入序列化模块
from cms.cms_user.models import User

class UserSerializer(serializers.ModelSerializer):#定义的类一定要继承serializers.ModelSerializer
    class Meta:
        model = User
        fields = ('uid','telephone','username','email','is_staff','is_active','entry_name')