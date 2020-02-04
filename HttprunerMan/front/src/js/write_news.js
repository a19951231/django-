//这个是写监听添加文章的js代码，就是write_news.html里的js

function News(){
    this.progressGroup = $("#progress-group");
}



News.prototype.listenUploadFielEvent = function () {
    var uploadBtn = $('#thumbnail-btn');
    uploadBtn.change(function () {//change事件是监控我们点击上传图片的时候打开的选择文件对话框进行选择图片点击打开的事件
    //因为我们选择的文件会保留到file状态的按钮里，如果我们想取图片就应该下面这样写就可以
        var file = uploadBtn[0].files[0];//这里意思是uploadBtn是按钮的位置，我们把这个按钮位置获取并且取第一个[0]是拿第一个，，然后files[0]是取第一个uploadBtn位置里第一个文件，
        var formData = new FormData();//然后我们这里定义一个formData，因为我们想储蓄的文件一般是储蓄到formData里
        formData.append('file',file);//把我们获取的文件储蓄到我们定义的forData里
        //这里key为什么是file，不是其他名称，是因为后端定义获取图片的参数是file，所以这里是file
        xfzajax.post({
            'url': '/cms/upload_file/',
            'data': formData,
            'processData': false,//设置为false，这样告诉js这个不是文本不需要处理，这个是文件
            'contentType': false,//设置为false，就是不需要在contentType添加内容，直接使用formData
            //这2个指定好就可以上传文件成功
            'success': function (result) {
                if(result['code'] === 200){
                    var url = result['data']['url'];//然后这里获取result请求的data里的url
                    var thumbnailInput = $("#thumbnail-form");//然后这里获取id为thumbnail-form位置
                    thumbnailInput.val(url);//这里为id为thumbnail-form里添加一个value值为获取的url
                }
            }
        });
    });
};

News.prototype.listenQiniuUploadFileEvent = function () {
//这里我们使用七牛的sdk进行js操作，可以查看七牛js的sdk的参考文档
//https://developer.qiniu.com/kodo/sdk/1283/javascript
    var self = this;
    var uploadBtn = $('#thumbnail-btn');
    uploadBtn.change(function () {
        var file = this.files[0];//这里是this先获取当前点击事件的按钮位置然后files[0]是获取当前点击事件选择后的文件，拿第一个文件
        xfzajax.get({//然后进行ajax请求
            'url': '/cms/qntoken/',
            'success': function (result) {
                if(result['code'] === 200){//如果状态为200执行下面代码
                    var token = result['data']['token'];//获取/cms/qntoken/接口请求返回的token
                    // a.b.jpg = ['a','b','jpg']
                    // 198888888 + . + jpg = 1988888.jpg
                    var key = (new Date()).getTime() + '.' + file.name.split('.')[-1];
                    //这里是我们重命名我们上传的文件名称，这里先定义一个date并且调用getTime就是获取当前的时间，然后进行组合，然后 file.name.split('.')[1];就是以.为切割，获取.后面那个字体，
                    var putExtra = {
                        fname: key,//这里是设置我们上传的文件名称
                        params:{},//这里的可以设置我们传入的浏览参数
                        mimeType: ['image/png','image/jpeg','image/gif','video/x-ms-wmv']//这里是限制上传的文件的类型的设置，video/x-ms-wmv就是视频，可以上传视频
                    };
                    var config = {
                        useCdnDomain: true,//是否使用cpu加速，我们默认设置为truw就是使用
                        retryCount: 6,//这里是设置我们请求次数，就是失败了可以进行几次的再请求
                        region: qiniu.region.z2//这里region是指定我们上传的空间的地区，qiniu.region.z2是华南地区
                    };
                    var observable = qiniu.upload(file,key,token,putExtra,config);
                    //这里然后我们调用七牛的upload方法，把文件传入进去，还有文件名称，还有token，还有putExtra和config信息传入进去
                    observable.subscribe({//然后会返回一个对象，然后我们使用observable对象调用subscribe，进行传替我们上传文件的信息
                        'next': self.handleFileUploadProgress,//next就是我们上传文件的进度
                        'error': self.handleFileUploadError,//error就是我们上传文件出现错误都会返回过来
                        'complete': self.handleFileUploadComplete//我们上传的文件会返回self.handleFileUploadComplete这个函数的内容
                    });
                }
            }
        });
    });
};

News.prototype.handleFileUploadProgress = function (response) {//handleFileUploadProgress是会返回一个response，每次上传文件会调用他
    var total = response.total;//然后我们调用total
    var percent = total.percent;//然后调用percent，这个就是获取上传进度的值
    var percentText = percent.toFixed(0)+'%';//然后这里调用percent的toFixed方法，toFixed方法里的0就是不需要小数点，就是去掉percent这个值的小数点
    // 24.0909，89.000....
    //var progressGroup = News.progressGroup;//获取进度条的id
    var progressGroup =$("#progress-group");//获取进度条的id
    progressGroup.show();//然后显示出来，show显示
    var progressBar = $(".progress-bar");//获取进度条的class位置
    progressBar.css({"width":"0%"});//通过css设置他的进度
    progressBar.text("0%");//这里的text就是改变 progressBar位置的文本内容
    progressBar.css({"width":percentText});//通过css设置他的进度
    progressBar.text(percentText);//这里的text就是改变 progressBar位置的文本内容
};

News.prototype.handleFileUploadError = function (error) {
    window.messageBox.showError(error.message);//error.message是打印错误的消息
    var progressGroup = $("#progress-group");
    progressGroup.hide();
    console.log(error.message);
};

News.prototype.handleFileUploadComplete = function (response) {
    console.log(response);
    var progressGroup = $("#progress-group");//这里是获取我们进度条的id位置
    progressGroup.hide();//然后进行关闭，hide就是不允许显示，就是隐藏

    var domain = 'http://q15ioam71.bkt.clouddn.com/';//这里添加七牛的空间的域名
    var filename = response.key;//这里通过获取response的key值，key就是我们设置的文件名称，这里的response就是我们上一个方法调用这个方法的函数，上个方法不是定义了key？可以通过response调用
    var url = domain + filename;//这里然后显示我们上传的url+我们的文件名称
    var thumbnailInput = $("input[name='thumbnail']");//这里获取显示的input位置
    thumbnailInput.val(url);//显示我们的url上传，val是设置thumbnailInput的val值
};

News.prototype.initUEditor = function () {//富文本方法，就是让我们前端的定义那个script标签调用我们的ueditor富文本的js代码变成富文本框
    window.ue = UE.getEditor('editor',{//我们把ue绑定到window上，这样就设置全局变量，我们到时候获取这个ue里的内容给后端就可以直接调用这个ue
        'initialFrameHeight': 400,//这个参数是设置富文本的高
        'serverUrl': '/ueditor/upload/'//这个参数是配置上传图片的url，配置了就可以上传文件，这里是调用ueditor目录里的urls文件配置的路径方式，就是调用上传文件的view（包括视频）
    });
};

News.prototype.run=function(){
    var self=this;
    self.initUEditor();
    //self.listenUploadFielEvent();
    self.listenQiniuUploadFileEvent();
};

$(function(){
    var news=new News();
    news.run();
    News.progressGroup = $('#progress-group');//定义这个获取id为progress-group位置
});