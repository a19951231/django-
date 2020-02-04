from django.urls import path
from cms import views
from cms.entry_name import views as view
app_name="cms"
urlpatterns = [
    path("",views.index,name="index"),#首页视图
    path("add_item/",view.add_item,name="add_item"),#添加项目视图
    #path("delete_item/",view.delete_item,name="delete_item"),#删除项目视图
    path("dl/",views.dl,name="dl"),#首页视图
    path("time_box/",views.time_box,name="time_box"),#返回报告时间的视图
    path("all_calculation/",views.all_calculation,name="all_calculation"),
    path("all_calculation1/",views.all_calculation1,name="all_calculation1"),
    path("a/",views.a,name="a"),
]