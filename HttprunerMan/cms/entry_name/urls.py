from django.urls import path
from cms.entry_name import views
app_name="entry_name"
urlpatterns = [
    path("add_xm/",views.add_item,name="add_xm"),
    path("delete_item/",views.delete_item,name="delete_item"),#删除项目视图
    path("edit_item/",views.edit_item,name="edit_item"),#编辑项目视图
    path("edit_function/",views.edit_function,name="edit_function"),#运行多条用例的视图路由配置
    path("edit_details/",views.edit_details,name="edit_details"),#显示运行结果
]