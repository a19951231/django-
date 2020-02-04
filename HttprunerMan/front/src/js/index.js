function Index(){
    var self=this;
}

Index.prototype.userEvent=function(){//这个请求获取报告时间
    xfzajax.get({
            'url':'/jk/time_box/',
            'success':function(result){
                if(result['code']===200){
                    var time_box=result["data"];
                    console.log(time_box)
                    var tpl=template("time-list",{"timelist":time_box});//这里传入我们模板里定义的id,然后模板是通过newses来读取数据，所以这里定义newses并且把我们获取的数据传入进去
                    var ul=$(".form-control-select");//然后我们需要我们获取的数据显示在哪个标签里，这里是显示在class为list-inner-group属性里
                    ul.append(tpl);//然后把我们的tpl放到ul里
                }
            }
    });
};

Index.prototype.allEvent=function(){//这个请求获取报告时间
    var time2=$("#correlation-module").val();
    var btn=$("#query-btn")
    xfzajax.get({
            'url':'/jk/all_calculation1/',
            'success':function(result){
                if(result['code']===200){
                    var time_box=result["data"];
                    var tp2=template("time-list1",{"timelist1":time_box});//这里传入我们模板里定义的id,然后模板是通过newses来读取数据，所以这里定义newses并且把我们获取的数据传入进去
                    var ul2=$(".row1");
                    ul2.append(tp2);

                }
            }
        });
    btn.click(function(){
        var time1=$("#correlation-module").val();
        var div=$(".row").remove();//删除class为row元素
        xfzajax.get({
            'url':'/jk/all_calculation/',
            'data':{
                "box_time":time1,
            },
            'success':function(result){
                if(result['code']===200){
                    var time_box=result["data"];
                    var tp2=template("time-list1",{"timelist1":time_box});//这里传入我们模板里定义的id,然后模板是通过newses来读取数据，所以这里定义newses并且把我们获取的数据传入进去
                    var ul2=$(".row1");
                    ul2.append(tp2);

                }
            }
        });

    });

};

Index.prototype.run=function(){
    var self=this;
    self.userEvent();
    self.allEvent();

};

jq331(function($){
    var index=new Index();
    index.run();
});