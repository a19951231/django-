function User(){
    var self=this;
    self.liqt=$("#li-qt");
}

User.prototype.userEvent=function(){//这个请求获取用户信息事件
    xfzajax.get({
            'url':'/qt/user_liset/',
            'success':function(result){
                if(result['code']===200){
                    var user1=result["data"];
                    var tpl=template("user-list",{"userlist":user1});//这里传入我们模板里定义的id,然后模板是通过newses来读取数据，所以这里定义newses并且把我们获取的数据传入进去
                    var ul=$("#page-wrapper");//然后我们需要我们获取的数据显示在哪个标签里，这里是显示在class为list-inner-group属性里
                    ul.append(tpl);//然后把我们的tpl放到ul里
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