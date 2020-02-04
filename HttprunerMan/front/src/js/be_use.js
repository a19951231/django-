function Be_use1(){
    var self=this;
    //self.maskWrapper=$('.mask-wrapper');//先找到class属性为mask-wrapper
    self.delete_btn=$(".all-red-delete");//获取删除按钮位置
    self.masknone=$('.mask-none');//先找到class属性为mask-none
    //self.titlexm=$("#title-xm");
    self.xxaddbtn=$("#xxaddbtn");//信息头添加按钮
    self.xxdeletebtn=$("#xxdelete-btn");//信息头删除按钮
    self.dataaddbtn=$("#dataadd-btn");//data添加按钮
    self.datadeletebtn=$("#datadelete-btn");//data删除按钮
    self.dyaddbtn=$("#dyadd-btn");//断言添加按钮
    self.dydeletebtn=$("#dydelete-btn");//断言删除按钮
    self.addextractbtn=$("#add-extract-btn");//提取值的添加按钮
    self.deleteextractbtn=$("#delete-extract-btn");//提取值的删除按钮
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
    self.usewrapper=$('.use-wrapper');//先找到class属性为hj-wrapper
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
    //self.editbtnEvent();
    //self.addbtnEvent();
    self.deleteShowHideEvent();
    self.detailsShowHideEvent();
};

Be_use1.prototype.hideEvent=function(){//这个方法是隐藏事件
    var self=this;
    //var host_name=$('#host_name').val("");//清空文本信息
    //var host_url=$('#host_url').val("");
    //var describe=$('#describe').val("");
    self.usewrapper.hide();//hide()是隐藏，把hjWrapper隐藏
     window.location.reload();//刷新当前页面
};

Be_use1.prototype.showEvent=function(){//这个是展示事件
    var self=this;
    self.usewrapper.show();//把这个hjWrapper属性显示出来，show()是显示
};

Be_use1.prototype.listenShowHideEvent=function(){//这个是监听展示与隐藏事件方法
    var self=this;
    var siginBtn=$('#add-yl');//这里是获取id为add-hj的位置,这个是添加按钮
    var closeBtn=$('#x-btn');//这个是x按钮
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

Be_use1.prototype.listEvent=function(){//这个是监控添加和删除的按钮
    var self=this;
    var data=self.int
    var dataint=self.dataint;
    var xxaddbtn=$("#xxaddbtn");//信息头添加按钮
    var xxdeletebtn=$("#xxdelete-btn");//信息头删除按钮
    var dataaddbtn=$("#dataadd-btn");//data添加按钮
    var datadeletebtn=$("#datadelete-btn");//data删除按钮
    var allxxsettings=$("#allxx-settings");
    var dataxx=$("#data-xx");
    var xxsettings=$("#xx-settings");
    var extractsz=$("#extract-sz");
    var dysz=$("#dy-sz");//这个是需要添加断言输入框的元素的位置
    var a=xxdeletebtn.prev().prev();
    var zh=a.attr("class");
    self.addextractbtn.click(function(){
        data=self.extractint+=1;
        var c='<div class="content" id="'+"extract"+data+'"><input type="text" id="input-extract'+data+'" class="form-control" name="all_extract" placeholder="请输入提取的值" maxlength="100"></div>'
        extractsz.append(c);
    });
    self.deleteextractbtn.click(function(){
        var currentBtn = $(this);//为当前的按钮
        //var tr = currentBtn.parent();
        //console.log("000="+tr)
        //var pk = tr.attr('id');
        //console.log("000="+pk)
        if (self.extractint==0){

        }else{
            $("div").remove("#"+"extract"+self.extractint);//这个是删除div元素里的id为data这个值
            self.extractint-=1;
        };
     });
    self.dyaddbtn.click(function(){
        data=self.dyint+=1;
        var c='<div class="content" id="'+"dy"+data+'"><input  type="text" id="dyinput'+data+'" class="form-keyvalue" name="dy_key" placeholder="请输入要匹配的内容" maxlength="50"><select id="select'+data+'" name="dy_type" class="form-control-select belong_project"><option class="option" value ="等于">等于</option><option class="option" value ="包含">包含括</option></select><input  type="text" id="dytext'+data+'" class="form-keyvalue" name="dy_value" placeholder="请输入匹配的值" maxlength="50"></div>'
        dysz.append(c);
    });
    self.dydeletebtn.click(function(){
        var currentBtn = $(this);//为当前的按钮
        //var tr = currentBtn.parent();
        //console.log("000="+tr)
        //var pk = tr.attr('id');
        //console.log("000="+pk)
        if (self.dyint==0){

        }else{
            $("div").remove("#"+"dy"+self.dyint);//这个是删除div元素里的id为data这个值
            self.dyint-=1;
        };
     });
    self.xxaddbtn.click(function(){
        data=self.int+=1;
        console.log("23333"+data)
        var c='<div id="'+self.data1+data+'" class="content" ><input type="text" id="project_name3" class="xx-keyvalue" name="header_key" placeholder="请输入信息头key值" maxlength="100"><textarea  style="overflow:hidden;" id="project_name55" class="xx-keyvalue" name="header_value" placeholder="请输入信息头value值" maxlength="1000"></textarea></div>'
        allxxsettings.append(c);//这里是添加元素append()方法
    });
    self.xxdeletebtn.click(function(){
        var currentBtn = $(this);//为当前的按钮
        //var tr = currentBtn.parent();
        //console.log("000="+tr)
        //var pk = tr.attr('id');
        //console.log("000="+pk)
        if (self.int==0){

        }else{
            $("div").remove("#"+self.data1+self.int);//这个是删除div元素里的id为data这个值
            self.int-=1;
        };
     });
    self.dataaddbtn.click(function(){//添加data
        dataint=self.dataint+=1;
        console.log("23333"+data)
        var c='<div id="'+"data"+dataint+'" class="content content1"><input type="text" id="input'+dataint+'" class="form-keyvalue" name="data_key" placeholder="请输入data的key值" maxlength="100"><select id="typedrop-downbox'+dataint+'" name="data_type" class="form-control-select belong_project"><option class="option" value ="int">int</option><option class="option" value ="string">string</option><option class="option" value ="list">list</option><option class="option" value ="dict">dict</option></select><textarea  style="overflow:hidden;" id="data_value'+dataint+'" class="form-keyvalue" name="data_value" placeholder="请输入data的value值" maxlength="1000"></textarea></div>'
        dataxx.append(c);//这里是添加元素append()方法
    });
    self.datadeletebtn.click(function(){
        var currentBtn = $(this);//为当前的按钮
        //var tr = currentBtn.parent();
        //console.log("000="+tr)
        //var pk = tr.attr('id');
        //console.log("000="+pk)
        if (self.dataint==0){

        }else{
            $("div").remove("#"+self.data2+self.dataint);//这个是删除div元素里的id为data这个值
            self.dataint-=1;
        };
    });

};

Be_use1.prototype.xxradiohideEvent=function(){//这个方法是隐藏form-data内容的事件
    var self=this;
    self.dataxx.hide();//hide()是隐藏，把dataxx隐藏
};

Be_use1.prototype.xxradioshowEvent=function(){//这个是展示form-data内容的事件
    var self=this;
    self.dataxx.show();//把这个dataxx属性显示出来，show()是显示
};

Be_use1.prototype.dataradiohideEvent=function(){//这个方法是隐藏data事件
    var self=this;
    self.displaywb.hide();//hide()是隐藏，把displaywb隐藏
};

Be_use1.prototype.dataradioshowEvent=function(){//这个是展示data事件
    var self=this;
    self.displaywb.show();//把这个displaywb属性显示出来，show()是显示
};

Be_use1.prototype.radioEvent=function(){//获取单选框的数据
        var self=this;
        var timer=setInterval(function(){//setInterval是定时器方法，200就是200毫秒，每200毫秒执行里面代码
            var str=$("input[type='radio']:checked").val();//获取单选框的值
            if (str=="form-data"){
                self.xxradioshowEvent();
                self.dataradiohideEvent();
            }else{
                self.xxradiohideEvent();
                self.dataradioshowEvent();
             }
        },200);
};

Be_use1.prototype.datavaluehideEvent=function(){//这个方法是隐藏id为data_value内容的事件
    var self=this;
    self.datavalue.hide();//hide()是隐藏，把data_value隐藏
};

Be_use1.prototype.datavalueshowEvent=function(){//这个是展示id为data_value内容的事件
    var self=this;
    self.datavalue.show();//把这个data_value属性显示出来，show()是显示
};

Be_use1.prototype.datafilehideEvent=function(){//这个方法是隐藏id为data_file内容的事件
    var self=this;
    self.datafile.hide();//hide()是隐藏，把data_file隐藏
};

Be_use1.prototype.datafileshowEvent=function(){//这个是展示id为data_file内容的事件
    var self=this;
    self.datafile.show();//把这个data_file属性显示出来，show()是显示
};

Be_use1.prototype.typedropdownboxEvent=function(){//这个是切换上传文件或文本输入框的监控事件
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

Be_use1.prototype.addylbtnEvent=function(){//这个是添加用例的ajax请求
    var self=this;
    var submitbtn=$('#submit-btn-bule');
    submitbtn.click(function(){
        var w=$('input[name="dy_key"]').val()
        console.log("断言的key值："+w)
        var case_name=$("#yl-name").val()//获取用例名称数据
        var case_url=$("#yl-url").val()//获取接口请求链接
        var case_order=$("#yl-order").val()//获取用例运行顺序
        var module=$("#correlation-module").val()//获取关联模块id
        var url_con=$("#correlation-url").val()//获取关联的环境id
        var req=$("#requests-mode").val()//获取接口请求方式
        var header_keylist=[];//保存信息头所有key的列表
        var all_header_key=$('input[name="header_key"]')
        for (var i=0;i<all_header_key.length;i++){//循环获取列表的值
            header_keylist.push(all_header_key.eq(i).val())
        };
        var header_valuelist=[];
        var all_header_value=$('textarea[name="header_value"]')
        for (var i=0;i<all_header_value.length;i++){
            header_valuelist.push(all_header_value.eq(i).val())
        };
        console.log("headervalue值："+header_valuelist)
        var value_type=$("input[type='radio']:checked").val();//获取单选框的值
        var data_keylist=[];
        var data_typelist=[];
        var data_valuelist=[];
        var json_keyvalue="";
        if (value_type=="form-data"){//这里是data的参数获取，这里没有写获取图片路径，这个后面再写
            var all_data_key=$('input[name="data_key"]')
            for (var i=0;i<all_data_key.length;i++){//循环获取列表的值
                data_keylist.push(all_data_key.eq(i).val())
            };
            var all_data_type=$('select[name="data_type"]')
            for (var i=0;i<all_data_type.length;i++){//循环获取列表的值
                data_typelist.push(all_data_type.eq(i).val())
            };
            var all_data_value=$('textarea[name="data_value"]')
            for (var i=0;i<all_data_value.length;i++){//循环获取列表的值
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
        for (var i=0;i<all_dy_key.length;i++){//循环获取列表的值
             dy_keylist.push(all_dy_key.eq(i).val())
        };
        var all_dy_type=$('select[name="dy_type"]')
        for (var i=0;i<all_dy_type.length;i++){//循环获取列表的值
            dy_typelist.push(all_dy_type.eq(i).val())
        };
        var all_dy_value=$('input[name="dy_value"]')
        for (var i=0;i<all_dy_value.length;i++){//循环获取列表的值
            dy_valuelist.push(all_dy_value.eq(i).val())
        };
        //下面是获取提取参数
        var all_extractlist=[];
        var all_extract=$('input[name="all_extract"]')
        for (var i=0;i<all_extract.length;i++){//循环获取列表的值
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
                    setTimeout(function(){//设置计时器
                        window.location="/use/"
                   },1000);
                }
            }
        });
        //edititembtn.attr('id','submit-btn-bule');//修改id属性
    });
};

Be_use1.prototype.FunctionEvent=function(){//这个是单条用例运行事件
    var self=this;
    var id="";
    var successBtn=$('.success-green');//获取点击运行按钮位置
    successBtn.click(function(){
        var currentBtn = $(this);//这里的$(this)就是获取deleteBtn.click的位置，就是我点击的位置
        var tr = currentBtn.parent();//然后这里parent()是获取点击事件的父级的位置，2个parent是获取deleteBtn.click点击位置的父级的父级
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
                    setTimeout(function(){//设置计时器
                        window.location="/use/"
                   },1000);
                }
            }
        });
    });

};

Be_use1.prototype.noneshowEvent=function(){//这个是提示框展示事件
    var self=this;
    self.masknone.show();//把这个maskWrapper属性显示出来，show()是显示
};
Be_use1.prototype.nonehideEvent=function(){//这个方法是隐藏提示框事件
    var self=this;
    self.masknone.hide();//hide()是隐藏，把maskWrapper隐藏
    btnbule
};

Be_use1.prototype.detelebtnEvent=function(){//点击删除按钮弹出提示框的js事件
    var self=this;
    self.delete_btn.click(function(){
        self.noneshowEvent();
    });
};

Be_use1.prototype.deleteShowHideEvent=function(){//这个是监听展示与隐藏提示框事件方法包括ajax请求
    console.log("点击删除已执行")
    var self=this;
    var id="";
    var closeBtn=$('.close-btn1');
    var cleanBten=$('#bule-delete');
    var delete_red=$('#red-delete');
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
            'url': '/use/delete_use/',
            'data': {
                "id":id,
            },
            'success': function (result) {
                if(result['code'] === 200){
                    window.messageBox.show(result["message"]);
                    setTimeout(function(){//设置计时器
                        window.location="/use/"
                   },1000);
                }
            }
        });
    });
    self.liuse.attr("class","active-menu").siblings().removeClass('active-menu');
};

Be_use1.prototype.detailsshowEvent=function(){//这个是显示用例运行详情框
    var self=this;
    self.detailswrapper.show();//show()是显示
};
Be_use1.prototype.detailshideEvent=function(){//这个方法是隐藏用例运行详情框
    var self=this;
    self.detailswrapper.hide();//hide()是隐藏
};

Be_use1.prototype.detailsShowHideEvent=function(){//这个是监听展示与隐藏用例运行详情框方法包括ajax请求
    var self=this;
    var id="";
    var state="";
    var btnbule=$(".btn-bule");//运行结果按钮
    var closeBtn=$('#x-close-btn');//获取删除按钮
    closeBtn.click(function(){
        self.detailshideEvent();
        $("#thead-use-id").hide();
        $("#tbody-use-id").hide();
        $("thead").remove("#thead-id");//这个是删除thead元素里的class为thead-use这个值
        $("tbody").remove("#tbody-id");
    });
    btnbule.click(function(){
        var currentBtn = $(this);//这里的$(this)就是获取deleteBtn.click的位置，就是我点击的位置
        var tr = currentBtn.parent();//然后这里parent()是获取点击事件的父级的位置，2个parent是获取deleteBtn.click点击位置的父级的父级
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
            $("thead").remove("#thead-id");//这个是删除thead元素里的class为thead-use这个值
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
                    var tpl=template("use-list",{"uselist1":time_box});//这里传入我们模板里定义的id,然后模板是通过newses来读取数据，所以这里定义newses并且把我们获取的数据传入进去
                    var ul=$(".table-use");//然后我们需要我们获取的数据显示在哪个标签里，这里是显示在class为list-inner-group属性里
                    ul.append(tpl);//然后把我们的tpl放到ul里
                }
            }
        });
        };
    });
    //self.liuse.attr("class","active-menu").siblings().removeClass('active-menu');
};


jq331(function($){//这里就使用jq331这个jqbie名进行调用jq版本3.3.1
    var be_use1=new Be_use1();
    console.log("执行=============");//打印日志
    be_use1.run();//当所有元素加载出来会执行run方法
});