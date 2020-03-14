from django.shortcuts import render
from django.views.decorators.http import require_GET,require_POST
from cms.decorators import get_required,post_required#导入装饰器
from cms.use_case.models import Usecase
from cms.use_case.forms import Cms_use
from cms.cms_user.models import User
from cms.module_name.models import ModuleInfo#导入模块模型
from cms.url_configuration.models import Urlconfiguratin
from requests_stats import restful#导入方法，这样就可以调用def定义f方法
from cms.request_mode.models import operation_information#导入储蓄用例
from cms.request_mode.req_mode import req_mode,header,assertion,get_value,read_req
import time
from django.core.cache import cache#储蓄到内容的模块
from cms.Mysql_yl.models import Mysql_command
import re
# Create your views here.

def data(request,key="",alltype="",value=""):
    if isinstance(key, list) and isinstance(alltype,list) and isinstance(value, list):
        try:
            all_list={}
            lenlist=len(key)
            print(lenlist)
            for i in range(0,lenlist):
                if alltype[i] == "string":
                    a = str(value[i])
                    all_list[key[i]]=a
                elif (alltype[i] == "int"):
                    a = int(value[i])
                    all_list[key[i]] = a
                elif (alltype[i] == "list"):
                    a = eval(value[i])
                    all_list[key[i]] = a
                elif (alltype[i] == "dict"):
                    a = eval(value[i])
                    all_list[key[i]] = a
                elif (alltype[i] == "mysql"):
                    pat = "\￥\[(\d+)\]"
                    req = re.findall(pat,value[i])
                    true_number = Mysql_command.objects.filter(number=req[0]).exists()
                    if true_number:
                        result = Mysql_command.objects.filter(number=req[0]).values('result')
                        for a in result:
                            value1= a["result"]
                    else:
                        return restful.unauth(message="您所获取的数据库信息有误！")
                    all_list[key[i]] = value1
            return all_list
        except Exception as e:
            pass
    else:
        return restful.params_error("您添加的接口用例格式错误！")

def reg(request,json_keyvalue=""):
    try:
        mysqlpat = "\￥\[(.*?)\]"
        mysql_value=re.findall(mysqlpat,json_keyvalue)
        pat = "\$\((.*?)\)"
        valuelist=re.findall(pat,json_keyvalue)
        if valuelist==[] and mysql_value==[]:
            return json_keyvalue
        else:
            for i in valuelist:
                json_list=json_keyvalue.replace("$({})".format(i),str(cache.get(i)),len(valuelist))
            for v in mysql_value:
                true_number = Mysql_command.objects.filter(number=v).exists()
                if true_number:
                    result = Mysql_command.objects.filter(number=v).values('result')
                    for a in result:
                        value1 = a["result"]
                json_keyvalue1=json_list.replace("￥[{}]".format(v),value1,len(mysql_value))
            print("=======")
            print(json_keyvalue1)
            return json_keyvalue1
    except Exception as e:
        pass

@get_required
@require_GET
def use_list(request):
    id = request.session.get("_auth_user_id")
    if id:
        mudels=ModuleInfo.objects.order_by("-data_time")
        url=Urlconfiguratin.objects.order_by("-data_time")
        use=Usecase.objects.select_related('usecase','use_case1').order_by("-data_time")
        context = {
            "module": mudels,
            "url":url,
            "use":use,
        }
        return render(request, "use_list/use_list.html", context=context)
    else:
        context = {

        }
        return render(request, "use_list/use_list.html", context=context)


@post_required
@require_POST
def add_usecase(request):#添加用例视图
    print("我已执行1")
    case_name = request.POST.get("case_name")  # 用例名称
    print(case_name)
    case_url = request.POST.get("case_url")  # url链接
    case_order = request.POST.get("case_order")  # 运行顺序
    module = request.POST.get("module")  # 关联的模块
    url_con = request.POST.get("url_con")  # 关联的环境
    req = request.POST.get("req")  # 请求方式
    header_key = request.POST.getlist("header_key[]")  # 储蓄信息头的所有key值
    header_value = request.POST.getlist("header_value[]")  # 储蓄信息头的v所有value值
    value_type = request.POST.get("value_type")  # 传参类型
    data_key = request.POST.getlist("data_key[]")  # 储蓄传参的所有key值
    data_type = request.POST.getlist("data_type[]")  # 储蓄提交的value值类型
    data_value = request.POST.getlist("data_value[]")  # 获取参数的所有value值
    json_keyvalue = request.POST.get("json_keyvalue")  # 储蓄json格式参数
    dy_key = request.POST.getlist("dy_key[]")  # 储蓄断言的所有key
    dy_type = request.POST.getlist("dy_type[]")  # 储蓄断言的类型
    dy_value = request.POST.getlist("dy_value[]")  # 储蓄断言的所有value
    all_extract = request.POST.getlist("all_extract[]")  # 储蓄所有提取值
    describe = request.POST.get("describe")
    id = request.session.get("_auth_user_id")
    user_id = User.objects.filter(pk=id).exists()
    print("22222222", type(url_con))
    if not case_name:
        return restful.unauth(message="用例名称不能为空！")
    if not case_url:
        return restful.unauth(message="接口url不能为空！")
    if not  case_order:
        return restful.unauth(message="用例运行顺序不能为空！")
    if user_id:
        usecase1 = Usecase.objects.filter(case_name=case_name).exists()
        if usecase1:
            return restful.unauth(message="此用例名称已存在！")
        else:
            if not module or not url_con:
                return restful.unauth(message="关联模块或关联环境不能为空！")
            try:
                module = int(module)
            except Exception as e:
                return restful.unauth(message="请传入正确的关联模块id！")
            try:
                url_con = int(url_con)
            except Exception as e:
                return restful.unauth(message="请传入正确的关联环境id！")
            if not value_type:
                return restful.unauth(message="传参类型不能为空！")
            is_module = ModuleInfo.objects.filter(pk=int(module))
            is_case_url = is_module.filter(usecase__case_order=case_order).exists()
            if is_case_url:
                return restful.unauth(message="此用例运行顺序已存在！")
            else:
                use_case1 = Usecase(case_name=case_name, case_url=case_url, case_order=case_order, req=req,
                                    header_key=header_key,
                                    header_value=header_value, value_type=value_type, data_key=data_key,
                                    data_type=data_type,
                                    data_value=data_value, json_keyvalue=json_keyvalue, dy_key=dy_key, dy_type=dy_type,
                                    dy_value=dy_value,
                                    all_extract=all_extract, describe=describe, use_case_id=id,
                                    use_case1_id=int(url_con), usecase_id=int(module))
                use_case1.save()
                return restful.result(message="用例添加成功！")



@post_required
@require_POST
def function_usecase(request):
    try:
        userid = request.session.get("_auth_user_id")
        id = request.POST.get("id")
        print(id)
        if id:
            all_use=Usecase.objects.filter(pk=id)
            if all_use:
                for i in all_use:
                    method=i.req
                    print(method)
                    url1=i.use_case1.host_url
                    url2=i.case_url
                    url=url1+url2
                    headers=header(key=eval(i.header_key),value=eval(reg(request,json_keyvalue=i.header_value)))
                    print(headers)
                    if i.value_type=="form-data":
                        datas=data(request,key=eval(i.data_key),alltype=eval(i.data_type),value=eval(i.data_value))
                    else:
                        datas=eval(reg(request,json_keyvalue=i.json_keyvalue))
                    if method=="GET":
                        req=req_mode(method=method,url=url,params=datas,headers=headers,zt=i.value_type)
                    else:
                        req=req_mode(method=method, url=url, data=datas, headers=headers, zt=i.value_type)
                    dy_keylist=get_value(req=req,key=eval(i.dy_key))
                    all_extract_stat=read_req(key=eval(i.all_extract),req_ode=req)
                    if all_extract_stat==[]:
                        pass
                    else:
                        for read in range(0,len(eval(i.all_extract))):
                            cache.set(eval(i.all_extract)[read], all_extract_stat[read],3600)
                    asserts=assertion(key=dy_keylist,alltype=eval(i.dy_type),value=eval(i.dy_value))
                    print(asserts)
                    data_times=time.strftime('%Y-%m-%d %H:%M:%S',time.localtime(time.time()))
                    operation=operation_information.objects.create(information=req,result=asserts,function_time=data_times,user_id=i.id,use_id=id,use_case_mode="one",dy_value=dy_keylist,)
                    all_use.update(state=asserts)
                    return restful.result(message="已运行成功！")
        else:
            return restful.params_error(message="请输入正确的用例id！")
    except:
        return restful.params_error(message="运行失败,请检查用例是否添加错误信息！")


@post_required
@require_POST
def delete_use(request):
    id=request.POST.get("id")
    if id:
        usecase_id=Usecase.objects.filter(id=id)
        if usecase_id:
            usecase_id.delete()
            return restful.result(message="删除项目成功！")
        else:
            return restful.unauth(message="该id不存在!")
    else:
        return restful.unauth(message="请输入项目id!")


@post_required
@require_POST
def use_details(request):
    id = request.POST.get("id")
    if id:
        all_use = Usecase.objects.filter(pk=id)
        if all_use:
            for i in all_use:
                method = i.req
                url1 = i.use_case1.host_url
                url2 = i.case_url
                url = url1 + url2
                headers = header(key=eval(i.header_key), value=eval(i.header_value))
                if i.value_type == "form-data":
                    datas=header(key=eval(i.data_key), value=eval(i.data_value))
                else:
                    datas=i.json_keyvalue
                dy=i.dy_value
                state=i.state
            result=operation_information.objects.filter(use__in=all_use)
            if result:
                for i in result:
                    results=i.information
            context={
                "method":method,
                "url":url,
                "headers":headers,
                "datas":datas,
                "dy":dy,
                "results":results,
                "state":state,
            }
            return restful.result(data=[context],message="请求成功！")
        else:
            return restful.unauth(message="该用例不存在！")
    else:
        return restful.unauth(message="请输入用例id!")


