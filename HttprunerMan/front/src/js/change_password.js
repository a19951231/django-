function Change(){
    var self=this;
    self.liqt=$("#li-qt")
}

Change.prototype.changeEvent=function(){//这个监听修改按钮
    var self=this;
    var submitbtn=$(".submit-btn-bule");
    submitbtn.click(function(){
    var password=$("#password").val();
    var password1=$("#password1").val();
    var password2=$("#password2").val();
        xfzajax.post({
            'url':'/qt/post_password/',
            'data':{
                "password":password,
                "password1":password1,
                "password2":password2,
            },
            'success':function(result){
                if(result['code']===200){
                   window.messageBox.show(result["message"]);
                   setTimeout(function(){//设置计时器
                        window.location.reload();//刷新当前页面.
                   },1000);
                }
            }
    });
    });

};

Change.prototype.run=function(){
    var self=this;
    self.changeEvent();
    self.liqt.addClass("active-menu").siblings().removeClass('active-menu');
    //这里意思是把我们当前选中的元素通过addClass设置class为active-menu，然后通过siblings()方法获取他的
                    //兄弟元素，然后使用removeClass('active')方法设置他的兄弟元素去掉class为active
};

jq331(function($){
    var change=new Change();
    change.run();
});