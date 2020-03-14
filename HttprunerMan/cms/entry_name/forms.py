from cms.entry_name.models import ProjectInfo
from django import forms
from cms.error import Basserrors#导入错误整理的方法
from cms.froms import FormMixin
from django.core import validators

class Cms_projectInfo(forms.ModelForm,FormMixin):
    class Meta:
        model=ProjectInfo
        exclude=["user","data_time","updata_time","all_use"]
        error_messages={
            "project_name":{
                "required":"项目名称不能为空",
                "invalid":"您输入的项目名称已存在!",
                "max_length":"输入项目名称最长为50字符串",
            },
            "responsible_name":{
                "required":"项目负责人不能为空",
                "max_length":"输入项目负责人名称最长为20字符串",
            },
            "test_user": {
                "required": "测试人员不能为空",
                "max_length": "输入测试人员名称最长为20字符串",
            },
            "dev_user": {
                "required": "开发人员不能为空",
                "max_length": "输入开发人员名称最长为20字符串",
            },
            "publish_app": {
                "required": "发布应用不能为空",
                "max_length": "输入发布应用名称最长为20字符串",
            },
            "simple_desc": {
                "required": "描述不能为空",
                "max_length": "输入描述信息最长为100字符串",
            },
            "other_desc": {
                "required": "其他信息不能为空",
                "max_length": "输入其他信息最长为100字符串",
            },
        }