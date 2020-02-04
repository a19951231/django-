from django.urls import path
from cms.use_case import views
app_name="use_case"
urlpatterns = [
    path("",views.use_list,name="use_list"),#打开用例列表页面
    path("add_usecase/",views.add_usecase,name="add_usecase"),#添加用例视图
    path("function_usecase/",views.function_usecase,name="function_usecase"),#运行单条用例视图
    path("delete_use/",views.delete_use,name="delete_use"),#删除用例视图
    path("use_details/",views.use_details,name="use_details")#用例运行详情视图
]