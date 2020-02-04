from django.urls import path
from cms.cms_user import views

app_name="cms_user"
urlpatterns=[
    path("login/",views.Login_view.as_view(),name="login"),
    path("logout/",views.Logout_view.as_view(),name="logout"),#退出成功视图
    path("",views.index,name="index"),
]