from django.shortcuts import render,redirect,reverse
from django.contrib.auth import login,logout,authenticate
from django.views.decorators.http import require_POST,require_GET
# Create your views here.
from .forms import LoginForm
from django.http import JsonResponse,HttpResponse
from django.views.generic import View
from cms.cms_user.models import User
from requests_stats import restful#导入方法，这样就可以调用def定义f方法
from django.core.cache import cache
from django.contrib.auth import get_user_model
User=get_user_model()#把get_user_model()给予User
from cms.decorators import get_required,post_required#导入装饰器
from django.utils.decorators import method_decorator#导入给视图进行装饰的模块
import base64
from celery_tasks.tasks import run_multiple_use_cases

#登录视图
class Login_view(View):
    def get(self,request,*args,**kwargs):
        return render(request,"cms/login.html")
    def post(self,request,*args,**kwargs):
        form = LoginForm(request.POST)
        if form.is_valid():
            telephone = form.cleaned_data.get("telephone")
            password = form.cleaned_data.get("password")
            pwd=base64.b64decode(password).decode("utf-8")
            remember = form.cleaned_data.get("remember")
            user = authenticate(request, username=telephone, password=pwd)
            if user:  # 判断这个用户是否存在，如果存在执行下面代码
                if user.is_active:  # 判断这个用户是否可以使用，可以使用执行下面代码
                    login(request, user)  # 可以就进行登录，这个是设置session
                    if remember:  # 判断remember是否为勾选，勾选执行下面代码
                        request.session.set_expiry(None)  # session保存浏览器时间为django设置的时间长度
                    else:  # 没有勾选执行下面代码
                        request.session.set_expiry(0)  # 这里意思是浏览器关闭session就会随浏览器关闭而不保持
                    return restful.result(message="登录成功")
                else:  # 用户不使用执行下面代码
                    return restful.unauth(message="您的账号已被冻结")  # 405状态是没有权限
            else:
                return restful.params_error(message={"password": ["您输入的账号或密码错误"]})

        else:
            errors = form.get_errors()  # 400错误是参数错误
            # 返回数据类型如:{"password":["xxxx","xxxx"]}
            return restful.params_error(message=errors)  # 调用restful模板定义的def方法


#退出登录视图
class Logout_view(View):
    def get(self,request,*args,**kwargs):
        return render(request,"cms/login.html")
    def post(self,request,*args,**kwargs):
        logout(request)  # 退出登录 logout(request)
        return restful.result(message="退出成功")

@get_required
@require_GET#首页视图
def index(request):
    return redirect(reverse("cms:index"))