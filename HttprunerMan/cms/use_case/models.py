from django.db import models
from cms.module_name.models import ModuleInfo
from cms.url_configuration.models import Urlconfiguratin
from cms.cms_user.models import User
from django.core import validators#验证器
# Create your models here.
class Usecase(models.Model):#用例orm模型
    case_name=models.CharField(max_length=20)#用例名称
    case_url=models.CharField(max_length=200)#url链接
    case_order=models.PositiveIntegerField(validators=[validators.MaxValueValidator(limit_value=999)])#运行顺序
    module=models.ForeignKey(ModuleInfo,on_delete=models.PROTECT,name="usecase")#关联的模块
    url_con=models.ForeignKey(Urlconfiguratin,on_delete=models.SET_DEFAULT,name="use_case1",null=True,default="null")#关联的环境
    req=models.CharField(max_length=10,default="GET")#请求方式
    header_key=models.TextField(null=True)#储蓄信息头的所有key值
    header_value=models.TextField(null=True)#储蓄信息头的v所有value值
    value_type=models.CharField(max_length=10,default="form-data")#传参类型
    data_key=models.TextField(null=True)#储蓄传参的所有key值
    data_type=models.TextField(null=True)#储蓄提交的value值类型
    data_value=models.TextField(null=True)#获取参数的所有value值
    json_keyvalue=models.TextField(null=True)#储蓄json格式参数
    dy_key=models.TextField(null=True)#储蓄断言的所有key
    dy_type=models.TextField(null=True)#储蓄断言的类型
    dy_value=models.TextField(null=True)#储蓄断言的所有value
    all_extract=models.TextField(null=True)#储蓄所有提取值
    describe=models.CharField(max_length=100,null=True)#描述
    state=models.CharField(max_length=50,null=True,default="-")#运行结果
    all_extract_state=models.TextField(null=True)#储蓄所有提取值的真正结果
    data_time = models.DateTimeField(auto_now_add=True)
    updata_time = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, name="use_case")  # 关联用户表，一对多关系
    class Meta:
        db_table = 'usecase'
        ordering = ["-data_time"]

