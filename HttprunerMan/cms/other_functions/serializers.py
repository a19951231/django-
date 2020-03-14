from rest_framework import serializers#导入序列化模块
from cms.cms_user.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('uid','telephone','username','email','is_staff','is_active','entry_name')