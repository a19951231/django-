function Use1(){
    var self=this;
    //self.maskWrapper=$('.mask-wrapper');//先找到class属性为mask-wrapper
    //self.delete_btn=$(".btn-danger");//获取删除按钮位置
    //self.masknone=$('.mask-none');//先找到class属性为mask-none
    //self.titlexm=$("#title-xm");
    console.log("3333333333333333333333");
    //self.xxaddbtn=$("#xxaddbtn");//信息头添加按钮
    //self.xxdeletebtn=$("#xxdelete-btn");//信息头删除按钮
    //self.dataaddbtn=$("#dataadd-btn");//data添加按钮
    //self.datadeletebtn=$("#datadelete-btn");//data删除按钮
    console.log("32323232323232323232323232323");

};
Use1.prototype.run=function(){
    var self=this;
    self.allbtnEvent();
    //self.listenShowHideEvent();
    //self.editbtnEvent();
    //self.addbtnEvent();
    //self.deleteShowHideEvent();
};

Use1.prototype.allbtnEvent=function(){//这个是监控添加和删除的按钮
    var self=this;
    var xxaddbtn=$("#xxaddbtn");//信息头添加按钮
    var xxdeletebtn=$("#xxdelete-btn");//信息头删除按钮
    var dataaddbtn=$("#dataadd-btn");//data添加按钮
    var datadeletebtn=$("#datadelete-btn");//data删除按钮
    var allxxsettings=$("#allxx-settings");
    var xxsettings=$("#xx-settings");
    self.xxaddbtn.click(function(){
        //allxxsettings.append('<div class="content" id="xx-settings"><input type="text" id="project_name3" class="xx-keyvalue" name="host_name" placeholder="请输入信息头key值" maxlength="100"><textarea  style="overflow:hidden;" id="project_name4" class="xx-keyvalue" name="host_name" placeholder="请输入信息头value值" maxlength="1000"></textarea></div>');//这里是添加元素append()方法
    });
    self.xxdeletebtn.click(function(){
        //xxsettings.remove();
    });

};

jq331(function($){//这里就使用jq331这个jqbie名进行调用jq版本3.3.1
    var use=new Use1();
    console.log("执行=============");//打印日志
    use.run();//当所有元素加载出来会执行run方法
});