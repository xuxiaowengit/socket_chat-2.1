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
// console.log('启动gulp.js文件')




const { series } = require('gulp')


function get(done) {
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



exports.default = series(get);