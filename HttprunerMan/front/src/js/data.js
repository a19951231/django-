//这个是data.html上的js代码
function Data(){
    var self=this;
    self.maskWrapper=$('.mask-wrapper');//先找到class属性为mask-wrapper
    self.delete_btn=$(".btn-danger");//获取删除按钮位置
    self.masknone=$('.mask-none');//先找到class属性为mask-none
    self.titlexm=$("#title-xm");
    self.lixm=$("#li-xm");//id为li-xm的位置
    self.detailswrapper=$(".many-use-wrapper");
};
Data.prototype.run=function(){
    var self=this;
    self.listenShowHideEvent();
    self.editbtnEvent();
    self.addbtnEvent();
    self.deleteShowHideEvent();
    self.editFunctionEvent();
    self.detailsShowHideEvent();
};

Data.prototype.hideEvent=function(){//这个方法是隐藏事件
    var self=this;
    var project_name=$('#project_name').val("");//清空文本信息
    var responsible_name=$('#responsible_name').val("");
    var test_user=$('#test_user').val("");
    var dev_user=$('#dev_user').val("");
    var publish_app=$('#publish_app').val("");
    var simple_desc=$('#simple_desc').val("");
    var other_desc=$('#other_desc').val("");
    self.maskWrapper.hide();//hide()是隐藏，把maskWrapper隐藏
};

Data.prototype.showEvent=function(){//这个是展示事件
    var self=this;
    self.maskWrapper.show();//把这个maskWrapper属性显示出来，show()是显示
};

Data.prototype.listenShowHideEvent=function(){//这个是监听展示与隐藏事件方法
    var self=this;
    var siginBtn=$('#add-xm');//这里是获取id为add-xm的位置
    var closeBtn=$('.close-btn');
    var cleanBten=$('.submit-btn-red');
    var submitbtnbule=$("#submit-btn-bule");
    var edititembtn=$("#edit-item-btn");
    siginBtn.click(function(){
        self.showEvent();//当我们点击登录就执行显示的事件方法
        submitbtnbule.show();
    });
    closeBtn.click(function(){
        submitbtnbule.hide();
        edititembtn.hide();
        self.titlexm.text("添加项目");
        self.hideEvent();
    });
    cleanBten.click(function(){
        submitbtnbule.hide();
        edititembtn.hide();
        self.titlexm.text("添加项目");
        self.hideEvent();
    });
};

Data.prototype.addbtnEvent=function(){//这个是添加项目的ajax请求
    var self=this;
    var submitbtn=$('#submit-btn-bule');
    submitbtn.click(function(){
        var project_name=$('#project_name').val();//清空文本信息
        var responsible_name=$('#responsible_name').val();
        var test_user=$('#test_user').val();
        var dev_user=$('#dev_user').val();
        var publish_app=$('#publish_app').val();
        var simple_desc=$('#simple_desc').val();
        var other_desc=$('#other_desc').val();
        console.log(other_desc);
        xfzajax.post({
            'url': '/jk/add_item/',
            'data': {
                "project_name":project_name,
                "responsible_name":responsible_name,
                "test_user":test_user,
                "dev_user":dev_user,
                "publish_app":publish_app,
                "simple_desc":simple_desc,
                "other_desc":other_desc,
            },
            'success': function (result) {
                if(result['code'] === 200){
                    window.messageBox.show(result["message"]);
                    console.log("已执行===")
                    setTimeout(function(){//设置计时器
                        window.location="/jk/"
                   },1000);
                }
            }
        });
        edititembtn.attr('id','submit-btn-bule');//修改id属性
    });
};

Data.prototype.noneshowEvent=function(){//这个是提示框展示事件
    var self=this;
    self.masknone.show();//把这个maskWrapper属性显示出来，show()是显示
};
Data.prototype.nonehideEvent=function(){//这个方法是隐藏提示框事件
    var self=this;
    self.masknone.hide();//hide()是隐藏，把maskWrapper隐藏
};

Data.prototype.detelebtnEvent=function(){//点击删除按钮弹出提示框的js事件
    var self=this;
    self.delete_btn.click(function(){
        self.noneshowEvent();
    });
};
Data.prototype.deleteShowHideEvent=function(){//这个是监听展示与隐藏提示框事件方法包括ajax请求
    var self=this;
    var id="";
    var closeBtn=$('.close-btn1');
    var cleanBten=$('.cancel-btn');
    var delete_red=$('.delete-btn-red');
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
            'url': '/xm/delete_item/',
            'data': {
                "id":id,
            },
            'success': function (result) {
                if(result['code'] === 200){
                    window.messageBox.show(result["message"]);
                    setTimeout(function(){//设置计时器
                        window.location="/jk/"
                   },1000);
                }
            }
        });
    });
    self.lixm.attr("class","active-menu").siblings().removeClass('active-menu');
};

Data.prototype.editbtnEvent=function(){//这个是编辑项目的ajax请求
    var self=this;
    var btnprimary=$(".btn-edit");//获取编辑按钮的位置
    var edititembtn=$(".edit-item-btn");
    var id="";
    var project_name="";
    var responsible_name="";
    var test_user="";
    var dev_user="";
    var publish_app="";
    var simple_desc="";
    var other_desc="";
    btnprimary.click(function(){
        self.showEvent();
        edititembtn.show();
        self.titlexm.text("编辑项目");
        //edititembtn.attr('id','edit-item-btn');//修改id属性
        var currentBtn = $(this);//这里的$(this)就是获取deleteBtn.click的位置，就是我点击的位置
        var tr = currentBtn.parent();//然后这里parent()是获取点击事件的父级的位置，2个parent是获取deleteBtn.click点击位置的父级的父级
        id=tr.attr("id");
        project_name=tr.attr("project_name");
        responsible_name=tr.attr("responsible_name");
        test_user=tr.attr("test_user");
        dev_user=tr.attr("dev_user");
        publish_app=tr.attr("publish_app");
        simple_desc=tr.attr("simple_desc");
        other_desc=tr.attr("other_desc");
        var project_name1=$('#project_name').val(project_name);//设置文本内容
        var responsible_name1=$('#responsible_name').val(responsible_name);
        var test_user1=$('#test_user').val(test_user);
        var dev_user1=$('#dev_user').val(dev_user);
        var publish_app1=$('#publish_app').val(publish_app);
        var simple_desc1=$('#simple_desc').val(simple_desc);
        var other_desc1=$('#other_desc').val(other_desc);
        console.log(other_desc1)
        edititembtn.click(function(){
            var project_name2=$('#project_name').val();//清空文本信息
            var responsible_name2=$('#responsible_name').val();
            var test_user2=$('#test_user').val();
            var dev_user2=$('#dev_user').val();
            var publish_app2=$('#publish_app').val();
            var simple_desc2=$('#simple_desc').val();
            var other_desc2=$('#other_desc').val();
            xfzajax.post({
               'url': '/xm/edit_item/',
                'data': {
                    "id":id,
                    "project_name":project_name2,
                    "responsible_name":responsible_name2,
                    "test_user":test_user2,
                    "dev_user":dev_user2,
                    "publish_app":publish_app2,
                    "simple_desc":simple_desc2,
                    "other_desc":other_desc2,
            },
            'success': function (result) {
                if(result['code'] === 200){
                    window.messageBox.show(result["message"]);
                    console.log("已执行编辑===")
                    setTimeout(function(){//设置计时器
                        window.location="/jk/"
                    },1000);
                    self.titlexm.text("添加项目");
                }
            }
        });
        });
    });
};

Data.prototype.editFunctionEvent=function(){//这个是多条条用例运行事件
    var self=this;
    var id="";
    var successBtn=$('.btn-success');//获取点击运行按钮位置
    console.log("运行多条用例")
    successBtn.click(function(){
        var currentBtn = $(this);//这里的$(this)就是获取deleteBtn.click的位置，就是我点击的位置
        var tr = currentBtn.parent();//然后这里parent()是获取点击事件的父级的位置，2个parent是获取deleteBtn.click点击位置的父级的父级
        id=tr.attr("id");
        console.log(id)
        xfzajax.post({
            'url': '/xm/edit_function/',
            'data': {
                "id":id,
            },
            'success': function (result) {
                if(result['code'] === 200){
                    window.messageBox.show(result["message"]);
                }
            }
        });
    });

};

Data.prototype.detailsshowEvent=function(){//这个是显示用例运行详情框
    var self=this;
    self.detailswrapper.show();//show()是显示
};
Data.prototype.detailshideEvent=function(){//这个方法是隐藏用例运行详情框
    var self=this;
    self.detailswrapper.hide();//hide()是隐藏
};
Data.prototype.detailsShowHideEvent=function(){//这个是监听展示与隐藏用例运行详情框方法包括ajax请求
    var self=this;
    var id="";
    var state="";
    var btnbule=$(".btn-bule");//运行结果按钮
    var closeBtn=$('#x-eee-btn');//获取删除按钮
    closeBtn.click(function(){
        self.detailshideEvent();
        $("#start-tr").hide();
        $("tr").remove("#end-tr");//这个是删除thead元素里的class为thead-use这个值
        //$("tbody").remove("#tbody-id");
    });
    btnbule.click(function(){
        var currentBtn = $(this);//这里的$(this)就是获取deleteBtn.click的位置，就是我点击的位置
        var tr = currentBtn.parent();//然后这里parent()是获取点击事件的父级的位置，2个parent是获取deleteBtn.click点击位置的父级的父级
        id=tr.attr("id");
        //state=tr.attr("state");
        console.log(id)
        self.detailsshowEvent();
        xfzajax.post({
            'url': '/xm/edit_details/',
            'data': {
                "id":id,
            },
            'success': function (result) {
                if(result['code'] === 200){
                    var time_box=result["data"];
                    if( time_box=="" ){
                        $("#start-tr").show();
                    }else{
                        $("#start-tr").hide();
                        console.log(time_box)
                        var tpl=template("data-list",{"datalist":time_box});//这里传入我们模板里定义的id,然后模板是通过newses来读取数据，所以这里定义newses并且把我们获取的数据传入进去
                        var ul=$(".tbody-use");//然后我们需要我们获取的数据显示在哪个标签里，这里是显示在class为list-inner-group属性里
                        ul.append(tpl);//然后把我们的tpl放到ul里
                    }
                }
            }
        });
    });
    //self.liuse.attr("class","active-menu").siblings().removeClass('active-menu');
};


jq331(function($){//这里就使用jq331这个jqbie名进行调用jq版本3.3.1
    var data=new Data();
    console.log("执行");//打印日志
    data.run();//当所有元素加载出来会执行run方法
    self.lixm.attr("class","active-menu").siblings().removeClass('active-menu');
});