function Be_use1(){
    var self=this;
    self.delete_btn=$(".all-red-delete");
    self.masknone=$('.mask-none');
    self.xxaddbtn=$("#xxaddbtn");
    self.xxdeletebtn=$("#xxdelete-btn");
    self.dataaddbtn=$("#dataadd-btn");
    self.datadeletebtn=$("#datadelete-btn");
    self.dyaddbtn=$("#dyadd-btn");
    self.dydeletebtn=$("#dydelete-btn");
    self.addextractbtn=$("#add-extract-btn");
    self.deleteextractbtn=$("#delete-extract-btn");
    self.int=0;
    self.data1="xx";
    self.data2="data";
    self.dataint=0;
    self.dataxx=$("#data-xx");
    self.displaywb=$(".display-wb");
    self.datavalue=$("#data_value0");
    self.datafile=$("#data_file0");
    self.typedropdownbox=$("#typedrop-downbox");
    self.dyint=0;
    self.data3="dy";
    self.usewrapper=$('.use-wrapper');
    self.titlexm=$("#title-yl");
    self.data4=$("#extract");
    self.extractint=0;
    self.liuse=$("#li-use");
    self.detailswrapper=$(".details-wrapper");
};
Be_use1.prototype.run=function(){
    var self=this;
    self.listEvent();
    self.radioEvent();
    self.typedropdownboxEvent();
    self.listenShowHideEvent();
    self.addylbtnEvent();
    self.FunctionEvent();
    self.deleteShowHideEvent();
    self.detailsShowHideEvent();
};

Be_use1.prototype.hideEvent=function(){
    var self=this;
    self.usewrapper.hide();
     window.location.reload();
};

Be_use1.prototype.showEvent=function(){
    var self=this;
    self.usewrapper.show();
};

Be_use1.prototype.listenShowHideEvent=function(){
    var self=this;
    var siginBtn=$('#add-yl');
    var closeBtn=$('#x-btn');
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
        self.titlexm.text("添加用例");
        self.hideEvent();
    });
    cleanBten.click(function(){
        submitbtnbule.hide();
        edititembtn.hide();
        self.titlexm.text("添加用例");
        self.hideEvent();
    });
};

Be_use1.prototype.listEvent=function(){
    var self=this;
    var data=self.int
    var dataint=self.dataint;
    var xxaddbtn=$("#xxaddbtn");
    var xxdeletebtn=$("#xxdelete-btn");
    var dataaddbtn=$("#dataadd-btn");
    var datadeletebtn=$("#datadelete-btn");
    var allxxsettings=$("#allxx-settings");
    var dataxx=$("#data-xx");
    var xxsettings=$("#xx-settings");
    var extractsz=$("#extract-sz");
    var dysz=$("#dy-sz");
    var a=xxdeletebtn.prev().prev();
    var zh=a.attr("class");
    self.addextractbtn.click(function(){
        data=self.extractint+=1;
        var c='<div class="content" id="'+"extract"+data+'"><input type="text" id="input-extract'+data+'" class="form-control" name="all_extract" placeholder="请输入提取的值" maxlength="100"></div>'
        extractsz.append(c);
    });
    self.deleteextractbtn.click(function(){
        var currentBtn = $(this);
        if (self.extractint==0){

        }else{
            $("div").remove("#"+"extract"+self.extractint);
            self.extractint-=1;
        };
     });
    self.dyaddbtn.click(function(){
        data=self.dyint+=1;
        var c='<div class="content" id="'+"dy"+data+'"><input  type="text" id="dyinput'+data+'" class="form-keyvalue" name="dy_key" placeholder="请输入要匹配的内容" maxlength="50"><select id="select'+data+'" name="dy_type" class="form-control-select belong_project"><option class="option" value ="等于">等于</option><option class="option" value ="包含">包含括</option></select><input  type="text" id="dytext'+data+'" class="form-keyvalue" name="dy_value" placeholder="请输入匹配的值" maxlength="50"></div>'
        dysz.append(c);
    });
    self.dydeletebtn.click(function(){
        var currentBtn = $(this);
        if (self.dyint==0){

        }else{
            $("div").remove("#"+"dy"+self.dyint);
            self.dyint-=1;
        };
     });
    self.xxaddbtn.click(function(){
        data=self.int+=1;
        console.log("23333"+data)
        var c='<div id="'+self.data1+data+'" class="content" ><input type="text" id="project_name3" class="xx-keyvalue" name="header_key" placeholder="请输入信息头key值" maxlength="100"><textarea  style="overflow:hidden;" id="project_name55" class="xx-keyvalue" name="header_value" placeholder="请输入信息头value值" maxlength="1000"></textarea></div>'
        allxxsettings.append(c);
    });
    self.xxdeletebtn.click(function(){
        var currentBtn = $(this);
        if (self.int==0){

        }else{
            $("div").remove("#"+self.data1+self.int);
            self.int-=1;
        };
     });
    self.dataaddbtn.click(function(){
        dataint=self.dataint+=1;
        console.log("23333"+data)
        var c='<div id="'+"data"+dataint+'" class="content content1"><input type="text" id="input'+dataint+'" class="form-keyvalue" name="data_key" placeholder="请输入data的key值" maxlength="100"><select id="typedrop-downbox'+dataint+'" name="data_type" class="form-control-select belong_project"><option class="option" value ="int">int</option><option class="option" value ="string">string</option><option class="option" value ="list">list</option><option class="option" value ="dict">dict</option><option class="option" value ="mysql">MYSQL</option></select><textarea  style="overflow:hidden;" id="data_value'+dataint+'" class="form-keyvalue" name="data_value" placeholder="请输入data的value值" maxlength="1000"></textarea></div>'
        dataxx.append(c);
    });
    self.datadeletebtn.click(function(){
        var currentBtn = $(this);
        if (self.dataint==0){

        }else{
            $("div").remove("#"+self.data2+self.dataint);
            self.dataint-=1;
        };
    });

};

Be_use1.prototype.xxradiohideEvent=function(){
    var self=this;
    self.dataxx.hide();
};

Be_use1.prototype.xxradioshowEvent=function(){
    var self=this;
    self.dataxx.show();
};

Be_use1.prototype.dataradiohideEvent=function(){
    var self=this;
    self.displaywb.hide();
};

Be_use1.prototype.dataradioshowEvent=function(){
    var self=this;
    self.displaywb.show();
};

Be_use1.prototype.radioEvent=function(){
        var self=this;
        var timer=setInterval(function(){
            var str=$("input[type='radio']:checked").val();
            if (str=="form-data"){
                self.xxradioshowEvent();
                self.dataradiohideEvent();
            }else{
                self.xxradiohideEvent();
                self.dataradioshowEvent();
             }
        },200);
};

Be_use1.prototype.datavaluehideEvent=function(){
    var self=this;
    self.datavalue.hide();
};

Be_use1.prototype.datavalueshowEvent=function(){
    var self=this;
    self.datavalue.show();
};

Be_use1.prototype.datafilehideEvent=function(){
    var self=this;
    self.datafile.hide();
};

Be_use1.prototype.datafileshowEvent=function(){
    var self=this;
    self.datafile.show();
};

Be_use1.prototype.typedropdownboxEvent=function(){
    var self=this;
    var timer=setInterval(function(){
        var typedropdownbox=$("#typedrop-downbox0");
        typedropdownbox.click(function(){
             if (typedropdownbox.val()=="file"){
                 self.datafileshowEvent();
                 self.datavaluehideEvent();
                 }else{
                     self.datavalueshowEvent();
                     self.datafilehideEvent();
                 }
             });
         },200);
};

Be_use1.prototype.addylbtnEvent=function(){
    var self=this;
    var submitbtn=$('#submit-btn-bule');
    submitbtn.click(function(){
        var w=$('input[name="dy_key"]').val()
        console.log("断言的key值："+w)
        var case_name=$("#yl-name").val()
        var case_url=$("#yl-url").val()
        var case_order=$("#yl-order").val()
        var module=$("#correlation-module").val()
        var url_con=$("#correlation-url").val()
        var req=$("#requests-mode").val()
        var header_keylist=[];
        var all_header_key=$('input[name="header_key"]')
        for (var i=0;i<all_header_key.length;i++){
            header_keylist.push(all_header_key.eq(i).val())
        };
        var header_valuelist=[];
        var all_header_value=$('textarea[name="header_value"]')
        for (var i=0;i<all_header_value.length;i++){
            header_valuelist.push(all_header_value.eq(i).val())
        };
        console.log("headervalue值："+header_valuelist)
        var value_type=$("input[type='radio']:checked").val();
        var data_keylist=[];
        var data_typelist=[];
        var data_valuelist=[];
        var json_keyvalue="";
        if (value_type=="form-data"){
            var all_data_key=$('input[name="data_key"]')
            for (var i=0;i<all_data_key.length;i++){
                data_keylist.push(all_data_key.eq(i).val())
            };
            var all_data_type=$('select[name="data_type"]')
            for (var i=0;i<all_data_type.length;i++){
                data_typelist.push(all_data_type.eq(i).val())
            };
            var all_data_value=$('textarea[name="data_value"]')
            for (var i=0;i<all_data_value.length;i++){
                data_valuelist.push(all_data_value.eq(i).val())
            };
        }else{
            json_keyvalue=$('textarea[name="json_keyvalue"]').val();
        };
        //下面是断言取参
        var dy_keylist=[];
        var dy_typelist=[];
        var dy_valuelist=[];
        var all_dy_key=$('input[name="dy_key"]')
        for (var i=0;i<all_dy_key.length;i++){
             dy_keylist.push(all_dy_key.eq(i).val())
        };
        var all_dy_type=$('select[name="dy_type"]')
        for (var i=0;i<all_dy_type.length;i++){
            dy_typelist.push(all_dy_type.eq(i).val())
        };
        var all_dy_value=$('input[name="dy_value"]')
        for (var i=0;i<all_dy_value.length;i++){
            dy_valuelist.push(all_dy_value.eq(i).val())
        };
        //下面是获取提取参数
        var all_extractlist=[];
        var all_extract=$('input[name="all_extract"]')
        for (var i=0;i<all_extract.length;i++){
            all_extractlist.push(all_extract.eq(i).val())
        };
        //下面是获取描述
        var describe=$('textarea[name="describe"]').val()
        xfzajax.post({
            'url': '/use/add_usecase/',
            'data': {
                "case_name":case_name,
                "case_url":case_url,
                "case_order":case_order,
                "module":module,
                "url_con":url_con,
                "req":req,
                "header_key":header_keylist,//
                "header_value":header_valuelist,//
                "value_type":value_type,
                "data_key":data_keylist,//
                "data_type":data_typelist,//
                "data_value":data_valuelist,//
                "json_keyvalue":json_keyvalue,
                "dy_key":dy_keylist,//
                "dy_type":dy_typelist,//
                "dy_value":dy_valuelist,//
                "all_extract":all_extractlist,//
                "describe":describe,
            },
            'success': function (result) {
                if(result['code'] === 200){
                    window.messageBox.show(result["message"]);
                    console.log("已执行===")
                    setTimeout(function(){
                        window.location="/use/"
                   },1000);
                }
            }
        });
    });
};

Be_use1.prototype.FunctionEvent=function(){
    var self=this;
    var id="";
    var successBtn=$('.success-green');
    successBtn.click(function(){
        var currentBtn = $(this);
        var tr = currentBtn.parent();
        id=tr.attr("id");
        console.log(id)
        xfzajax.post({
            'url': '/use/function_usecase/',
            'data': {
                "id":id,
            },
            'success': function (result) {
                if(result['code'] === 200){
                    window.messageBox.show(result["message"]);
                    setTimeout(function(){
                        window.location="/use/"
                   },1000);
                }
            }
        });
    });

};

Be_use1.prototype.noneshowEvent=function(){
    var self=this;
    self.masknone.show();
};
Be_use1.prototype.nonehideEvent=function(){
    var self=this;
    self.masknone.hide();
    btnbule
};

Be_use1.prototype.detelebtnEvent=function(){
    var self=this;
    self.delete_btn.click(function(){
        self.noneshowEvent();
    });
};

Be_use1.prototype.deleteShowHideEvent=function(){
    console.log("点击删除已执行")
    var self=this;
    var id="";
    var closeBtn=$('.close-btn1');
    var cleanBten=$('#bule-delete');
    var delete_red=$('#red-delete');
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
            'url': '/use/delete_use/',
            'data': {
                "id":id,
            },
            'success': function (result) {
                if(result['code'] === 200){
                    window.messageBox.show(result["message"]);
                    setTimeout(function(){
                        window.location="/use/"
                   },1000);
                }
            }
        });
    });
    self.liuse.attr("class","active-menu").siblings().removeClass('active-menu');
};

Be_use1.prototype.detailsshowEvent=function(){
    var self=this;
    self.detailswrapper.show();
};
Be_use1.prototype.detailshideEvent=function(){
    var self=this;
    self.detailswrapper.hide();
};

Be_use1.prototype.detailsShowHideEvent=function(){
    var self=this;
    var id="";
    var state="";
    var btnbule=$(".btn-bule");
    var closeBtn=$('#x-close-btn');
    closeBtn.click(function(){
        self.detailshideEvent();
        $("#thead-use-id").hide();
        $("#tbody-use-id").hide();
        $("thead").remove("#thead-id");
        $("tbody").remove("#tbody-id");
    });
    btnbule.click(function(){
        var currentBtn = $(this);
        var tr = currentBtn.parent();
        id=tr.attr("id");
        state=tr.attr("state");
        console.log(id)
        self.detailsshowEvent();
        if(state=="-"){
             $("#thead-use-id").show();
             $("#tbody-use-id").show();
        }else{
            $("#thead-use-id").hide();
            $("#tbody-use-id").hide();
            $("thead").remove("#thead-id");
            $("tbody").remove("#tbody-id");
            xfzajax.post({
            'url': '/use/use_details/',
            'data': {
                "id":id,
            },
            'success': function (result) {
                if(result['code'] === 200){
                    var time_box=result["data"];
                    console.log(time_box)
                    var tpl=template("use-list",{"uselist1":time_box});
                    var ul=$(".table-use");
                    ul.append(tpl);
                }
            }
        });
        };
    });
};


jq331(function($){
    var be_use1=new Be_use1();
    be_use1.run();
});