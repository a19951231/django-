//这里是执行添加编辑删除分类的js代码


function NewsCategory(){

};

NewsCategory.prototype.run=function(){//定义跑的方法
    var self=this;
    self.listenAddCategoryEvent();//这里是执行listenAddCategoryEvent()丰富
    self.listenEditCategoryEvent();
    self.listenDeleteCategoryEvent();
    //window.location.reload();
};

NewsCategory.prototype.listenAddCategoryEvent=function(){//定义执行添加分类的所有js方法
    var addBtn=$('#add-btn');//获取id为add-btn位置
    addBtn.click(function(){//点击事件监控
        xfzalert.alertOneInput({//调用xfzajax方法里的alertOneInput
            'title':'文章分类',//对title进行重写
            'placeholder':'请输入分类名称',
            'confirmCallback':function(inpuValue){//confirmCallback是请求方法
                xfzajax.post({
                    'url':'/cms/add_news_category/',
                    'data':{
                        'name':inpuValue,
                    },
                    'success':function(result){
                        console.log("222");
                        if(result['code']==200){
                            console.log("已经执行成功");
                            xfzalert.close();
                            window.location.reload();
                            //window.location.reload();
                        }else{
                        xfzalert.close();
                        }
                    }
                });
            }
        });
    });
};

NewsCategory.prototype.listenEditCategoryEvent = function () {
    var self = this;
    var editBtn = $(".edit-btn");
    editBtn.click(function () {
        var currentBtn = $(this);
        var tr = currentBtn.parent().parent();
        var pk = tr.attr('data-pk');
        var name = tr.attr('data-name');
        xfzalert.alertOneInput({
            'title': '修改分类名称',
            'placeholder': '请输入新的分类名称',
            'value': name,
            'confirmCallback': function (inputValue) {
                xfzajax.post({
                    'url': '/cms/edit_news_category/',
                    'data': {
                        'pk': pk,
                        'name': inputValue
                    },
                    'success': function (result) {
                        if(result['code'] === 200){
                            xfzalert.close();
                            window.location.reload();
                        }else{
                            xfzalert.close();
                        }
                    }
                });
            }
        });
    });
};

NewsCategory.prototype.listenDeleteCategoryEvent = function () {
    var deleteBtn = $(".delete-btn");
    deleteBtn.click(function () {
        var currentBtn = $(this);//这里的$(this)就是获取deleteBtn.click的位置，就是我点击的位置
        var tr = currentBtn.parent().parent();//然后这里parent()是获取点击事件的父级的位置，2个parent是获取deleteBtn.click点击位置的父级的父级
        //news_category.html这个文件里的js
        var pk = tr.attr('data-pk');//然后这里是获取deleteBtn.click点击事件的位置父级父级的data-pk里的属性
        xfzalert.alertConfirm({//然后这里是调用xfzalertjs文件里的alertConfirm确定点击事件
            'title': '您确定要删除这个分类吗？',//这里是重写title标题内容
            'confirmCallback': function () {//这里是当我们点击确定的点击事件
                xfzajax.post({//执行post请求
                    'url': '/cms/delete_news_category/',
                    'data': {
                        'pk': pk
                    },
                    'success': function (result) {
                        if(result['code'] === 200){
                            xfzalert.close();
                            window.location.reload();
                        }
                    }
                });
            }
        });
    });
};

$(function(){
    var category=new NewsCategory();
    category.run();//执行run方法
    console.log("已经执行");//打印日志
});