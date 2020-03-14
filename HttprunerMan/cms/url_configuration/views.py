from django.shortcuts import render
from .models import Urlconfiguratin
from django.views.decorators.http import require_GET,require_POST
import time
from cms.cms_user.models import User
from cms.decorators import get_required,post_required#导入装饰器
from requests_stats import restful#导入方法，这样就可以调用def定义f方法
from .forms import Cms_url
# Create your views here.

@get_required
@require_GET
def url_pz(request):
    id = request.session.get("_auth_user_id")
    url = Urlconfiguratin.objects.filter(user_id=id).order_by("-data_time")
    if id:
        context = {
            "url": url,
        }
        return render(request, "url_configuration/url_configuration.html", context=context)
    else:
        context = {

        }
        return render(request, "url_configuration/url_configuration.html", context=context)

@post_required
@require_POST
def add_url(request):#添加环境视图
    form= Cms_url(request.POST)
    if form.is_valid():
        host_name=form.cleaned_data.get("host_name")
        host_url=form.cleaned_data.get("host_url")
        describe=form.cleaned_data.get("describe")
        id = request.session.get("_auth_user_id")
        a = request.session.keys()
        user_id = User.objects.filter(pk=id).exists()
        if user_id:
            confirm = Urlconfiguratin.objects.filter(host_name=host_name).exists()
            if confirm:
                return restful.unauth(message="此环境名称已存在！")
            else:
                url= Urlconfiguratin(host_name=host_name,
                                   host_url=host_url, describe=describe)
                url.user_id = id
                url.save()
                return restful.result(message="添加环境成功！")
    else:
        errors = form.get_errors()
        return restful.params_error(message=errors)

@post_required
@require_POST
def delete_url(request):
    id=request.POST.get("id")
    if id:
        url_id=Urlconfiguratin.objects.get(pk=id)
        url_id1=url_id.usecase_set.all()
        if url_id1:
            return restful.params_error(message="此环境已被其他用例关联，不能删除！")
        else:
            print("我已执行")
            if url_id:
                url_id.delete()
                print("====已执行====")
                return restful.result(message="删除环境成功！")
            else:
                return restful.unauth(message="该id不存在!")
    else:
        return restful.unauth(message="请输入环境id!")

@post_required
@require_POST
def edit_url(request):
    id=request.POST.get("id")
    if id:
        form = Cms_url(request.POST)
        if form.is_valid():
            print("我已经执行6")
            host_name = form.cleaned_data.get("host_name")
            host_url = form.cleaned_data.get("host_url")
            describe = form.cleaned_data.get("describe")
            url_id = Urlconfiguratin.objects.filter(pk=id)
            if url_id:
                confirm = Urlconfiguratin.objects.filter(host_name=host_name).exclude(id=id).exists()
                print("===我已执行==")
                if confirm:
                    return restful.unauth(message="您输入的环境名称已存在！")
                else:
                    print("===执行不存在的项目=")
                    url_id1= url_id.update(id=id,host_name=host_name,
                                        host_url=host_url,describe=describe)
                    return restful.result(message="编辑环境配置成功！")
            else:
                return restful.unauth(message="您输入id不存在！")
        else:
            print("我已经执行8")
            errors = form.get_errors()
            return restful.params_error(message=errors)
    else:
        return restful.unauth(message="id号不能为空")