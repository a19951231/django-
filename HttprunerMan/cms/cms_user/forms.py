from django import forms
from cms.froms import FormMixin
from django.core import validators
#创建表单
class LoginForm(forms.Form,FormMixin):
    telephone=forms.CharField(max_length=11,min_length=11,validators=[validators.RegexValidator(r"1[38967]\d{9}",message="请输入正确格式的电话号码")],error_messages={"max_length":"电话号码最多不能超过11个字符","min_length":"电话号码最小不能小于11位","required":"电话号码不能为空"})
    password=forms.CharField(max_length=16,min_length=6,error_messages={"max_length":"密码最多不能超过16个字符","min_length":"密码最小不能小于6位","required":"您输入的密码为空","invalid":"你输入的密码错"})
    remember=forms.IntegerField(required=False)



