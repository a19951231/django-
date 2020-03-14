import requests
import json
from requests_stats import restful#导入方法，这样就可以调用def定义f方法
import time
import re
from django.core.cache import cache#储蓄到内容的模块
from cms.Mysql_yl.models import Mysql_command

def req_mode(method="",url="",params="",data="",headers="",cookies="",zt=""):#这个只能进行form-data和json操作，不能上传文件和图片操作
    Requests = requests.session()
    if headers:
        Requests.headers.update(headers)
    if cookies:
        Requests.headers.update(cookies)
    #lower是把大写转小写
    if zt=="json":
        data1=json.dumps(data)
    elif(zt=="form-data"):
        data1=data
    try:
        req=Requests.request(method=method.lower(),url=url,params=params,data=data1).json()
        return req
    except Exception as e:
        return "请求失败！"

def header(key="",value=""):#这个是请求信息封装方法
    if isinstance(key,list) and isinstance(value,list):
        try:
            all_list=zip(key,value)#使用zip方法进行压缩
            return dict(all_list)#然后使用dict进行转字典
        except Exception as e:
            pass
    else:
        return restful.params_error("您添加的接口用例格式错误！")

def data(key="",alltype="",value=""):#这个是data信息封装方法
    if isinstance(key, list) and isinstance(alltype,list) and isinstance(value, list):
        try:
            all_list={}
            lenlist=len(key)
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
                    req = re.findall(pat, value[i])
                    true_number = Mysql_command.objects.filter(number=req[0]).exists()
                    if true_number:
                        result = Mysql_command.objects.filter(number=req[0]).values('result')
                        for a in result:
                            value1 = a["result"]
                    else:
                        print("出现错误")
                    all_list[key[i]] = value1
            return all_list
        except Exception as e:
            pass
    else:
        return restful.params_error("您添加的接口用例格式错误！")

def get_value(req="",key=""):#断言获取接口的返回值，或提取参数操作
    if isinstance(key,list):
        try:
            all_list=[]
            lenlist=len(key)
            valuelist1=[]
            for i in range(0,lenlist):
                str1=key[i]
                valuelist=str1.split(".")
                for i in valuelist:
                    try:
                        valuelist1.append(int(i))
                    except:
                        valuelist1.append(i)
                valuelen=len(valuelist1)
                if valuelen==0:
                    pass
                elif (valuelen==1):
                    all_list.append(req[valuelist1[0]])
                elif (valuelen ==2):
                    all_list.append(req[valuelist1[0]][valuelist1[1]])
                elif (valuelen ==3):
                    all_list.append(req[valuelist1[0]][valuelist1[1]][valuelist1[2]])
                elif (valuelen == 4):
                    all_list.append(req[valuelist1[0]][valuelist1[1]][valuelist1[2]][valuelist1[3]])
                else:
                    return restful.unauth(message="断言匹配参数最多支持4个往下取值操作！")
            return all_list
        except Exception as e:
            pass
    else:
        return restful.params_error("您添加的接口用例格式错误！")

def assertion(key="",alltype="",value=""):#断言方法封装
    if isinstance(key, list) and isinstance(alltype, list) and isinstance(value, list):
        try:
            all_list=[]
            lenlist=len(key)
            for i in range(0, lenlist):
                if alltype[i] == "等于":
                    if isinstance(key[i], int):
                        if key[i] == int(value[i]):
                            all_list.append("pass")
                        else:
                            all_list.append("fail")
                    else:
                        if key[i] == value[i]:
                            all_list.append("pass")
                        else:
                            all_list.append("fail")
                elif (alltype[i] == "包含"):
                    if value[i] in key[i]:
                        all_list.append("pass")
                    else:
                        all_list.append("fail")
            if "fail" in all_list:
                return "fail"
            else:
                return "pass"
        except Exception as e:
            pass
    else:
        return restful.params_error("您添加的接口用例格式错误！")

def extract_parameter(req="",value=""):#提取接口的值
    try:
        if isinstance(value,list):
            pass
        else:
            return restful.params_error("您添加的接口用例格式错误！")
    except Exception as e:
        pass

def read_req(key="",req_ode=""):#提取参数
        if isinstance(key, list):
            key_list=len(key)
            req_list=[]
            for i in range(0,key_list):
                try:
                    pat="'{}': '(.*?)'".format(key[i])
                    print(pat)
                    req=re.findall(pat,str(req_ode))
                    print(key[i])
                    req_list.append(req[0])
                except:
                    pat = "'{}': (.*?),".format(key[i])
                    req = re.findall(pat,str(req_ode))
                    if req==[]:
                        pass
                    else:
                        req_list.append(req[0])
            return req_list
        else:
            return restful.params_error("您的提取参数不是列表!")

def reg(json_keyvalue=""):#这个是从内存取上一个接口的数据方法（还没有写完获取数据库查询的数据）
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
            print("===================================")
            print(json_keyvalue1)
            return json_keyvalue1
    except Exception as e:
        pass


'''
header1={
    "Content-Type": "application/json",
    "Content-Length": "245",
}

data1={"phone":"131313131313131313","password":"F6ILYBVnOLTq","verifyCode":"11212121212121212122","type":1}
a=req_mode(method="POST",url="https://betaapi.ah-fuli.com/saas-system/systemUser/login",headers=header1,data=data1,zt="json")
print(a)
c=["data","dst"]
print(read_req(key=c,req_ode=a))
cc="{'trans_result': {'data': [{'dst': 'wewqeqwe', 'prefixWrap': 0, 'result': [[0, 'Xue Liang Liu', ['0|9'], [], ['0|9'], ['0|13']]], 'src': '刘学良'}], 'from': 'zh', 'status': 0, 'to': 'en', 'type': 2}, 'liju_result': {'double': '', 'single': ''}, 'logid': 'ewq'}"
value='Xue Liang Liu'
token=4093156642
pat="\$\((.*?)\)"
a11=re.findall(pat,cc)
v=['trans_result.data']
print("==")
print(get_value(req=cc,key=v))



a=["21","!2"]
b=["mysql","int"]
c=["￥[11]","123"]
#print(data(key=a,alltype=b,value=c))
pat = r"￥['(/d+)']+"
req = re.findall(pat,"￥[11]")
print(req)
'''
header1={
    'content-type':'application/x-www-form-urlencoded; charset=UTF-8',
    'cookie':'BAIDUID=BD0AEECE19623584E875DA439BDBB658:FG=1; BIDUPSID=BD0AEECE19623584E875DA439BDBB658; PSTM=1567844827; REALTIME_TRANS_SWITCH=1; FANYI_WORD_SWITCH=1; HISTORY_SWITCH=1; SOUND_SPD_SWITCH=1; SOUND_PREFER_SWITCH=1; APPGUIDE_8_2_2=1; BDUSS=5JTjMxSDloWnBIUDdRYnpuc010MWt5YWZMM1g4S20yd2E3dFg5SWNUTmQ4MzllSVFBQUFBJCQAAAAAAAAAAAEAAADqtCSTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAF1mWF5dZlhec3; BDORZ=FFFB88E999055A3F8A630C64834BD6D0; cflag=13%3A3; BDRCVFR[HHw4GR7hd6D]=mk3SLVN4HKm; delPer=0; PSINO=6; BDRCVFR[6Lkdqt5k6lY]=mk3SLVN4HKm; H_PS_PSSID=; Hm_lvt_64ecd82404c51e03dc91cb9e8c025574=1583928218,1584000281,1584061321,1584108869; Hm_lpvt_64ecd82404c51e03dc91cb9e8c025574=1584108869; __yjsv5_shitong=1.0_7_dde428957d4509fbd25074374c570aa2c767_300_1584108868757_113.64.51.154_8526b01c; yjs_js_security_passport=c9c236106b5d614c45f1a3334d18bd7752580587_1584108870_js; to_lang_often=%5B%7B%22value%22%3A%22zh%22%2C%22text%22%3A%22%u4E2D%u6587%22%7D%2C%7B%22value%22%3A%22en%22%2C%22text%22%3A%22%u82F1%u8BED%22%7D%5D; from_lang_often=%5B%7B%22value%22%3A%22hu%22%2C%22text%22%3A%22%u5308%u7259%u5229%u8BED%22%7D%2C%7B%22value%22%3A%22en%22%2C%22text%22%3A%22%u82F1%u8BED%22%7D%2C%7B%22value%22%3A%22zh%22%2C%22text%22%3A%22%u4E2D%u6587%22%7D%5D',
    'content-length':'24'
}
data1={
    'query':'苹果'
}
a=requests.post(url='https://fanyi.baidu.com/langdetect',data=data1,headers=header1).json()
print(a)