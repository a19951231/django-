from django.shortcuts import render,redirect,reverse
from django.views.decorators.http import require_GET,require_POST
from cms.cms_user.models import User
from requests_stats import restful#导入方法，这样就可以调用def定义f方法
from cms.other_functions.serializers import UserSerializer#导入序列化好的模块
from cms.decorators import get_required,post_required#导入装饰器
from django.utils.decorators import method_decorator#导入给视图进行装饰的模块
from django.contrib.auth import login,logout,authenticate
from django.contrib.auth import get_user_model
User1=get_user_model()#把get_user_model()给予User

# Create your views here.
@get_required
@require_GET
def user_functions(request):#用户信息视图
    id = request.session.get("_auth_user_id")
    if id:
        return render(request, "information/user_information.html")
    else:
        return restful.unauth(message="无sessionid，请重新登录")

@get_required
@require_GET
def user_list(request):#返回用户信息视图
    id= request.session.get("_auth_user_id")
    if id:
        user=User.objects.filter(pk=id)
        serializers=UserSerializer(user,many=True)
        data=serializers.data
        return restful.result(data=data,message="成功")
    else:
        return restful.unauth(message="无sessionid，请重新登录")

@get_required
@require_GET
def change_password(request):#打开修改密码页面
    return render(request,"change_password/change_password.html")

@post_required
@require_POST
def post_password(request):#修改密码视图
    password=request.POST.get("password")
    password1 = request.POST.get("password1")
    password2 = request.POST.get("password2")
    if not password:
        return restful.unauth(message="开始密码不能为空！")
    if not password1 or not password2:
        return restful.unauth(message="新密码或确认密码不能为空！")
    if password and password1 and password2:
        id = request.session.get("_auth_user_id")
        user=User.objects.get(pk=id)
        print(user.telephone)
        user1 = user.check_password(password)#check_password检查加密的密码
        if user1:#正确执行下面代码
            if password1==password2:
                user.set_password(password1)  # 然后使用set_password()对密码进行修改，为什么使用set_password()方法对密码进行修改，不直接user.password()进行修改？
                # 因为密码是经过哈希后才传入数据库的，所以需要使用django的set_password()方法进行修改密码才可以传入到数据库
                user.save()  # 进行写入数据库
                logout(request)
                return restful.result(message="修改密码成功！")
            else:
                return restful.unauth(message="新密码和确认密码不一致！")
        else:
            return restful.unauth(message="始初密码输入不正确！")



