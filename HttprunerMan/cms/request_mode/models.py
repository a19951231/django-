from django.db import models
from cms.use_case.models import Usecase
from cms.cms_user.models import User

# Create your models here.
class operation_information(models.Model):#储蓄用例运行信息
    information=models.TextField()#运行信息
    result=models.CharField(max_length=50)#运行结果
    data_time=models.DateTimeField(auto_now_add=True)#创建时间
    function_time=models.CharField(max_length=100)#运行时间
    use_case_mode=models.CharField(max_length=10)#区分多条用例运行和单条用例运行的字段
    dy_value=models.CharField(max_length=200)#断言结果
    use=models.ForeignKey(Usecase,on_delete=models.CASCADE,name="use")#关联用例
    user = models.ForeignKey(User, on_delete=models.CASCADE, name="user")#关联用户
    class Meta:
        db_table="operation_information"


