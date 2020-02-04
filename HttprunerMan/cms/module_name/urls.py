from django.urls import path
from cms.module_name import views
app_name="module_name"
urlpatterns = [
    path("",views.module_list,name="module_list"),#打开模块列表页面
    path("add_module/",views.add_module,name="add_module"),#添加模块请求
    path("delete_module/",views.delete_module,name="delete_module"),#删除模块请求
    path("edit_module/",views.edit_module,name="edit_module")#编辑模块请求
]