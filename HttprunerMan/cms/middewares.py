from cms.cms_user.models import User
#这个中间件先执行，然后到视图里的代码，装饰器是在视图里执行，所以中间件比装饰器先执行,
#性能问题，如果中间件查询user这个表单数据，而装饰器也进行查询，那么我对一个账号的id进行2次查询这样性能就不好
#想性能好，代码也需要写得比较规范，我们可以判断，这个中间件是比装饰器先执行，因为这个中间件的代码都是到达视图之前执行，而我们那个
#装饰器查询的内容与这个中间件查询内容一样，所以我们可以通过装饰器调用这个中间件的结果获取数据
def front_user_middleware(get_response):
    def middleware(request):
        #request到达view之前的中间件代码
        user_id=request.session.get('_auth_user_id')#先获取session的user_id
        if user_id:#判断如果存在执行下面代码
            try:
                user=User.objects.get(pk=user_id)#在数据库查询并且获取这个id对应的数据
                request.front_user=user#并且在request里添加front_user参数并且给予这个user数据
            except:#如果数据库没有就执行下面代码
                request.front_user=None
        else:#如果没有sessionid就执行下面代码
            request.front_user = None
        response=get_response(request)
        # request到达浏览器之前的代码
        return response
    return middleware