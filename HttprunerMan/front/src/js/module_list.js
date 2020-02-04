//这个是module_list.html上的js代码
function Module(){
    var self=this;
    self.maskWrapper=$('.module-wrapper');//先找到class属性为mask-wrapper
    self.delete_btn=$(".btn-danger");//获取删除按钮位置
    self.masknone=$('.mask-none');//先找到class属性为mask-none
    self.titlexm=$("#title-mk");
    self.limodule=$("#li-module");
};
Module.prototype.run=function(){
    var self=this;
    self.listenShowHideEvent();
    self.addbtnEvent();
    self.deleteShowHideEvent();
    self.editbtnEvent();

};

Module.prototype.hideEvent=function(){//这个方法是隐藏事件
    var self=this;
    var module_name=$('#module_name').val("");//清空文本信息
    var module_name1=$('#module_name1').val("");//清空文本信息
    var module_order=$("#module_order").val("");
    var belong_project=$('.belong_project').val("");
    //var test_user1=('#test_user').val("");
    var simple_desc=$('#simple_desc').val("");
    var other_desc=$('#other_desc').val("");
    self.maskWrapper.hide();//hide()是隐藏，把maskWrapper隐藏
};

Module.prototype.showEvent=function(){//这个是展示事件
    var self=this;
    self.maskWrapper.show();//把这个maskWrapper属性显示出来，show()是显示
};

Module.prototype.listenShowHideEvent=function(){//这个是监听展示与隐藏事件方法
    var self=this;
    var siginBtn=$('#add-mk');//这里是获取id为add-xm的位置
    var closeBtn=$('.close-btn');//x按钮
    var cleanBten=$('.submit-btn-red');//取消按钮
    var submitbtnbule=$("#submit-btn-bule");//保存按钮
    var edititembtn=$("#edit-item-btn");
    siginBtn.click(function(){
        self.showEvent();
        submitbtnbule.show();
    });
    closeBtn.click(function(){
        submitbtnbule.hide();
        edititembtn.hide();
        self.titlexm.text("添加模块");
        self.hideEvent();
    });
    cleanBten.click(function(){
        submitbtnbule.hide();
        edititembtn.hide();
        self.titlexm.text("添加模块");
        self.hideEvent();
    });
};

Module.prototype.addbtnEvent=function(){//这个是添加项目的ajax请求
    var self=this;
    var submitbtn=$('#submit-btn-bule');
    submitbtn.click(function(){
        var module_name=$('#module_name').val();//获取文本信息
        var module_name1=$('#module_name1').val();
        var belong_project=$('#belong_project').val();
        console.log(belong_project);
        var simple_desc=$('#simple_desc').val();
        var other_desc=$('#other_desc').val();
        var module_order=$('#module_order').val();
        console.log(other_desc);
        xfzajax.post({
            'url': '/mk/add_module/',
            'data': {
                "module_name":module_name,
                "test_user":module_name1,
                "belong_project":belong_project,
                "simple_desc":simple_desc,
                "other_desc":other_desc,
                "module_order":module_order,
            },
            'success': function (result) {
                if(result['code'] === 200){
                    window.messageBox.show(result["message"]);
                    setTimeout(function(){//设置计时器
                        window.location="/mk/"
                    },900);

                }
            }
        });
        edititembtn.attr('id','submit-btn-bule');//修改id属性
    });
};

Module.prototype.noneshowEvent=function(){//这个是提示框展示事件
    var self=this;
    self.masknone.show();//把这个maskWrapper属性显示出来，show()是显示
};
Module.prototype.nonehideEvent=function(){//这个方法是隐藏提示框事件
    var self=this;
    self.masknone.hide();//hide()是隐藏，把maskWrapper隐藏
};

Module.prototype.detelebtnEvent=function(){//点击删除按钮弹出提示框的js事件
    var self=this;
    self.delete_btn.click(function(){
        self.noneshowEvent();
    });
};

Module.prototype.deleteShowHideEvent=function(){//这个是监听展示与隐藏提示框事件方法包括ajax请求
    var self=this;
    var id="";
    var closeBtn=$('.close-btn1');//获取x按钮
    var cleanBten=$('.cancel-btn');//获取取消按钮
    var delete_red=$('.delete-btn-red');//获取删除按钮
    self.delete_btn.click(function(){
        var currentBtn = $(this);//这里的$(this)就是获取deleteBtn.click的位置，就是我点击的位置
        var tr = currentBtn.parent();//然后这里parent()是获取点击事件的父级的位置，2个parent是获取deleteBtn.click点击位置的父级的父级
        id=tr.attr("id");
        console.log(id)
        self.noneshowEvent();
        console.log("========");
        console.log(id);
    });
    closeBtn.click(function(){
        self.nonehideEvent();
    });
    cleanBten.click(function(){
        self.nonehideEvent();
    });
    delete_red.click(function(){
        xfzajax.post({
            'url': '/mk/delete_module/',
            'data': {
                "id":id,
            },
            'success': function (result) {
                if(result['code'] === 200){
                    window.messageBox.show(result["message"]);
                    setTimeout(function(){//设置计时器
                        window.location="/mk/"
                    },900);
                }
            }
        });
    });
    self.limodule.attr("class","active-menu").siblings().removeClass('active-menu');//如果添加这里，我们跳转这个页面就需要执行这个代码
};

Module.prototype.editbtnEvent=function(){//这个是编辑项目的ajax请求
    var self=this;
    var btnprimary=$(".btn-edit");//获取编辑按钮的位置
    var edititembtn=$(".edit-item-btn");//获取页面的编辑按钮
    var id="";
    var module_name="";
    var module_name1="";
    var belong_project="";
    var simple_desc="";
    var other_desc="";
    var module_order="";
    btnprimary.click(function(){
        self.showEvent();
        edititembtn.show();
        self.titlexm.text("编辑模块");
        //edititembtn.attr('id','edit-item-btn');//修改id属性
        var currentBtn = $(this);//这里的$(this)就是获取deleteBtn.click的位置，就是我点击的位置
        var tr = currentBtn.parent();//然后这里parent()是获取点击事件的父级的位置，2个parent是获取deleteBtn.click点击位置的父级的父级
        id=tr.attr("id");
        module_name=tr.attr("module_name");
        module_name1=tr.attr("test_user");
        belong_project=tr.attr("belong_project");
        module_order=tr.attr("module_order");
        console.log(belong_project)
        simple_desc=tr.attr("simple_desc");
        other_desc=tr.attr("other_desc");
        var module_name11=$('#module_name').val(module_name);//设置文本内容
        var module_name12=$('#module_name1').val(module_name1);
        var belong_project1=$('#belong_project').val(belong_project);
        var module_order1=$('#module_order').val(module_order);
        console.log("=")
        console.log(belong_project1)
        var simple_desc1=$('#simple_desc').val(simple_desc);
        var other_desc1=$('#other_desc').val(other_desc);
        console.log(other_desc1)
        edititembtn.click(function(){
            var module_name13=$('#module_name').val();//设置文本内容
            var module_name14=$('#module_name1').val();
            var belong_project2=$('#belong_project').val();
            var simple_desc2=$('#simple_desc').val();
            var other_desc2=$('#other_desc').val();
            var module_order2=$('#module_order').val();
            xfzajax.post({
               'url': '/mk/edit_module/',
                'data': {
                    "id":id,
                    "module_name":module_name13,
                    "test_user":module_name14,
                    "belong_project":belong_project2,
                    "simple_desc":simple_desc2,
                    "other_desc":other_desc2,
                    "module_order":module_order2,
            },
            'success': function (result) {
                if(result['code'] === 200){
                    window.messageBox.show(result["message"]);
                    console.log("已执行编辑===")
                    setTimeout(function(){//设置计时器
                        window.location="/mk/"
                    },1000);
                    self.titlexm.text("添加模块");
                }
            }
        });
        });
    });
};

jq331(function($){//这里就使用jq331这个jqbie名进行调用jq版本3.3.1
    var self=this;
    var module=new Module();
    console.log("执行");//打印日志
    module.run();//当所有元素加载出来会执行run方法
    self.limodule.attr("class","active-menu").siblings().removeClass('active-menu');//如果添加这里，我们跳转这个页面就需要执行这个代码
});