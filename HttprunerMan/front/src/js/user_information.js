function User(){
    var self=this;
    self.liqt=$("#li-qt");
}

User.prototype.userEvent=function(){
    xfzajax.get({
            'url':'/qt/user_liset/',
            'success':function(result){
                if(result['code']===200){
                    var user1=result["data"];
                    var tpl=template("user-list",{"userlist":user1});
                    var ul=$("#page-wrapper");
                    ul.append(tpl);
                }
            }
    });
};

User.prototype.xzEvent=function(){
    var self=this;
}

User.prototype.run=function(){
    var self=this;
    self.userEvent();
    self.xzEvent();
    self.liqt.attr("class","active-menu").siblings().removeClass('active-menu');
};

jq331(function($){
    var user=new User();
    user.run();
});