from cms.cms_user.models import User
from django.shortcuts import render,redirect,reverse
from requests_stats import restful#导入方法，这样就可以调用def定义f方法

#https://www.cnblogs.com/cicaday/p/python-decorator.html装饰器的使用网站
#这个是装饰器
def get_required(func):#这个是用在get请求
    def wrapper(request,*args,**kwargs):
        if request.front_user:#如果front_user存在执行下面代码
            return func(request,*args,**kwargs)
        else:#不存在返回这个login页面
            return redirect(reverse("cms_user:login"))

    return wrapper

def post_required(func):#这个是用在get请求
    def wrapper(request,*args,**kwargs):
        if request.front_user:#如果front_user存在执行下面代码
            return func(request,*args,**kwargs)
        else:#不存在返回这个login页面
            return restful.unauth(message="无sessionid，请重新登录！")

    return wrapper
'''
传参装饰器使用方法：
def logging(level):
    def wrapper(func):
        def inner_wrapper(*args, **kwargs):
            print(level)
            return func(*args, **kwargs)
        return inner_wrapper
    return wrapper

b="lxl"
@logging(level=1)
def say(a):
    return a

print(say(b))
#结果
#第一个打印1
#第二个打印lxl

'''