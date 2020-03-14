from django.shortcuts import render,redirect,reverse
from django.views.decorators.http import require_GET,require_POST
from cms.cms_user.models import User
from requests_stats import restful
from cms.other_functions.serializers import UserSerializer
from cms.decorators import get_required,post_required#导入装饰器
from django.contrib.auth import login,logout,authenticate
from django.contrib.auth import get_user_model
User1=get_user_model()#把get_user_model()给予User

# Create your views here.
@get_required
@require_GET
def user_functions(request):
    id = request.session.get("_auth_user_id")
    if id:
        return render(request, "information/user_information.html")
    else:
        return restful.unauth(message="无sessionid，请重新登录")

@get_required
@require_GET
def user_list(request):
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
def change_password(request):
    return render(request,"change_password/change_password.html")

@post_required
@require_POST
def post_password(request):
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
        user1 = user.check_password(password)
        if user1:
            if password1==password2:
                user.set_password(password1)
                user.save()
                logout(request)
                return restful.result(message="修改密码成功！")
            else:
                return restful.unauth(message="新密码和确认密码不一致！")
        else:
            return restful.unauth(message="始初密码输入不正确！")



