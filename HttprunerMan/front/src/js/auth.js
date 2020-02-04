//点击登录按钮，弹出模态对话框
//$(function(){
//    $("#btn").click(function(){
//        $(".mask-wrapper").show();//这里意思是把class为mask-wrapper的display设置为black
//    });
//    $(".close-btn").click(function(){
//        $(".mask-wrapper").hide();//这里是隐藏设置display为none
//    });
//});
//$(function(){
//    $(".switch").click(function(){
//        var scrollWrapper=$(".scroll-wrapper");//先获取class为scroll-wrapper的标签
//        var currentLeft=scrollWrapper.css("left");//然后获取class为scrollWrapper的css的left属性的值
//        currentLeft=parseInt(currentLeft);//然后对left的值进行转成int类型，parseInt转int类型，如果不转就无法判断是否大于0，因为获取的left值是400px，不是400
//        if (currentLeft<0){
//            scrollWrapper.animate({"left":"0"});//animate是进行过度的转换
//        }else{
 //           scrollWrapper.animate({"left":"-400px"});
 //       };
//    });
//});

function Auth(){
    var self=this;
    self.scrollWrapper=$('.scroll-wrapper');
    self.maskWrapper=$('.mask-wrapper');//先找到class属性为mask-wrapper
}

Auth.prototype.run=function(){
    var self=this;
    self.listenSwitchEvent();
    self.listenSigninEvent();
    self.listenShowHideEvent();//然后把需要执行的监听事件放到run方法里，这样就可以执行
};

Auth.prototype.showEvent=function(){//这个是展示事件
    var self=this;
    self.maskWrapper.show();//把这个maskWrapper属性显示出来，show()是显示
};

Auth.prototype.hideEvent=function(){//这个方法是隐藏事件
    var self=this;
    self.maskWrapper.hide();//hide()是隐藏，把maskWrapper隐藏
};

Auth.prototype.listenShowHideEvent=function(){//这个是监听展示与隐藏事件方法
    var self=this;
    var siginBtn=$('.signin-btn');//这里是获取class为signin-btn的位置
    var signupBtn=$('.signup-btn');
    var closeBtn=$('.close-btn');
    siginBtn.click(function(){
        self.showEvent();//当我们点击登录就执行显示的事件方法
        self.scrollWrapper.css({"left":0});//设置一下当我们点击登录这个框架的left值
    });
    signupBtn.click(function(){
        self.showEvent();
        self.scrollWrapper.css({"left":-400});

    });
    closeBtn.click(function(){
        self.hideEvent();
    });
};

Auth.prototype.listenSwitchEvent=function(){//这个是监听登录注册页面切换
        var self=this;
        var switcher=$(".switch");
        switcher.click(function(){
        //var scrollWrapper=$(".scroll-wrapper");//先获取class为scroll-wrapper的标签
        var currentLeft=self.scrollWrapper.css("left");//然后获取class为scrollWrapper的css的left属性的值
        currentLeft=parseInt(currentLeft);//然后对left的值进行转成int类型，parseInt转int类型，如果不转就无法判断是否大于0，因为获取的left值是400px，不是400
        if (currentLeft<0){
            self.scrollWrapper.animate({"left":"0"});//animate是进行过度的转换
        }else{
            self.scrollWrapper.animate({"left":"-400px"});
        };
    });
};

Auth.prototype.listenSigninEvent=function(){//这个是监控登录提交数据事件方法
var self=this;
    var signinGroup=$('.signin-group');//先把class为signin-group的位置提取出来
    var telephoneInput=signinGroup.find("input[name='telephone']");//然后在使用find在signinGroup的位置里找到input的name为telephone的位置定位出来
    var passwordInput=signinGroup.find("input[name='password']");
    var rememberInput=signinGroup.find("input[name='remember']");
    var submitBtn=signinGroup.find(".submit-btn");//然后在使用find在signinGroup的位置里找到class为submit-btn位置
    submitBtn.click(function(){//然后给submitBtn进行判断一个点击事件
        //当点击后执行下面代码
        var telephone=telephoneInput.val();//val()是获取telephoneInput这个位置里面的值
        var password=passwordInput.val();
        var remember=rememberInput.prop("checked");//因为remember是勾选框，是通过prop("checked")获取
        //如果勾选框勾选了prop("checked")就返回一个true，如果没有就返回false
        xfzajax.post({//这个xfzajax方法是调用了xfzajax.js文件里xfzajax方法里的post方法
            'url':'/account/login/',
            'data':{
                'telephone':telephone,
                'password':password,
                'remember':remember?1:0//这里意思是如果remember返回true就给予1否则就是0
            },
            'success':function(result){
                if(result['code']==200){//如果result的code为200
                    self.hideEvent();//就关闭这个登录框
                    window.location.reload();//window.location.reload();重新加载页面
                }else{//如果不是200就执行下面代码
                    var messageObject=result["message"];//获取result的message信息,这个message是我们定义的ajax返回的data内容
                    if(typeof messageObject=='string' || messageObject.constructor==String){
                    //判断是否字符串内容，字符串内容执行下面代码
                        window.messageBox.show(messageObject);
                        //这里使用使用show把这个window.messageBox提示框显示出来并且显示内容为messageObject
                    }else{//如果不是执行下面代码
                        for(var key in messageObject){//下面代码是把字点类型的错误提示出来
                            var messages=messageObject[key];
                            var message=messages[0];
                            window.messageBox.show(message);
                        }
                    }
                };
            },
            'fail':function(error){
                console.log(error);//打印日志
            }
        });
    });
};

$(function(){
    var auth=new Auth();
    auth.run();//当所有元素加载出来会执行run方法
});