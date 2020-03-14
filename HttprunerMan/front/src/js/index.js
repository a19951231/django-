function Index(){
    var self=this;
}

Index.prototype.userEvent=function(){
    xfzajax.get({
            'url':'/jk/time_box/',
            'success':function(result){
                if(result['code']===200){
                    var time_box=result["data"];
                    console.log(time_box)
                    var tpl=template("time-list",{"timelist":time_box});
                    var ul=$(".form-control-select");
                    ul.append(tpl);
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
                    var tp2=template("time-list1",{"timelist1":time_box});
                    var ul2=$(".row1");
                    ul2.append(tp2);

                }
            }
        });
    btn.click(function(){
        var time1=$("#correlation-module").val();
        var div=$(".row").remove();
        xfzajax.get({
            'url':'/jk/all_calculation/',
            'data':{
                "box_time":time1,
            },
            'success':function(result){
                if(result['code']===200){
                    var time_box=result["data"];
                    var tp2=template("time-list1",{"timelist1":time_box});
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