from django.shortcuts import render
from django.views.decorators.http import require_GET,require_POST
from cms.entry_name.models import ProjectInfo
from cms.module_name.models import ModuleInfo
from cms.use_case.models import Usecase
import time
from cms.decorators import get_required,post_required#导入装饰器
from django.utils.decorators import method_decorator#导入给视图进行装饰的模块
from cms.serializers import Presentation
from cms.request_mode.models import operation_information
from requests_stats import restful#导入方法，这样就可以调用def定义f方法
from django.db.models import Avg,Count,Max,Min,Sum,F,Q#导入Sum,Avg,Count,Max,Min这个聚合函数,导入F表达式,导入Q表达式
# Create your views here.
from django.db.models import Avg,Count,Max,Min,Sum,F,Q,Prefetch
from django.db import connection
@get_required
@require_GET
def index(request):#打开项目列表视图
    id = request.session.get("_auth_user_id")
    if id:
        module_prefetch = Prefetch("moduleInfo",queryset=ModuleInfo.objects.order_by("-data_time"))  # 这里是把我们需要过滤的东西在这里过滤
        use_prefetch = Prefetch("usecase_set", queryset=Usecase.objects.order_by("-data_time"))
        module_data = ProjectInfo.objects.filter(user_id=id).prefetch_related(module_prefetch)  # prefetch_related只用在一对多或多对一或多对多
        use_data = ModuleInfo.objects.filter(user_id=id).prefetch_related(use_prefetch)
        for i in module_data:
            module_all = i.moduleInfo.all()  # 这里可以使用all()，但不能使用filter()否则会产生多条查询语句
            usecase3=[]
            usecase=0
            if module_all:
                module = i.moduleInfo.count()  # 获取
                for sub_data in module_all:
                    for use_data_all in use_data:
                        if sub_data.module_name == use_data_all.module_name:
                            usecase1=use_data_all.usecase_set.all()
                            if usecase1:
                                usecase2=use_data_all.usecase_set.count()
                                usecase3.append(usecase2)
                            else:
                                usecase=0
            else:
                module=0
                usecase = 0
            if usecase3==[]:
                pass
            else:
                for data in usecase3:
                    usecase+=int(data)
            module_usecase1=str(module)+"/"+str(usecase)
            ProjectInfo.objects.filter(id=i.id).update(all_use=module_usecase1)
        context={
            "xm":module_data,
        }
        return render(request,"tables/data.html",context=context)
    else:
        context = {
        }
        return render(request, "tables/data.html", context=context)

@get_required
@require_GET
def dl(request):
    return render(request,"index/index.html")

def a(request):#练习
    return render(request, "common/add_itme.html")

@get_required
@require_GET
def time_box(request):#报告形成时间返回视图
    total_result=operation_information.objects.values('function_time').distinct()
    data=[]
    for i in total_result:
        data.append(i)
    print(data)
    #serializers = Presentation(total_result, many=True)
    #data = serializers.data
    return restful.result(data=list(reversed(data)),message="成功")#list(reversed(data))把列表进行倒须

@get_required
@require_GET
def all_calculation1(request):#报告开始结果返回的视图
    total_result = operation_information.objects.order_by("-data_time")
    total_result1 = total_result[0]
    all_result = operation_information.objects.filter(function_time=total_result1.function_time)  # 第一条用例的总数据
    all_use_case = all_result.count()  # 总用例
    pass_use_case = all_result.filter(result="pass").count()  # 总通过用例数
    fail_use_case = all_result.filter(result="fail").count()  # 总失败用例数
    suspend_use_case = all_result.filter(~Q(result="fail") & ~Q(result="pass")).count()  # 其他原因的用例数
    pass_percentage = "{}%".format((pass_use_case / all_use_case) * 100)  # 成功比例
    fail_percentage = "{}%".format((fail_use_case / all_use_case) * 100)  # 失败比率
    suspend_percentage = "{}%".format((suspend_use_case / all_use_case) * 100)  # 其他原因的比例
    context = {
        "all_use_case": all_use_case,
        "pass_use_case": pass_use_case,
        "fail_use_case": fail_use_case,
        "suspend_use_case": suspend_use_case,
        "pass_percentage": pass_percentage,
        "fail_percentage": fail_percentage,
        "suspend_percentage": suspend_percentage,
    }
    return restful.result(data=[context], message="成功")

@get_required
@require_GET
def all_calculation(request):
    box_time=request.GET.get("box_time")
    print(box_time)
    if box_time:
        total_result = operation_information.objects.filter(function_time=box_time)
        if total_result:
            all_use_case = total_result.count()  # 总用例
            pass_use_case = total_result.filter(result="pass").count()  # 总通过用例数
            fail_use_case = total_result.filter(result="fail").count()  # 总失败用例数
            suspend_use_case = total_result.filter(~Q(result="fail") & ~Q(result="pass")).count()  # 其他原因的用例数
            pass_percentage = "{}%".format((pass_use_case / all_use_case) * 100)  # 成功比例
            fail_percentage = "{}%".format((fail_use_case / all_use_case) * 100)  # 失败比率
            suspend_percentage = "{}%".format((suspend_use_case / all_use_case) * 100)  # 其他原因的比例
            context = {
                "all_use_case": all_use_case,
                "pass_use_case": pass_use_case,
                "fail_use_case": fail_use_case,
                "suspend_use_case": suspend_use_case,
                "pass_percentage": pass_percentage,
                "fail_percentage": fail_percentage,
                "suspend_percentage": suspend_percentage,
            }
            return restful.result(data=[context], message="成功")
        else:
            return restful.unauth(message="查询信息已不存在！")
    else:
        return restful.unauth(message="提交数据不能空！")
