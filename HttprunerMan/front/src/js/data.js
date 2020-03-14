//这个是data.html上的js代码
function Data(){
    var self=this;
    self.maskWrapper=$('.mask-wrapper');
    self.delete_btn=$(".btn-danger");
    self.masknone=$('.mask-none');
    self.titlexm=$("#title-xm");
    self.lixm=$("#li-xm");
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

Data.prototype.hideEvent=function(){
    var self=this;
    var project_name=$('#project_name').val("");
    var responsible_name=$('#responsible_name').val("");
    var test_user=$('#test_user').val("");
    var dev_user=$('#dev_user').val("");
    var publish_app=$('#publish_app').val("");
    var simple_desc=$('#simple_desc').val("");
    var other_desc=$('#other_desc').val("");
    self.maskWrapper.hide();
};

Data.prototype.showEvent=function(){
    var self=this;
    self.maskWrapper.show();
};

Data.prototype.listenShowHideEvent=function(){
    var self=this;
    var siginBtn=$('#add-xm');
    var closeBtn=$('.close-btn');
    var cleanBten=$('.submit-btn-red');
    var submitbtnbule=$("#submit-btn-bule");
    var edititembtn=$("#edit-item-btn");
    siginBtn.click(function(){
        self.showEvent();
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

Data.prototype.addbtnEvent=function(){
    var self=this;
    var submitbtn=$('#submit-btn-bule');
    submitbtn.click(function(){
        var project_name=$('#project_name').val();
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
                    setTimeout(function(){
                        window.location="/jk/"
                   },1000);
                }
            }
        });
        edititembtn.attr('id','submit-btn-bule');
    });
};

Data.prototype.noneshowEvent=function(){
    var self=this;
    self.masknone.show();
};
Data.prototype.nonehideEvent=function(){
    var self=this;
    self.masknone.hide();
};

Data.prototype.detelebtnEvent=function(){
    var self=this;
    self.delete_btn.click(function(){
        self.noneshowEvent();
    });
};
Data.prototype.deleteShowHideEvent=function(){
    var self=this;
    var id="";
    var closeBtn=$('.close-btn1');
    var cleanBten=$('.cancel-btn');
    var delete_red=$('.delete-btn-red');
    self.delete_btn.click(function(){
        var currentBtn = $(this);
        var tr = currentBtn.parent();
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
                    setTimeout(function(){
                        window.location="/jk/"
                   },1000);
                }
            }
        });
    });
    self.lixm.attr("class","active-menu").siblings().removeClass('active-menu');
};

Data.prototype.editbtnEvent=function(){
    var self=this;
    var btnprimary=$(".btn-edit");
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
        var currentBtn = $(this);
        var tr = currentBtn.parent();
        id=tr.attr("id");
        project_name=tr.attr("project_name");
        responsible_name=tr.attr("responsible_name");
        test_user=tr.attr("test_user");
        dev_user=tr.attr("dev_user");
        publish_app=tr.attr("publish_app");
        simple_desc=tr.attr("simple_desc");
        other_desc=tr.attr("other_desc");
        var project_name1=$('#project_name').val(project_name);
        var responsible_name1=$('#responsible_name').val(responsible_name);
        var test_user1=$('#test_user').val(test_user);
        var dev_user1=$('#dev_user').val(dev_user);
        var publish_app1=$('#publish_app').val(publish_app);
        var simple_desc1=$('#simple_desc').val(simple_desc);
        var other_desc1=$('#other_desc').val(other_desc);
        console.log(other_desc1)
        edititembtn.click(function(){
            var project_name2=$('#project_name').val();
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
                    setTimeout(function(){
                        window.location="/jk/"
                    },1000);
                    self.titlexm.text("添加项目");
                }
            }
        });
        });
    });
};

Data.prototype.editFunctionEvent=function(){
    var self=this;
    var id="";
    var successBtn=$('.btn-success');
    console.log("运行多条用例")
    successBtn.click(function(){
        var currentBtn = $(this);
        var tr = currentBtn.parent();
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

Data.prototype.detailsshowEvent=function(){
    var self=this;
    self.detailswrapper.show();
};
Data.prototype.detailshideEvent=function(){
    var self=this;
    self.detailswrapper.hide();
};
Data.prototype.detailsShowHideEvent=function(){
    var self=this;
    var id="";
    var state="";
    var btnbule=$(".btn-bule");
    var closeBtn=$('#x-eee-btn');
    closeBtn.click(function(){
        self.detailshideEvent();
        $("#start-tr").hide();
        $("tr").remove("#end-tr");

    });
    btnbule.click(function(){
        var currentBtn = $(this);
        var tr = currentBtn.parent();
        id=tr.attr("id");
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
                        var tpl=template("data-list",{"datalist":time_box});
                        var ul=$(".tbody-use");
                        ul.append(tpl);
                    }
                }
            }
        });
    });
};


jq331(function($){
    var data=new Data();
    data.run();
    self.lixm.attr("class","active-menu").siblings().removeClass('active-menu');
});