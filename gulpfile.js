    // 引入gulp自動化模塊
    const gulp = require('gulp')

    //需要引入 gulp-less 工具中间件来处理less的文件流编译
    const less = require("gulp-less");

    //引入一个处理css补充兼容性前缀
    const autoprefixer = require("gulp-autoprefixer");

    //引入一个css压缩库
    const miniCss = require("gulp-minify-css");

    //引入生成sourcemap 映射文件库
    const sourcemaps = require("gulp-sourcemaps");

    //引入重命名库
    const rename = require("gulp-rename");

    //   引入自動化模塊
    const { watch, series } = require('gulp')


    function Reless(done) {
        console.log('启动gulp处理less')
            //  读取文件流（读取需要编译的less文件）
            // gulp.src("./staic/less/index.less") ///单个处理
            // gulp.src(["./src/less/index.less", "./src/less/reset.less"]) //多个处理
        gulp.src("./static/less/**/*.less") //n多个处理
            .pipe(sourcemaps.init()) //初始化映射
            .pipe(less()) //在流的中间添加一个处理less 的环节用于编译less
            .pipe(autoprefixer({
                // browsers:["last 5 versions"],//配置需要考虑兼容的浏览器的版本信息 或在packgejson配置
                cascade: true, //是否美化格式
            }))
            .pipe(sourcemaps.write()) //写入map映射信息
            .pipe(gulp.dest("./static/css")) //输出压缩之前的代码
            .pipe(miniCss())
            .pipe(rename({
                suffix: '.min'
            })) //修改输出文件名 ，补个min 表示压缩文件
            .pipe(gulp.dest("./static/css")); // gulp.dest() 将读取的文件流输出到指定的位置
        done()
    }
    exports.default = series(Reless); //此方法可以同時調用多個任無 get後面逗號繼續寫就是


    // 監聽文件改變執行刷新  4.0以下方法
    // gulp.task('watch', function() {
    //     gulp.watch('./static/less/**/*.less', ['redo']); //只能调用task任务
    // })

    // 4.0以上监听方法
    watch('./static/less/**/*.*', Reless);






    //入口程序
    //引入http服务模块
    const config = require('./config/config')
    const httpServer = require("./service/httpServer");

    //引入聊天模块
    const chat = require("./chat");


    //启动 服务
    httpServer.listen(config.port, (res) => {
        console.log(`您的服务已经运行在 http://127.0.0.1:` + config.port);
        if (res) {
            console.log('http啟動失敗！')
        }
    });