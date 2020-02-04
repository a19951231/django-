#使用celery
import os
import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'HttprunerMan.settings')
django.setup()#这些是初始化项目，因为异步调用django模块就需要初始化

from celery import Celery
from cms.module_name.models import ModuleInfo#导入模块模型
from cms.use_case.models import Usecase
import time
from cms.request_mode.req_mode import req_mode,data,header,assertion,get_value,read_req,reg
from django.core.cache import cache#储蓄到内容的模块
from requests_stats import restful#导入方法，这样就可以调用def定义f方法
from django.db.models import Q,F,Avg,Count,Prefetch
from cms.request_mode.models import operation_information#导入储蓄用例
from cms.entry_name.models import ProjectInfo#导入项目模型


#创建一个celery对象
app=Celery('celery_tasks.tasks',broker='redis://localhost:6379/0')#broker是我们指定的中间人，这里是redis地址，后面的0是redis哪个数据库，0就是为0
#第一个就是创建对象就是名称，名称随意创建
#异步3个部分：发出者，中间人，任务处理者可以在同一台电脑上操作，也可以不在同一台电脑上
#处理者什么启用，处理者也需要任务的代码,然后我们进入到我们创建的ceelery_tasks里这个存在我们异步方法的目录里使用此命令：celery -A celery_tasks.tasks worker -l info进行
#启动worker，-A后面的是异步方法存在的py文件名称 -l后面是指定运行的日志打印级别,但需要在我们运行runerver的目录里运行此命令，-A后面是我们从运行runserver的目录里找我们异步运行任务的文件

#定义任务函数
@app.task#这里是把对象进行装饰，这样就可以进行异步操作
def run_multiple_use_cases(id="",userid="",data_times=""):#然后我们把这个方法导入到视图，然后这个方法后面调用delay()方法上就可以把我们多条用例进行任务对列里，如果我们需要传参，就把参数放入到delay()上
    '''运行多条用例'''
    time.sleep(5)
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
                        headers = header(key=eval(usecase.header_key),
                                         value=eval(reg(json_keyvalue=usecase.header_value)))
                        if usecase.value_type == "form-data":
                            datas = data(key=eval(usecase.data_key), alltype=eval(usecase.data_type),
                                         value=eval(usecase.data_value))
                        else:
                            datas = eval(reg(json_keyvalue=usecase.json_keyvalue))
                            print(datas)
                        if method == "GET":
                            print(usecase.value_type)
                            req = req_mode(method=method, url=url, params=datas, headers=headers, zt=usecase.value_type)
                        else:
                            req = req_mode(method=method, url=url, data=datas, headers=headers, zt=usecase.value_type)
                            print(req)
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
