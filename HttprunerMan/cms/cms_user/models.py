from django.db import models
from django.contrib.auth.models import AbstractBaseUser,PermissionsMixin,BaseUserManager
from shortuuidfield import ShortUUIDField#然后倒入这个包
# Create your models here.
#python manage.py createsuperuser创建账号

class UserManager(BaseUserManager):
    #_create_user方法不能在外面被调用，只能在UserManager类里的方法内部调用
    def _create_user(self,telephone,username,password,**kwargs):#这里的**kwargs是怕我们还有其他参数传入进去，所以做了个**kwargs
        if not telephone:
            raise ValueError('请输入手机号码!')
        if not username:
            raise ValueError("请输入用户名称!")
        if not password:
            raise ValueError("请输入密码！")
        user=self.model(telephone=telephone,username=username,**kwargs)#因为我们还有密码传入进入所以需要**kwargs
        #self.model就是代表当前创建的User的orm模型
        user.set_password(password)#设置密码，把密码传入进去给予user
        user.save()
        return user
    def create_user(self,telephone,username,password,**kwargs):#创建普通用户方法
        kwargs["is_superuser"]=False#设置is_superuser为false
        return self._create_user(telephone,username,password,**kwargs)

    def create_superuser(self,telephone,username,password,**kwargs):#创建超级用户方法
        kwargs["is_superuser"]=True#设置is_superuser为True
        kwargs["is_staff"]=True#设置这个ture才是超级管理员
        return self._create_user(telephone,username,password,**kwargs)


class User(AbstractBaseUser,PermissionsMixin):#这个是用户登录的user模型
    #我们不使用默认的自增长的主键
    #我们使用shortuuid,不使用uuid做用户id，因为uuid字符串长度为32位很长，这样使我们每次查询的时候系统性能都会有影响
    #shortuuid安装方式：pip install django-shortuuidfield
    uid=ShortUUIDField(primary_key=True)#定义用户id
    telephone=models.CharField(max_length=11,unique=True)#unique=True就是指定这个字段的值是为一的，不能有重复
    #password = models.CharField(max_length=200)#密码
    email=models.EmailField(unique=True,null=True)#邮箱
    username=models.CharField(max_length=30)#账号名称
    is_active = models.BooleanField(default=True)#默认是可用的
    is_staff=models.BooleanField(default=False)#默认为false这个字段，就是默认不是员工
    data_joined=models.DateTimeField(auto_now_add=True)#当我们创建一个用户的上时候就会自获取当前时间
    entry_name=models.CharField(null=False,max_length=50,default="薪签约项目")#项目名称

    USERNAME_FIELD='telephone'#这个USERNAME_FIELD属性是用来定义我们做验证的字段，这里是电话号码，如果我们不做这个属性定义，
    # django的use是默认username为验证，但我们不需要账号名称为验证，使用电话号码，所以我们重写user时候也要重新定义这个属性
    REQUIRED_FIELDS = ["username"]# REQUIRED_FIELDS这里的属性输入username，就是会自动让我们输入USERNAME_FIELD定义的字段telephone和username，password这3个字段
    EMAIL_FIELD="email"#这个字段是给指定的用户发邮件的，主要根据我们传入的email字段

    objects=UserManager()#这里就是调用了UserManager()

    def get_full_name(self):
        return self.username

    def get_short_name(self):
        return self.username
