from cms.module_name.models import ModuleInfo
from django import forms
from cms.error import Basserrors#导入错误整理的方法
from django.core import validators

class Cms_Moudle(Basserrors):#定义项目名称创建的表单验证
    class Meta:
        model=ModuleInfo
        exclude=["user"]
        error_messages={
            "belong_project":{
                "required": "关联项目不能为空",
                "invalid": "您输入的关联项目名称id不存在",
            },
            "module_name":{
                "required":"模块名称不能为空",
                "invalid":"您输入的模块名称已存在!",
                "max_length":"输入项目名称最长为50字符串",
            },
            "test_user": {
                "required": "测试人员不能为空",
                "max_length": "输入测试人员名称最长为20字符串",
            },
            "simple_desc": {
                "max_length": "输入描述信息最长为100字符串",
            },
            "other_desc": {
                "max_length": "输入其他信息最长为100字符串",
            },
            "module_order":{
                "max_length": "输入运行顺序最长为2个字符串",
                "required": "运行顺序不能为空!",
                "invalid": "运行顺序只能输入整数!",
            }
        }