from django.db import models
from cms.cms_user.models import User

# Create your models here.
class Urlconfiguratin(models.Model):#环境配置
    class Meta:
        db_table = 'urlconfiguratin'
        ordering = ["-data_time"]
    host_url=models.URLField()
    host_name=models.CharField(max_length=20,null=False)
    describe=models.CharField(max_length=100,null=True)
    data_time = models.DateTimeField(auto_now_add=True)
    updata_time = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="urlconfiguratin")  # 关联用户表，一对多关系

