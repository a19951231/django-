from django.db import models
from django.contrib.auth.models import AbstractBaseUser,PermissionsMixin,BaseUserManager
from shortuuidfield import ShortUUIDField#然后倒入这个包
# Create your models here.
#python manage.py createsuperuser创建账号

class UserManager(BaseUserManager):
    def _create_user(self,telephone,username,password,**kwargs):
        if not telephone:
            raise ValueError('请输入手机号码!')
        if not username:
            raise ValueError("请输入用户名称!")
        if not password:
            raise ValueError("请输入密码！")
        user=self.model(telephone=telephone,username=username,**kwargs)
        user.set_password(password)
        user.save()
        return user
    def create_user(self,telephone,username,password,**kwargs):
        kwargs["is_superuser"]=False#设置is_superuser为false
        return self._create_user(telephone,username,password,**kwargs)

    def create_superuser(self,telephone,username,password,**kwargs):
        kwargs["is_superuser"]=True
        kwargs["is_staff"]=True
        return self._create_user(telephone,username,password,**kwargs)


class User(AbstractBaseUser,PermissionsMixin):#这个是用户登录的user模型
    uid=ShortUUIDField(primary_key=True)
    telephone=models.CharField(max_length=11,unique=True)
    email=models.EmailField(unique=True,null=True)#邮箱
    username=models.CharField(max_length=30)
    is_active = models.BooleanField(default=True)
    is_staff=models.BooleanField(default=False)
    data_joined=models.DateTimeField(auto_now_add=True)
    entry_name=models.CharField(null=False,max_length=50,default="薪签约项目")#项目名称

    USERNAME_FIELD='telephone'
    REQUIRED_FIELDS = ["username"]
    EMAIL_FIELD="email"

    objects=UserManager()#这里就是调用了UserManager()

    def get_full_name(self):
        return self.username

    def get_short_name(self):
        return self.username
