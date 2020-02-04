from django.urls import path
from cms.other_functions import views
app_name="other"
urlpatterns = [
    path("user_functions/",views.user_functions,name="user_functions"),#打开用户信息列表页面
    path("user_liset/",views.user_list,name="user_list"),#用户信息返回视图
    path("change_password/",views.change_password,name="change_password"),#打开修改密码页面
    path("post_password/",views.post_password,name="post_password"),#修改密码视图
]