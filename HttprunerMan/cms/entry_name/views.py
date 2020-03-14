from django.shortcuts import render
from cms.entry_name.forms import Cms_projectInfo#导入表单验证模块
from cms.cms_user.models import User#导入用户模型
from cms.entry_name.models import ProjectInfo#导入项目模型
from requests_stats import restful#导入方法，这样就可以调用def定义f方法
from django.views.decorators.http import require_POST
from cms.decorators import get_required,post_required#导入装饰器
from django.utils.decorators import method_decorator#导入给视图进行装饰的模块
from cms.use_case.models import Usecase#导入用例模型
from cms.request_mode.models import operation_information#导入储蓄用例
import time
from django.core.cache import cache#储蓄到内容的模块
from cms.module_name.models import ModuleInfo#导入模块模型
from cms.request_mode.req_mode import req_mode,header,assertion,get_value,read_req
from cms.use_case.views import reg,data
from django.db.models import Q,F,Avg,Count,Prefetch
from celery_tasks.tasks import run_multiple_use_cases
from cms.request_mode.serializers import operation_informationSerializer#序列化模块
from django.db import connection
# Create your views here.
@post_required
@require_POST
def add_item(request):#添加项目的视图
    forms=Cms_projectInfo(request.POST)
    if forms.is_valid():
        project_name=forms.cleaned_data.get("project_name")
        responsible_name = forms.cleaned_data.get("responsible_name")
        test_user = forms.cleaned_data.get("test_user")
        dev_user = forms.cleaned_data.get("dev_user")
        publish_app = forms.cleaned_data.get("publish_app")
        simple_desc = forms.cleaned_data.get("simple_desc")
        other_desc = forms.cleaned_data.get("other_desc")
        id=request.session.get("_auth_user_id")
        a=request.session.keys()
        print(id)
        print(a)
        user_id = User.objects.filter(pk=id).exists()
        if user_id:
            confirm = ProjectInfo.objects.filter(project_name=project_name).exists()
            if confirm:
                return restful.result(message="此项目名称已存在！")
            else:
                iteme = ProjectInfo(project_name=project_name, responsible_name=responsible_name, test_user=test_user,
                                    dev_user=dev_user,
                                    publish_app=publish_app, simple_desc=simple_desc, other_desc=other_desc)
                iteme.user_id = id
                iteme.save()
                return restful.result(message="添加项目成功！")
    else:
        errors = forms.get_errors()
        return restful.params_error(message=errors)

@post_required
@require_POST
def delete_item(request):#删除项目视图
    id=request.POST.get("id")
    if id:
        item_id=ProjectInfo.objects.filter(id=id).prefetch_related("moduleInfo")
        for url_id in item_id:
            if url_id:
                return restful.params_error(message="此项目已被其他模块关联，不能删除！")
            else:
                if item_id:
                    item_id.delete()
                    return restful.result(message="删除项目成功！")
                else:
                    return restful.unauth(message="该id不存在!")
    else:
        return restful.unauth(message="请输入项目id!")

@post_required
@require_POST
def edit_item(request):#编辑项目视图
    id=request.POST.get("id")
    if id:
        forms = Cms_projectInfo(request.POST)
        if forms.is_valid():
            project_name = forms.cleaned_data.get("project_name")
            responsible_name = forms.cleaned_data.get("responsible_name")
            test_user = forms.cleaned_data.get("test_user")
            dev_user = forms.cleaned_data.get("dev_user")
            publish_app = forms.cleaned_data.get("publish_app")
            simple_desc = forms.cleaned_data.get("simple_desc")
            other_desc = forms.cleaned_data.get("other_desc")
            item_id = ProjectInfo.objects.filter(pk=id)
            for i in item_id:
                print(i.project_name)
            print(other_desc)
            if item_id:
                confirm = ProjectInfo.objects.filter(project_name=project_name).exclude(id=id).exists()
                if confirm:
                    return restful.unauth(message="您输入的项目名称已存在！")
                else:
                    item_id1= item_id.update(id=id,project_name=project_name, responsible_name=responsible_name,
                                        test_user=test_user, dev_user=dev_user,
                                        publish_app=publish_app, simple_desc=simple_desc, other_desc=other_desc)
                    return restful.result(message="编辑项目成功！")
            else:
                return restful.unauth(message="您输入id不存在！")
        else:
            errors = forms.get_errors()
            return restful.params_error(message=errors)
    else:
        return restful.unauth(message="id号不能为空")



@post_required
@require_POST
def edit_function(request):#运行多条用例的视图
    userid = request.session.get("_auth_user_id")
    id = request.POST.get("id")
    if id:
        all_edit = ProjectInfo.objects.get(pk=id)
        if all_edit:
            data_times = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(time.time()))
            run_multiple_use_cases.delay(id=id,userid=userid,data_times=data_times)
            return restful.result(message="已运行成功！")
        else:
            return restful.unauth(message="此项目id不存在！")
    else:
        return restful.params_error(message="请输入正确的用例id！")

@post_required
@require_POST
def edit_details(request):
    userid = request.session.get("_auth_user_id")
    id = request.POST.get("id")
    if id:
        all_edit = ProjectInfo.objects.get(pk=id)
        if all_edit:
            module_prefetch = Prefetch("moduleInfo",queryset=ModuleInfo.objects.order_by("module_order"))
            use_prefetch = Prefetch("usecase_set", queryset=Usecase.objects.order_by("case_order"))
            operation=Prefetch("operation_information_set",queryset=operation_information.objects.filter(use_case_mode="many").order_by("-data_time"))
            module_data = ProjectInfo.objects.filter(id=id).prefetch_related(module_prefetch)
            use_data = ModuleInfo.objects.prefetch_related(use_prefetch)
            use_case=Usecase.objects.prefetch_related(operation)
            a=operation_information.objects.filter(use_case_mode="many").order_by("-data_time")
            print(a.exists())
            all_result=[]
            for i in module_data:
                print(i.project_name)
                module_all = i.moduleInfo.all()
                if module_all:
                    for sub_data in module_all:
                        for use_data_all in use_data:
                            if sub_data.module_name == use_data_all.module_name:
                                print(use_data_all.module_name)
                                usecase_data_all = use_data_all.usecase_set.all()
                                if  usecase_data_all:
                                    usecase2 = use_data_all.usecase_set.count()
                                    print("======")
                                    print(usecase2)
                                else:
                                    usecase2 = 0
                                if usecase_data_all:
                                    for usecase in usecase_data_all:
                                        for use_ca in use_case:
                                            if usecase.case_name==use_ca.case_name:
                                                result=[]
                                                operation_all=use_ca.operation_information_set.all()
                                                print("333333")
                                                print(len(operation_all))
                                                if operation_all:
                                                    if len(operation_all)==1:
                                                        serializer = operation_informationSerializer(operation_all,many=True)
                                                        data = serializer.data[-1]

                                                        all_result.append(data)
                                                        print("hahah")
                                                    else:
                                                        serializer = operation_informationSerializer(operation_all,
                                                                                                     many=True)
                                                        data = list(reversed(serializer.data))[-1]

                                                        all_result.append(data)
                                                else:
                                                    pass
                                else:#不存在关联用例执行下面
                                    pass
                else:#不存在关联模块执行下面
                    pass
            return restful.result(data=all_result,message="请求成功！")
        else:
            return restful.unauth(message="此项目id不存在！")
    else:
        return restful.params_error(message="请输入正确的用例id！")