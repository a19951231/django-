from .models import Urlconfiguratin
from django import forms
from cms.error import Basserrors#导入错误整理的方法
from cms.froms import FormMixin



class Cms_url(forms.ModelForm,FormMixin):#环境配置的表单
    host_url=forms.URLField(error_messages={"invalid":"请输入正确的url格式！","required":"请输入环境配置的url！"})
    host_name=forms.CharField(max_length=20,error_messages={"required":"请输入环境配置名称！","max_length":"最大输入长度为20字符串!"})
    describe=forms.CharField(max_length=100,error_messages={"max_length":"最大输入长度为100字符串!","required": "描述不能为空!",})
    class Meta:
        model=Urlconfiguratin
        exclude=["data_time","updata_time","user"]
        error_messages = {  # 异常处理，先在error_messages字典里遍历异常提示
            'host_url': {
                "required": "请输入环境配置的url！",
                "invalid": "请输入正确的url!",
                "max_length":"输入的url长度不能超过200字符串!",
            },
            "host_name": {
                "max_length": "环境配置名称不能超过20个字符串！"
            },
            "describe": {
                "required": "描述不能为空!",
                "max_length": "描述不能超过100字符串!",
            }
        }


