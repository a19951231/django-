function Change(){
    var self=this;
    self.liqt=$("#li-qt")
}

Change.prototype.changeEvent=function(){
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
                   setTimeout(function(){
                        window.location.reload();
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
};

jq331(function($){
    var change=new Change();
    change.run();
});