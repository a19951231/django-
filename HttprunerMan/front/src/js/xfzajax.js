
function getCookie(name){
    var cookieValue=null;
    if(document.cookie && document.cookie !==''){
        var cookies=document.cookie.split(';');
        for (var i=0; i<cookies.length; i++){
            var cookie=jQuery.trim(cookies[i]);
            if (cookie.substring(0,name.length+1)===(name + '=')){
                cookieValue=decodeURIComponent(cookie.substring(name.length+1));
                break;
            }
        }
    }
    return cookieValue;
}
var xfzajax={
    'get':function(args){
        args['method']='get';
        this.ajax(args);
    },
    'post':function(args){
        args['method']='post';
        this._ajaxSetup();
        this.ajax(args);
    },
    'ajax':function(args){
        var success = args['success'];//先把我们写好的success传进来到args里
        args['success'] = function (result) {//然后我们进行重写我们传入进来的success函数，result是服务器返回的result
        //result是固定的，当js获取服务器传进来的函数会自动传入给result
            if(result['code'] === 200){//判断如果状态为200执行下面代码
                if(success){//判断用户是否写了success事件，如果写了就执行 success(result);代码
                    success(result);// success(result);意思就是执行用户写了的success事件
                }
            }else{//如果code不等于200就执行下面的代码
                var messageObject = result['message'];//获取result的message信息,这个message是我们定义的ajax返回的data内容
                //result是js获取服务器返回的数据，result的数据是后端js返回的数据，里面包括状态码，错误信息等信息
                if(typeof messageObject == 'string' || messageObject.constructor == String){
                //判断是否字符串内容，字符串内容执行下面代码
                    window.messageBox.showError(messageObject);
                    //xfzalert.close();
                    //这里使用使用show把这个window.messageBox提示框显示出来并且显示内容为messageObject
                }else{//如果不是执行下面代码
                    // {"password":['密码最大长度不能超过20为！','xxx'],"telephone":['xx','x']}
                    for(var key in messageObject){//下面代码是把字点类型的错误提示出来
                        var messages = messageObject[key];
                        var message = messages[0];
                        window.messageBox.showError(message);
                        //xfzalert.close();
                    }
                }
                if(success){//这里是会重新执行一下success里的代码，就是'success': function (result) {}里的代码
                    success(result);
                }
            }
        };
        args['fail'] = function (error) {//如果出现错误，就执行下面代码
            console.log(error);//打印日志
            window.messageBox.showError('服务器内部错误！');
        };
        $.ajax(args);
    },
    '_ajaxSetup':function(){
        $.ajaxSetup({
            beforeSend:function(xhr,settings){
                if(!/^(GET|HEAD|OPTIONS|TRACE)$/.test(settings.type) && !this.crossDomain){
                    xhr.setRequestHeader("X-CSRFToken",getCookie('csrftoken'));
                }
            }
        });
    }
};