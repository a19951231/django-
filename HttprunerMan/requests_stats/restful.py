from django.http import JsonResponse

class HttpCode(object):
    Ok=200
    paramserror=400
    unauth=401
    servererror=500
def result(code=HttpCode.Ok,message="",data=None,kwargs=None):
    json_dict={"code":code,"message":message,"data":data}
    if kwargs and isinstance(kwargs,dict) and kwargs.keys():#如果这个kwargs为字典类型并且存在值，并且存在key
        json_dict.update(kwargs)#添加到这个字典里
    return JsonResponse(json_dict)#然后以json格式传给前端

def params_error(message="",data=None):
    return result(code=HttpCode.paramserror, message=message, data=data)
def unauth(message="",data=None):
    return result(code=HttpCode.unauth, message=message, data=data)
def server_error(message="",data=None):
    return result(code=HttpCode.servererror, message=message, data=data)