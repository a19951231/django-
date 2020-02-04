from django.urls import path
from cms.url_configuration import views
app_name="url_configuration"
urlpatterns = [
    path("",views.url_pz,name="url_pz"),#打开环境列表页面
    path("add_url/",views.add_url,name="add_url"),#添加环境
    path("delete_url/",views.delete_url,name="delete_url"),#删除环境
    path("edit_url/",views.edit_url,name="edit_url"),#编辑环境
]