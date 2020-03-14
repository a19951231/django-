function Url(){
    var self=this;
    self.hjwrapper=$('.hj-wrapper');
    self.delete_btn=$(".btn-danger");
    self.masknone=$('.mask-none');
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
Url.prototype.hideEvent=function(){
    var self=this;
    var host_name=$('#host_name').val("");
    var host_url=$('#host_url').val("");
    var describe=$('#describe').val("");
    self.hjwrapper.hide();
};

Url.prototype.showEvent=function(){
    var self=this;
    self.hjwrapper.show();
};


Url.prototype.listenShowHideEvent=function(){
    var self=this;
    var siginBtn=$('#add-hj');
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

Url.prototype.addbtnEvent=function(){
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
                    setTimeout(function(){
                        window.location="/url_pz/"
                   },1000);
                }
            }
        });

    });
};
Url.prototype.noneshowEvent=function(){
    var self=this;
    self.masknone.show();
};
Url.prototype.nonehideEvent=function(){
    var self=this;
    self.masknone.hide();
};

Url.prototype.detelebtnEvent=function(){
    var self=this;
    self.delete_btn.click(function(){
        self.noneshowEvent();
    });
};

Url.prototype.deleteShowHideEvent=function(){
    console.log("点击删除已执行")
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
                    setTimeout(function(){
                        window.location="/url_pz/"
                   },1000);
                }
            }
        });
    });
    self.liurl.attr("class","active-menu").siblings().removeClass('active-menu');
};

Url.prototype.editbtnEvent=function(){
    var self=this;
    var btnprimary=$(".btn-edit");
    var edititembtn=$(".edit-item-btn");
    var id="";
    var host_name="";
    var host_url="";
    var describe="";
    btnprimary.click(function(){
        self.showEvent();
        edititembtn.show();
        self.titlexm.text("编辑环境");
        var currentBtn = $(this);
        var tr = currentBtn.parent();
        id=tr.attr("id");
        host_name=tr.attr("host_name");
        host_url=tr.attr("host_url");
        describe=tr.attr("describe");
        var host_name1=$('#host_name').val(host_name);
        var host_url1=$('#host_url').val(host_url);
        var describe1=$('#describe').val(describe);
        console.log(describe1)
        edititembtn.click(function(){
            var host_name2=$('#host_name').val();
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
                    setTimeout(function(){
                        window.location="/url_pz/"
                    },1000);
                    self.titlexm.text("添加项目");
                }
            }
        });
        });
    });
};

jq331(function($){
    var url=new Url();
    url.run();
});