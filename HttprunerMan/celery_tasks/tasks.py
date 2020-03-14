#使用celery
import os
import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'HttprunerMan.settings')
django.setup()#这些是初始化项目，因为异步调用django模块就需要初始化

from celery import Celery
from cms.module_name.models import ModuleInfo#导入模块模型
from cms.use_case.models import Usecase
import time
from cms.request_mode.req_mode import req_mode,header,assertion,get_value,read_req,data,reg
#from cms.use_case.views import reg,data
from django.core.cache import cache#储蓄到内容的模块
from requests_stats import restful#导入方法，这样就可以调用def定义f方法
from django.db.models import Q,F,Avg,Count,Prefetch
from cms.request_mode.models import operation_information#导入储蓄用例
from cms.entry_name.models import ProjectInfo#导入项目模型


#创建一个celery对象
app=Celery('celery_tasks.tasks',broker='redis://localhost:6379/0')

#定义任务函数
@app.task#这里是把对象进行装饰，这样就可以进行异步操作
def run_multiple_use_cases(id="",userid="",data_times=""):
    '''运行多条用例'''
    module_prefetch = Prefetch("moduleInfo", queryset=ModuleInfo.objects.order_by("module_order"))  # 这里是把我们需要过滤的东西在这里过滤
    use_prefetch = Prefetch("usecase_set", queryset=Usecase.objects.order_by("case_order"))
    module_data = ProjectInfo.objects.filter(id=id).prefetch_related(module_prefetch)  # prefetch_related只用在一对多或多对一或多对多
    use_data = ModuleInfo.objects.prefetch_related(use_prefetch)
    for i in module_data:
        print(i.project_name)
        module_all = i.moduleInfo.all()  # 这里可以使用all()，但不能使用filter()否则会产生多条查询语句
        for sub_data in module_all:
            for use_data_all in use_data:
                if sub_data.module_name == use_data_all.module_name:
                    print(use_data_all.module_name)
                    usecase_data_all = use_data_all.usecase_set.all()
                    for usecase in usecase_data_all:
                        print(usecase.case_name)
                        method = usecase.req  # 请求方式
                        print(method)
                        url1 = usecase.use_case1.host_url
                        url2 = usecase.case_url  # 请求的后面的url
                        url = url1 + url2  # 用例总url
                        print(url)
                        headers = header(key=eval(usecase.header_key),
                                         value=eval(reg(json_keyvalue=usecase.header_value)))
                        if usecase.value_type == "form-data":
                            datas = data(key=eval(usecase.data_key), alltype=eval(usecase.data_type),
                                         value=eval(usecase.data_value))
                        else:
                            datas = eval(reg(json_keyvalue=usecase.json_keyvalue))
                        if method == "GET":
                            req = req_mode(method=method, url=url, params=datas, headers=headers, zt=usecase.value_type)
                        else:
                            req = req_mode(method=method, url=url, data=datas, headers=headers, zt=usecase.value_type)
                        dy_keylist = get_value(req=req, key=eval(usecase.dy_key))
                        all_extract_stat = read_req(key=eval(usecase.all_extract), req_ode=req)
                        if all_extract_stat == []:  # 如果空就pass跳过
                            pass
                        else:
                            for read in range(0, len(eval(usecase.all_extract))):
                                cache.set(eval(usecase.all_extract)[read], all_extract_stat[read], 3600)
                                # result = cache.get(eval(i.all_extract)[0])#这个是取内存内容
                        asserts = assertion(key=dy_keylist, alltype=eval(usecase.dy_type), value=eval(usecase.dy_value))
                        print(data_times)
                        operation = operation_information.objects.create(information=req, result=asserts,use_case_mode="many",dy_value=dy_keylist,
                                                                         function_time=data_times, user_id=userid,
                                                                         use_id=usecase.id)
                        # operation.save()
                        usecase_data_all.update(state=asserts)
                else:
                    pass
