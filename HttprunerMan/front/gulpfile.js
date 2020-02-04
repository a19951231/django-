//我们需要在项目的目录里创建gulpfile.js文件来创建gulp任务
//在node.js里想导入一个包就需要require语句
//var gulp=require("gulp");意思是导入gulp这个包并且命名为gulp，就是我们想调用这个gulp包，直接使用我们命名调用就可以
//var gulp=require("gulp");方法与python的import xxx as xxx的方法意思一样的
var gulp=require("gulp");
var cssnano=require("gulp-cssnano");//这个插件是对css文件进行压缩
var rename=require("gulp-rename");//这个插件是对文件进行重命名
var uglify=require("gulp-uglify");
var concat=require("gulp-concat");//导入这个合并多个文件的插件
//var cache=require("gulp-cache");
//var imagemin=require("gulp-imagemin");
var bs=require("browser-sync").create()//我们导入修改文件并且进行自动刷新浏览器的模块browser-sync并且.create()是创建一个服务器，浏览器刷新一般不是浏览器做的，而是服务器
//gulp-rename插件详情用法：https://www.npmjs.com/package/gulp-rename
var sass=require('gulp-sass');
var util=require('gulp-util');
//gulp-util:这个插件中有一个方法log，可以打印出当前js错误的信息
var sourcemaps=require('gulp-sourcemaps');
//gulp-sourcemaps:当我们的js代码在浏览器里出现错误，会显示错误的js代码行和位置，方便定位

var path={//定义一个变量储蓄所有文件路径和压缩储蓄的路径
    'html':'./templates/**/',//这里的**代表templates目录下存在任意的目录名称
    'css':'./src/css/**/',//2个星代表可能css里这个目录下有多个目录，就是css目录下的所有目录
    'js':'./src/js/',
    'images':'./src/images',
    'css_dist':'./dist/css/',
    'js_dist':'./dist/js/',
    'images_dist':'./dist/images/',
};
//处理html文件的任务：
gulp.task('html',function(){//这里对html文件进行加载就可以，不需要压缩
    gulp.src(path.html+'*.html')
    .pipe(bs.stream())//这里的bs.stream()就是当对css文件进行压缩并且把压缩文件传到指定目录后，会自动刷新浏览器
});
//定义一个css任务：
gulp.task('css',function(){
    gulp.src(path.css+'*.scss')
    .pipe(sass().on("error",sass.logError))//这里是我们把scss文件给予sass()进行处理转义成css文件，.on("error",sass.logError)是当处理出现错误的时候不会终止操作而是打印日志
    .pipe(cssnano())//cssnano是压缩css文件
    .pipe(rename({'suffix':'.min'}))
    .pipe(gulp.dest(path.css_dist))
    .pipe(bs.stream())//这里的bs.stream()就是当对css文件进行压缩并且把压缩文件传到指定目录后，会自动刷新浏览器
});
//定义一个处理js文件任务：
gulp.task('js',function(){
    gulp.src(path.js+'*.js')
    .pipe(sourcemaps.init())//我们先init
    .pipe(uglify().on("error",util.log))//uglify方法是压缩js文件,如果压缩js文件的时候出现错误就打印出来
    .pipe(rename({'suffix':'.min'}))
    .pipe(sourcemaps.write())//init后，在命名的时候再进行write，这样我们的js代码出现错误都会在浏览器的开发者模式显示位置方便定位
    .pipe(gulp.dest(path.js_dist))
    .pipe(bs.stream())//这里的bs.stream()就是当对css文件进行压缩并且把压缩文件传到指定目录后，会自动刷新浏览器
});
//定义处理图片文件的任务
gulp.task("images",function(){//这个任务是压缩图片任务
    gulp.src(path.images+'*.*')//获取path.images定义的路径里的所有文件，*.*就是所有格式文件，如：xx.jpg，xx.png等格式文件
    .pipe(cache(imagemin()))//使用cache方法对images目录里的所有图片进行查看是否压缩过，如果压缩过就缓存起来不进行压缩，如果没压缩
    //会传到imagemin()方法里进行压缩
    .pipe(gulp.dest(path.images_dist))//把压缩的图片存放到path变量定义的images_dist路径里
    .pipe(bs.stream())//这里的bs.stream()就是当对css文件进行压缩并且把压缩文件传到指定目录后，会自动刷新浏览器
});
//定义监听文件修改的任务
gulp.task("watch",function(){
    gulp.watch(path.css+"*.scss",['css']);//这里是监听path.css里的所有css文件，如果这里的css文件有内容改变就执行css名称的任务
    gulp.watch(path.js+"*.js",['js']);
    gulp.watch(path.images+"*.*",['images']);
    gulp.watch(path.html+"*.html",['html']);
});
//初始化browser-sync的任务
gulp.task('bs',function(){
    bs.init({//bs.init就是初始化方法，就是一调用bs任务就会马上执行的
        "server":{//这里设置"baserDir"为当前目录，就是执行这个bs任务会在浏览器打开这个终端目录
            "baserDir":"./"
        }
    });
});
//创建一个默认的任务
//gulp.task('default',['bs','watch']);//这里是先执行初始化的bs，然后再执行watch，把这个注销掉，因为我们现在是django启动的
gulp.task("default",["watch"]);//这样这里就只执行watch，watch就是监听文件修改