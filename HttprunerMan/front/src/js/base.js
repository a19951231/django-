//这个是base.html上的js代码
function Base(){
    var self=this;
    self.logoutlogin=$("#logout-login");

};
Base.prototype.run=function(){
    var self=this;
    self.szclassEvent();
};

Base.prototype.szclassEvent=function(){
    var self=this;
    self.logoutlogin.click(function(){
        xfzajax.post({
            'url': '/cms/logout/',
            'success': function (result) {
                if(result['code'] === 200){
                    window.messageBox.show(result["message"]);
                    console.log("已执行编辑===")
                    setTimeout(function(){
                        window.location="/cms/logout"
                   },1000);
                }
            }
        });
    });


};

jq331(function($){
    var base=new Base();
    base.run();
});