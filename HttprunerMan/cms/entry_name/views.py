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
from cms.request_mode.req_mode import req_mode,data,header,assertion,get_value,read_req,reg
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
        errors = forms.get_errors()  # 400错误是参数错误
        # 返回数据类型如:{"password":["xxxx","xxxx"]}
        return restful.params_error(message=errors)  # 调用restful模板定义的def方法

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
            errors = forms.get_errors()  # 400错误是参数错误
            # 返回数据类型如:{"password":["xxxx","xxxx"]}
            return restful.params_error(message=errors)  # 调用restful模板定义的def方法
    else:
        return restful.unauth(message="id号不能为空")



@post_required
@require_POST
def edit_function(request):#运行多条用例的视图
    userid = request.session.get("_auth_user_id")
    id = request.POST.get("id")
    '''
    if id:
            all_edit=ProjectInfo.objects.get(pk=id)
            if all_edit:
                module_prefetch = Prefetch("moduleInfo", queryset=ModuleInfo.objects.order_by("module_order"))  # 这里是把我们需要过滤的东西在这里过滤
                use_prefetch = Prefetch("usecase_set", queryset=Usecase.objects.order_by("case_order"))
                module_data = ProjectInfo.objects.prefetch_related(module_prefetch)  # prefetch_related只用在一对多或多对一或多对多
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
                                    url2 =usecase.case_url  # 请求的后面的url
                                    url = url1 + url2  # 用例总url
                                    headers = header(key=eval(usecase.header_key), value=eval(reg(json_keyvalue=usecase.header_value)))
                                    if usecase.value_type == "form-data":
                                        datas = data(key=eval(usecase.data_key), alltype=eval(usecase.data_type),
                                                     value=eval(usecase.data_value))
                                    else:
                                        datas = eval(reg(json_keyvalue=usecase.json_keyvalue))
                                        print(datas)
                                    if method == "GET":
                                        print(usecase.value_type)
                                        req = req_mode(method=method, url=url, params=datas, headers=headers,zt=usecase.value_type)
                                        print("333333333",req)
                                    else:
                                        req = req_mode(method=method, url=url, data=datas, headers=headers, zt=usecase.value_type)
                                        print(req)
                                    dy_keylist = get_value(req=req, key=eval(usecase.dy_key))
                                    print("================")
                                    all_extract_stat = read_req(key=eval(usecase.all_extract), req_ode=req)
                                    if all_extract_stat == []:  # 如果空就pass跳过
                                        pass
                                    else:
                                        for read in range(0, len(eval(usecase.all_extract))):
                                            cache.set(eval(usecase.all_extract)[read], all_extract_stat[read], 3600)
                                            # result = cache.get(eval(i.all_extract)[0])#这个是取内存内容
                                    print("!111111111111")
                                    asserts = assertion(key=dy_keylist, alltype=eval(usecase.dy_type), value=eval(usecase.dy_value))
                                    print("!===========",asserts)
                                    data_times = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(time.time()))
                                    print(data_times)
                                    operation = operation_information.objects.create(information=req,result=asserts,function_time=data_times,user_id=userid, use_id=id)
                                    print("2222222222222222222222")
                                    # operation.save()
                                    usecase_data_all.update(state=asserts)
                            else:
                                pass
                return restful.result(message="已运行成功！")
            else:
                return restful.unauth(message="此项目id不存在！")
    else:
        return restful.params_error(message="请输入正确的用例id！")
    '''
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
def edit_details(request):#明天还需要设置区分多条用例运行的结果和单条用例运行结果，需要在数据库里operation_information表里添加一个字段来储蓄才可以编写
    userid = request.session.get("_auth_user_id")
    id = request.POST.get("id")
    if id:
        all_edit = ProjectInfo.objects.get(pk=id)
        if all_edit:
            module_prefetch = Prefetch("moduleInfo",queryset=ModuleInfo.objects.order_by("module_order"))  # 这里是把我们需要过滤的东西在这里过滤
            use_prefetch = Prefetch("usecase_set", queryset=Usecase.objects.order_by("case_order"))
            operation=Prefetch("operation_information_set",queryset=operation_information.objects.filter(use_case_mode="many").order_by("-data_time"))
            module_data = ProjectInfo.objects.filter(id=id).prefetch_related(module_prefetch)  # prefetch_related只用在一对多或多对一或多对多
            use_data = ModuleInfo.objects.prefetch_related(use_prefetch)
            use_case=Usecase.objects.prefetch_related(operation)
            a=operation_information.objects.filter(use_case_mode="many").order_by("-data_time")
            print(a.exists())
            all_result=[]
            for i in module_data:
                print(i.project_name)
                module_all = i.moduleInfo.all()  # 这里可以使用all()，但不能使用filter()否则会产生多条查询语句
                if module_all:#如果存在关联的模块继续执行
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
                                if usecase_data_all:#如果存在关联用例继续执行
                                    for usecase in usecase_data_all:
                                        for use_ca in use_case:
                                            if usecase.case_name==use_ca.case_name:
                                                result=[]
                                                operation_all=use_ca.operation_information_set.all()
                                                print("333333")
                                                print(len(operation_all))
                                                if operation_all:
                                                    if len(operation_all)==1:
                                                        serializer = operation_informationSerializer(operation_all,many=True)  # 这里就把我们获取的news的数据传入这个序列化里，然后定义many=True就是所有数据都需要序列化
                                                        data = serializer.data[-1]  # 然后我们只能通过data才可以拿到我们序列化的数据，
                                                        '''
                                                        case_name=usecase.case_name#获取用例名称
                                                        result[0]=case_name
                                                        req=usecase.req#获取请求方式
                                                        result[1] =req
                                                        for operation1 in operation_all:
                                                            information=operation1.information#获取运行信息
                                                            result[2] = information
                                                            result1=operation1.result#获取运行结果
                                                            result[3] = result1
                                                            dy_value=operation1.dy_value#获取断言结果
                                                            result[4]=dy_value
                                                            '''
                                                        all_result.append(data)
                                                        print("hahah")
                                                    else:
                                                        serializer = operation_informationSerializer(operation_all,
                                                                                                     many=True)  # 这里就把我们获取的news的数据传入这个序列化里，然后定义many=True就是所有数据都需要序列化
                                                        data = list(reversed(serializer.data))[-1] # 然后我们只能通过data才可以拿到我们序列化的数据，
                                                        '''
                                                        case_name=usecase.case_name#获取用例名称
                                                        result[0]=case_name
                                                        req=usecase.req#获取请求方式
                                                        result[1] =req
                                                        for operation1 in operation_all:
                                                            information=operation1.information#获取运行信息
                                                            result[2] = information
                                                            result1=operation1.result#获取运行结果
                                                            result[3] = result1
                                                            dy_value=operation1.dy_value#获取断言结果
                                                            result[4]=dy_value
                                                            '''
                                                        all_result.append(data)
                                                    print("1111111")
                                                else:
                                                    pass
                                                #all_result.append(data)
                                else:#不存在关联用例执行下面
                                    pass
                else:#不存在关联模块执行下面
                    pass
            return restful.result(data=all_result,message="请求成功！")
        else:
            return restful.unauth(message="此项目id不存在！")
    else:
        return restful.params_error(message="请输入正确的用例id！")