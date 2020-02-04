from django.db import models
from cms.cms_user.models import User
from django.core import validators
# Create your models here.


class ProjectInfo(models.Model):#项目名称orm模型
    class Meta:
        db_table = 'ProjectInfo'
        ordering=["data_time"]

    project_name = models.CharField('项目名称', max_length=50,null=False)
    responsible_name = models.CharField('负责人', max_length=20, null=False)
    test_user = models.CharField('测试人员', max_length=20, null=False)
    dev_user = models.CharField('开发人员', max_length=20, null=False)
    all_use=models.CharField('关联模块/用例总数',max_length=20,default="0/0")
    publish_app = models.CharField('发布应用', max_length=20, null=False)
    simple_desc = models.CharField('简要描述', max_length=100, null=True)
    other_desc = models.CharField('其他信息', max_length=100, null=True)
    data_time=models.DateTimeField(auto_now_add=True)
    updata_time = models.DateTimeField(auto_now=True)
    user=models.ForeignKey(User,on_delete=models.CASCADE,related_name="ProjectInfo")#关联用户表，一对多关系
