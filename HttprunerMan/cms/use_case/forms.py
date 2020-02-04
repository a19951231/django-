from cms.froms import FormMixin1,FormMixin
from cms.use_case.models import Usecase
from django.core import validators
from cms.error import Basserrors
from django import forms

class Cms_use(Basserrors,forms.ModelForm):#表单验证
    #describe = forms.CharField(max_length=100, error_messages={"max_length": "用例描述最大长度为100字符串！"})  # 描述
    class Meta:
        model =Usecase
        fields =["case_name","case_url","case_order","req"]
        error_messages = {
            "case_name":{
                "required": "用例名称不能为空！",
                "max_length": "用例名称不能超过20字符串",
            },
            "case_url":{
                "required": "用例名url不能为空！",
                "max_length": "用例url不能超过200字符串",
            },
            "case_order":{
                "required": "用例运行顺序不能为空！",
                "max_length": "用例运行顺序不能超过3字符串",
                "invalid": "用例运行顺序只能输入整数！",
            },
            "req":{
                "max_length": "请求方式最大长度为10字符串！",
            },
        }
