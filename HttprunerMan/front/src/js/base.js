//这个是base.html上的js代码
function Base(){
    var self=this;
    self.logoutlogin=$("#logout-login");

};
Base.prototype.run=function(){
    var self=this;
    self.szclassEvent();
};

Base.prototype.szclassEvent=function(){//退出登录的ajax请求
    var self=this;
    self.logoutlogin.click(function(){
        xfzajax.post({
            'url': '/cms/logout/',
            'success': function (result) {
                if(result['code'] === 200){
                    window.messageBox.show(result["message"]);
                    console.log("已执行编辑===")
                    setTimeout(function(){//设置计时器
                        window.location="/cms/logout"
                   },1000);
                }
            }
        });
    });


};

jq331(function($){//这里就使用jq331这个jqbie名进行调用jq版本3.3.1
    var base=new Base();
    console.log("执行");//打印日志
    base.run();//当所有元素加载出来会执行run方法
});