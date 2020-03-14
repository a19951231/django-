from django.shortcuts import render
from cms.module_name.models import ModuleInfo#导入模块模型
from cms.entry_name.models import ProjectInfo
from cms.module_name.forms import Cms_Moudle#导入表单验证模块
from cms.cms_user.models import User
from django.views.decorators.http import require_POST,require_GET
from cms.entry_name.models import ProjectInfo#导入项目模块模型
from requests_stats import restful
from cms.decorators import get_required,post_required
import time
# Create your views here.
@get_required
@require_GET
def module_list(request):#模块列表
    id = request.session.get("_auth_user_id")
    module =ModuleInfo.objects.filter(user_id=id).order_by("-data_time")
    projectInfo = ProjectInfo.objects.filter(user_id=id).values("project_name","id")
    if id:
        for i in module:
            print(i.module_name)
        context = {
            "module1": module,
            "projectInfo":projectInfo,
        }
        return render(request, "module/module_list.html", context=context)
    else:
        context = {

        }
        return render(request, "module/module_list.html", context=context)

@post_required
@require_POST
def add_module(request):#添加模块视图
    forms = Cms_Moudle(request.POST)
    if forms.is_valid():
        module_name = forms.cleaned_data.get("module_name")
        test_user = forms.cleaned_data.get("test_user")
        belong_project = request.POST.get("belong_project")
        simple_desc = forms.cleaned_data.get("simple_desc")
        other_desc = forms.cleaned_data.get("other_desc")
        module_order=forms.cleaned_data.get("module_order")
        id = request.session.get("_auth_user_id")
        a = request.session.keys()
        is_module = ProjectInfo.objects.filter(pk=int(belong_project))
        is_case_url = is_module.filter(moduleInfo__module_order=module_order).exists()
        if is_case_url:  # 如果存在执行下面代码
            return restful.unauth(message="此用例运行顺序已存在！")
        else:
            user_id = User.objects.filter(pk=id).exists()
            if user_id:
                confirm = ModuleInfo.objects.filter(module_name=module_name).exists()
                if confirm:
                    return restful.unauth(message="此模块名称已存在！")
                else:
                    iteme = ModuleInfo(module_name=module_name,
                                       test_user=test_user, simple_desc=simple_desc, other_desc=other_desc,module_order=module_order)
                    iteme.user_id = id
                    iteme.belong_project_id = int(belong_project)
                    iteme.save()
                    return restful.result(message="添加模块成功！")
    else:
        errors = forms.get_errors()
        return restful.params_error(message=errors)

@post_required
@require_POST
def delete_module(request):#删除模块视图
    id=request.POST.get("id")
    if id:
        url_id = ModuleInfo.objects.get(pk=id)
        url_id1 = url_id.usecase_set.all()
        if url_id1:
            return restful.params_error(message="此模块已被其他用例关联，不能删除！")
        else:
            if url_id:
                url_id.delete()
                return restful.result(message="删除模块成功！")
            else:
                return restful.unauth(message="该id不存在!")
    else:
        return restful.unauth(message="请输入项目id!")

@post_required
@require_POST
def edit_module(request):#编辑项目视图
    id=request.POST.get("id")
    if id:
        forms = Cms_Moudle(request.POST)
        if forms.is_valid():
            module_name = forms.cleaned_data.get("module_name")
            test_user = forms.cleaned_data.get("test_user")
            belong_project = request.POST.get("belong_project")
            simple_desc = forms.cleaned_data.get("simple_desc")
            other_desc = forms.cleaned_data.get("other_desc")
            module_order=forms.cleaned_data.get("module_order")
            module_id = ModuleInfo.objects.filter(pk=id)
            if module_id:
                confirm = ModuleInfo.objects.filter(module_name=module_name).exclude(id=id).exists()
                if confirm:
                    return restful.unauth(message="您输入的项目名称已存在！")
                else:
                    all_true=ModuleInfo.objects.filter(belong_project_id=belong_project).exclude(id=id).filter(module_order=module_order).exists()
                    if all_true:
                        return restful.unauth(message="模块运行顺序已存在！")
                    else:
                        module_id1= module_id.update(id=id,module_name=module_name,
                                            test_user=test_user,belong_project_id=belong_project,simple_desc=simple_desc, other_desc=other_desc,module_order=module_order)
                        return restful.result(message="编辑项目成功！")
            else:
                return restful.unauth(message="您输入id不存在！")
        else:
            errors = forms.get_errors()
            return restful.params_error(message=errors)
    else:
        return restful.unauth(message="id号不能为空")


