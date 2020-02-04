function Url(){
    var self=this;
    self.hjwrapper=$('.hj-wrapper');//先找到class属性为hj-wrapper
    self.delete_btn=$(".btn-danger");//获取删除按钮位置
    self.masknone=$('.mask-none');//先找到class属性为mask-none
    self.titlexm=$("#title-hj");
    self.liurl=$("#li-url")
};
Url.prototype.run=function(){
    var self=this;
    self.listenShowHideEvent();
    self.editbtnEvent();
    self.addbtnEvent();
    self.deleteShowHideEvent();
};
Url.prototype.hideEvent=function(){//这个方法是隐藏事件
    var self=this;
    var host_name=$('#host_name').val("");//清空文本信息
    var host_url=$('#host_url').val("");
    var describe=$('#describe').val("");
    self.hjwrapper.hide();//hide()是隐藏，把hjWrapper隐藏
};

Url.prototype.showEvent=function(){//这个是展示事件
    var self=this;
    self.hjwrapper.show();//把这个hjWrapper属性显示出来，show()是显示
};


Url.prototype.listenShowHideEvent=function(){//这个是监听展示与隐藏事件方法
    var self=this;
    var siginBtn=$('#add-hj');//这里是获取id为add-hj的位置,这个是添加按钮
    var closeBtn=$('.close-btn');//这个是x按钮
    var cleanBten=$('.submit-btn-red');//这个是取消按钮
    var submitbtnbule=$("#submit-btn-bule");//这个是保存按钮
    var edititembtn=$("#edit-item-btn");//这个是编辑按钮
    siginBtn.click(function(){
        self.showEvent();//当我们点击登录就执行显示的事件方法
        submitbtnbule.show();
    });
    closeBtn.click(function(){
        submitbtnbule.hide();
        edititembtn.hide();
        self.titlexm.text("添加环境");
        self.hideEvent();
    });
    cleanBten.click(function(){
        submitbtnbule.hide();
        edititembtn.hide();
        self.titlexm.text("添加环境");
        self.hideEvent();
    });
};

Url.prototype.addbtnEvent=function(){//这个是添加项目的ajax请求
    var self=this;
    var submitbtn=$('#submit-btn-bule');
    submitbtn.click(function(){
        var host_name=$('#host_name').val();
        var host_url=$('#host_url').val();
        var describe=$('#describe').val();
        xfzajax.post({
            'url': '/url_pz/add_url/',
            'data': {
                "host_name":host_name,
                "host_url":host_url,
                "describe":describe,
            },
            'success': function (result) {
                if(result['code'] === 200){
                    window.messageBox.show(result["message"]);
                    console.log("已执行===")
                    setTimeout(function(){//设置计时器
                        window.location="/url_pz/"
                   },1000);
                }
            }
        });
        //edititembtn.attr('id','submit-btn-bule');//修改id属性
    });
};
Url.prototype.noneshowEvent=function(){//这个是提示框展示事件
    var self=this;
    self.masknone.show();//把这个maskWrapper属性显示出来，show()是显示
};
Url.prototype.nonehideEvent=function(){//这个方法是隐藏提示框事件
    var self=this;
    self.masknone.hide();//hide()是隐藏，把maskWrapper隐藏
};

Url.prototype.detelebtnEvent=function(){//点击删除按钮弹出提示框的js事件
    var self=this;
    self.delete_btn.click(function(){
        self.noneshowEvent();
    });
};

Url.prototype.deleteShowHideEvent=function(){//这个是监听展示与隐藏提示框事件方法包括ajax请求
    console.log("点击删除已执行")
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
        console.log(id);
    });
    closeBtn.click(function(){
        self.nonehideEvent();
    });
    cleanBten.click(function(){
        self.nonehideEvent();
    });
    delete_red.click(function(){
        console.log("点击删除已执行")
        xfzajax.post({
            'url': '/url_pz/delete_url/',
            'data': {
                "id":id,
            },
            'success': function (result) {
                if(result['code'] === 200){
                    window.messageBox.show(result["message"]);
                    setTimeout(function(){//设置计时器
                        window.location="/url_pz/"
                   },1000);
                }
            }
        });
    });
    self.liurl.attr("class","active-menu").siblings().removeClass('active-menu');
};

Url.prototype.editbtnEvent=function(){//这个是编辑环境的ajax请求
    var self=this;
    var btnprimary=$(".btn-edit");//获取编辑按钮的位置
    var edititembtn=$(".edit-item-btn");
    var id="";
    var host_name="";
    var host_url="";
    var describe="";
    btnprimary.click(function(){
        self.showEvent();
        edititembtn.show();
        self.titlexm.text("编辑环境");
        //edititembtn.attr('id','edit-item-btn');//修改id属性
        var currentBtn = $(this);//这里的$(this)就是获取deleteBtn.click的位置，就是我点击的位置
        var tr = currentBtn.parent();//然后这里parent()是获取点击事件的父级的位置，2个parent是获取deleteBtn.click点击位置的父级的父级
        id=tr.attr("id");
        host_name=tr.attr("host_name");
        host_url=tr.attr("host_url");
        describe=tr.attr("describe");
        var host_name1=$('#host_name').val(host_name);//设置文本内容
        var host_url1=$('#host_url').val(host_url);
        var describe1=$('#describe').val(describe);
        console.log(describe1)
        edititembtn.click(function(){
            var host_name2=$('#host_name').val();//清空文本信息
            var host_url2=$('#host_url').val();
            var describe2=$('#describe').val();
            xfzajax.post({
               'url': '/url_pz/edit_url/',
                'data': {
                    "id":id,
                    "host_name":host_name2,
                    "host_url":host_url2,
                    "describe":describe2,
            },
            'success': function (result) {
                if(result['code'] === 200){
                    window.messageBox.show(result["message"]);
                    console.log("已执行编辑===")
                    setTimeout(function(){//设置计时器
                        window.location="/url_pz/"
                    },1000);
                    self.titlexm.text("添加项目");
                }
            }
        });
        });
    });
};

jq331(function($){//这里就使用jq331这个jqbie名进行调用jq版本3.3.1
    var url=new Url();
    console.log("执行======");//打印日志
    url.run();//当所有元素加载出来会执行run方法
});