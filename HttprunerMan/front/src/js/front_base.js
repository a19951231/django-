
function FrontBase(){

}

FrontBase.prototype.run=function(){
    var self=this;
    self.listenAuthBoxHover();
};

FrontBase.prototype.listenAuthBoxHover=function(){//是监控鼠标放到用户名称的时候显示的下拉框
    var authBox=$(".authenticated-box");//获取class为authenticated-box位置
    var userMoreBox=$(".user-more-box");//获取class为user-more-box位置
    authBox.hover(function(){
        userMoreBox.show();
        userMoreBox.hover(function(){
            userMoreBox.show();
        },function(){
            userMoreBox.hide();
        });
    },function(){
        userMoreBox.hide();
    });
};


function Auth(){
    var self=this;
    self.scrollWrapper=$('.scroll-wrapper');
    self.maskWrapper=$('.mask-wrapper');//先找到class属性为mask-wrapper
    self.smsCaptcha=$(".sms-captcha-btn");//获取class为sms-captcha-btn位置
}

Auth.prototype.run=function(){
    var self=this;
    self.listenSwitchEvent();
    self.listenSigninEvent();
    self.listenImgCaptchaEvent();
    self.listenShowHideEvent();//然后把需要执行的监听事件放到run方法里，这样就可以执行
    self.listenSmsCaptchaEvent();
    self.listenclick();
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

Auth.prototype.listenImgCaptchaEvent=function(){//注册页面点击验证码进行重新请求获取一个新验证码
    var imgCaptcha=$('.img-captcha');//获取class为img-captcha的位置
    imgCaptcha.click(function(){//监控这个位置的点击事件
       imgCaptcha.attr("src","/account/img_captcha/"+"?random="+Math.random(0,100))
       //当我们每次点击这个图片的时候都会在这个url后面随机获取一个小数，当url与之前不一样就会重新请求，记得一定是?后面接随机数，因为这样就等于参数，
       //？后面一般是参数类型，这样不会报错，因为参数不一样就会重新请求
       //attr是可以更改属性的内容
    });
};

Auth.prototype.smsSuccessEvent=function(){
    var self=this;
    //var smsCaptcha=$(".sms-captcha-btn");//获取class为sms-captcha-btn位置
    messageBox.showSuccess("短信发送成功！");//使用messageBox调用showSuccess方法，这个是提示成功信息的时候提示框，
          //这个 messageBox方法是message.js文件里的方法，所以想调用这个方法，html模板必须加载这个js，其他js文件才可以调用这个方法
    self.smsCaptcha.addClass('disabled');
          //并且给予smsCaptcha这个位置添加一个class为disabled的属性，这个属性在auth.scss里已经定义好了css
          //addClass是添加class属性
    var count=60;//定义count变量为60
    self.smsCaptcha.unbind('click');
          //unbind方法可以把click和hover事件进行禁止掉
    var timer=setInterval(function(){//setInterval是定时器方法，1000就是1秒，每一秒执行里面代码
         self.smsCaptcha.text(count+'s');//text是设置文本，这里是设置smsCaptcha位置这个按钮的文本显示为count+s
         count-=1;//然后对count进行减一操作
         if(count<=0){//当count少于等于0执行里面代码
             clearInterval(timer);//clearInterval是可以清除定时器的方法，把我们定义的定时器给予一个变量，把定时器的变量放到括号里就可以清理掉定时器
             self.smsCaptcha.removeClass('disabled');//removeClass方法是可以清除class属性，
                    //这里是清理smsCaptcha位置的disabled的clss
             self.smsCaptcha.text("发送验证码");//设置文本
             self.listenSmsCaptchaEvent();//执行这个方法，这样我们就可以循环的执行，
         }
    },1000);
};

Auth.prototype.listenSmsCaptchaEvent=function(){
    var self=this;
    var smsCaptcha=$(".sms-captcha-btn");//获取class为sms-captcha-btn位置
    var telephoneInput=$(".signup-group input[name='telephone']");
    //这里是获取class为signup-group里的input标签name为telephone的位置
    smsCaptcha.click(function(){//对这个smsCaptcha位置进行点击事件监控
        var telephone=telephoneInput.val();//val()是获取telephoneInput位置里的用户输入的值
        if(!telephone){
            messageBox.showInfo("请输入手机号码！");
        }else{
        xfzajax.get({//如果手机不为空执行这个ajax请求操作
            'url':'/account/sms_captcha/',//执行这个url里的视图代码
            'data':{
                'telephone':telephone
            },
            'success':function(result){//没有错误执行下面代码
                if(result['code']==200){//如果请求为200
                    self.smsSuccessEvent();//调用这个方法
                };
            },
            'fail':function(error){
                console.log(error);
            }
        });
        }
    });
};

Auth.prototype.listenSignupEvent=function(){//注册的点击事件
    var signupGroup=$(".signup-group");//获取class为signup-group的位置
    var submitBtn=signupGroup.find(".submit-btn");//find作用在于查找其他元素里下的元素
    //这里是查找class为signup-group里下的class为submit-btn的位置
    submitBtn.click(function(event){//然后对submitBtn位置进行点击事件监控
        event.preventDefault();//这里为什么加event，还有编写event.preventDefault();，因为这样可以重写这个点击的按钮
        //这样我们点击的按钮如果在form表单里，不需要执行form表单的点击提交事件，执行我们现在写的js点击事件了
        var telephoneInput = signupGroup.find("input[name='telephone']");//通过signupGroup的元素里使用find查找signupGroup元素里的input标签的namwe为telephone位置
        var usernameInput = signupGroup.find("input[name='username']");
        var imgCaptchaInput = signupGroup.find("input[name='img_captcha']");
        var password1Input = signupGroup.find("input[name='password1']");
        var password2Input = signupGroup.find("input[name='password2']");
        var smsCaptchaInput = signupGroup.find("input[name='sms_captcha']");
        var telephone = telephoneInput.val();//然后使用val方法是获取telephoneInput位置的值
        var username = usernameInput.val();
        var img_captcha = imgCaptchaInput.val();
        var password1 = password1Input.val();
        var password2 = password2Input.val();
        var sms_captcha = smsCaptchaInput.val();
        console.log("已执行")
        xfzajax.post({
            'url': '/account/register/',
            'data': {
                'telephone': telephone,
                'username': username,
                'img_captcha': img_captcha,
                'password1': password1,
                'password2': password2,
                'sms_captcha': sms_captcha
            },
            'success': function (result) {
                //self.hideEvent();//就关闭这个登录框
                window.location.reload();//window.location.reload();重新加载页面
            }
        });

    });
};

Auth.prototype.listenclick=function(){//注册点击事件js二
    var self=this;
    var signupGroup=$(".signup-group");//获取class为signup-group的位置
    var submitBtn=signupGroup.find(".submit-btn");//find作用在于查找其他元素里下的元素
    //这里是查找class为signup-group里下的class为submit-btn的位置
    var telephoneInput = signupGroup.find("input[name='telephone']");
    var timer=setInterval(function(){//setInterval是定时器方法，1000就是1秒，每一秒执行里面代码
         var telephoneInput = signupGroup.find("input[name='telephone']");//通过signupGroup的元素里使用find查找signupGroup元素里的input标签的namwe为telephone位置
         var usernameInput = signupGroup.find("input[name='username']");
         var imgCaptchaInput = signupGroup.find("input[name='img_captcha']");
         var password1Input = signupGroup.find("input[name='password1']");
         var password2Input = signupGroup.find("input[name='password2']");
         var smsCaptchaInput = signupGroup.find("input[name='sms_captcha']");
         var telephone = telephoneInput.val();//然后使用val方法是获取telephoneInput位置的值
         var username = usernameInput.val();
         var img_captcha = imgCaptchaInput.val();
         var password1 = password1Input.val();
         var password2 = password2Input.val();
         var sms_captcha = smsCaptchaInput.val();
         if (!telephone || !username || !img_captcha || !password1 || !password2 || !sms_captcha){//判断如果电话号码内容为空就执行下面代码,\\是或者在js中
            submitBtn.attr("disabled",true);//设置不可点击
            submitBtn.css("background","#555555");//设置背景色,
            submitBtn.css("cursor","not-allowed");//pointer-events:none;//禁止鼠标事件
            submitBtn.css("opacity","0.5");//设置蒙版效果
    }else{
            submitBtn.attr("disabled",false);//通过attr方法设置按钮可以点击
            submitBtn.css("background","#3f89ec");
            submitBtn.css("cursor","pointer");
            submitBtn.css("opacity","1");//设置蒙版效果
            self.listenSignupEvent();//调用注册点击事件
    };
    },1000);
};

$(function(){
    var auth=new Auth();
    auth.run();//当所有元素加载出来会执行run方法
});

$(function(){
    var frontBase=new FrontBase();
    frontBase.run();//执行run方法
});