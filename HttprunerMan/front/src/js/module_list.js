//这个是module_list.html上的js代码
function Module(){
    var self=this;
    self.maskWrapper=$('.module-wrapper');
    self.delete_btn=$(".btn-danger");
    self.masknone=$('.mask-none');
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

Module.prototype.hideEvent=function(){
    var self=this;
    var module_name=$('#module_name').val("");
    var module_name1=$('#module_name1').val("");
    var module_order=$("#module_order").val("");
    var belong_project=$('.belong_project').val("");
    var simple_desc=$('#simple_desc').val("");
    var other_desc=$('#other_desc').val("");
    self.maskWrapper.hide();
};

Module.prototype.showEvent=function(){
    var self=this;
    self.maskWrapper.show();
};

Module.prototype.listenShowHideEvent=function(){
    var self=this;
    var siginBtn=$('#add-mk');
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

Module.prototype.addbtnEvent=function(){
    var submitbtn=$('#submit-btn-bule');
    submitbtn.click(function(){
        var module_name=$('#module_name').val();
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
                    setTimeout(function(){
                        window.location="/mk/"
                    },900);

                }
            }
        });
        edititembtn.attr('id','submit-btn-bule');
    });
};

Module.prototype.noneshowEvent=function(){
    var self=this;
    self.masknone.show();
};
Module.prototype.nonehideEvent=function(){
    var self=this;
    self.masknone.hide();
};

Module.prototype.detelebtnEvent=function(){
    var self=this;
    self.delete_btn.click(function(){
        self.noneshowEvent();
    });
};

Module.prototype.deleteShowHideEvent=function(){
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
            'url': '/mk/delete_module/',
            'data': {
                "id":id,
            },
            'success': function (result) {
                if(result['code'] === 200){
                    window.messageBox.show(result["message"]);
                    setTimeout(function(){
                        window.location="/mk/"
                    },900);
                }
            }
        });
    });
    self.limodule.attr("class","active-menu").siblings().removeClass('active-menu');
};

Module.prototype.editbtnEvent=function(){
    var self=this;
    var btnprimary=$(".btn-edit");
    var edititembtn=$(".edit-item-btn");
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
        var currentBtn = $(this);
        var tr = currentBtn.parent();
        id=tr.attr("id");
        module_name=tr.attr("module_name");
        module_name1=tr.attr("test_user");
        belong_project=tr.attr("belong_project");
        module_order=tr.attr("module_order");
        console.log(belong_project)
        simple_desc=tr.attr("simple_desc");
        other_desc=tr.attr("other_desc");
        var module_name11=$('#module_name').val(module_name);
        var module_name12=$('#module_name1').val(module_name1);
        var belong_project1=$('#belong_project').val(belong_project);
        var module_order1=$('#module_order').val(module_order);
        console.log("=")
        console.log(belong_project1)
        var simple_desc1=$('#simple_desc').val(simple_desc);
        var other_desc1=$('#other_desc').val(other_desc);
        console.log(other_desc1)
        edititembtn.click(function(){
            var module_name13=$('#module_name').val();
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
                    setTimeout(function(){
                        window.location="/mk/"
                    },1000);
                    self.titlexm.text("添加模块");
                }
            }
        });
        });
    });
};

jq331(function($){
    var self=this;
    var module=new Module();
    console.log("执行");
    module.run();
    self.limodule.attr("class","active-menu").siblings().removeClass('active-menu');
});