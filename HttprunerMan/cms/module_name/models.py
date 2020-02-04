from django.db import models
from cms.cms_user.models import User
from cms.entry_name.models import ProjectInfo
# Create your models here.

class ModuleInfo(models.Model):#模块名称orm模型
    class Meta:
        db_table = 'ModuleInfo'
        ordering = ["-data_time"]

    module_name = models.CharField('模块名称', max_length=50, null=False)
    module_order=models.IntegerField('模块运行顺序',null=False)
    belong_project = models.ForeignKey(ProjectInfo, on_delete=models.PROTECT,related_name="moduleInfo")
    test_user = models.CharField('测试负责人', max_length=20, null=False)
    simple_desc = models.CharField('简要描述', max_length=100, null=True)
    other_desc = models.CharField('其他信息', max_length=100, null=True)
    data_time = models.DateTimeField(auto_now_add=True)
    updata_time = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="moduleInfo")  # 关联用户表，一对多关系
