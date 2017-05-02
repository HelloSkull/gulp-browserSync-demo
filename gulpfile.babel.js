'use strict';
import gulp from 'gulp';                        //获取gulp
import browsersync from 'browser-sync';   //获取browsersync

import babel  from 'gulp-babel';         //gulp-babel插件
import rev from 'gulp-rev-append';    //加版本号插件

import uglify from 'gulp-uglify';               //js压缩插件
import concat from 'gulp-concat';               //js合并插件
import del from 'del';                     //删除插件
import cssnano from 'gulp-cssnano';    //css压缩插件
import less from 'gulp-less';             //less文件编译
import imagemin from'gulp-imagemin';  //图片压缩插件
import htmlmin from 'gulp-htmlmin';    //html压缩插件

const targetLessPath = "src/style/**/*.less";
// const targetLessPath = "node_modules/bootstrap/less/carousel.less";

const desCssPath = "dist/style";
const delCssPath = "dist/style/**/*.css";

const targetImagesPath = "src/images/**/*.{png,jpg,jpeg,gif,ico}";
const desImagesPath = "dist/images";
const delImagesPath = "dist/images/**/*.{png,jpg,jpeg,gif,ico}";

const targetJsPath = "src/js/**/*.js";
/*const targetJsArr = [
    "node_modules/jquery/dist/jquery.min.js",
    "node_modules/bootstrap/dist/js/bootstrap.min.js",
    "node_modules/bootstrap/js/transition.js",
    "node_modules/bootstrap/js/carousel.js",
    "node_modules/jquery.stellar/jquery.stellar.js",
    targetJsPath
];*/

const desJsPath = "dist/js";
const delJsPath = "dist/js/**/*.js";

const targetHtmlPath = "src/**/*.html";
const desHtmlPath = "dist";
const delHtmlPath = "dist/**/*.html";
// const delPath = "dist/*";


gulp.task('clean',(cb)=>{
    return del([delCssPath,delJsPath,delHtmlPath],cb);
});

//操作js文件
gulp.task('scripts', ()=> {
    gulp.src(targetJsPath)            //需要操作的源文件
        .pipe(babel({ //靠这个插件编译
            presets: ['es2015']
        }))
        // .pipe(concat('index.js')) //把js文件合并成app.js文件
        .pipe(uglify()) //压缩js文件  不能放前面
        .pipe(gulp.dest(desJsPath))   //把操作好的文件放到dist/js目录下
        .pipe(browsersync.stream());  //文件有更新自动执行
});

//操作css文件
gulp.task('style', ()=> {
    gulp.src(targetLessPath)
        .pipe(less())//编译less文件
        // .pipe(concat('index.css'))
        .pipe(cssnano())                  //css压缩
        .pipe(gulp.dest(desCssPath))
        .pipe(browsersync.stream());
});

//操作图片文件
gulp.task('image', ()=> {
    gulp.src(targetImagesPath)
        // .pipe(imagemin())
        .pipe(gulp.dest(desImagesPath))
        .pipe(browsersync.stream());
});

gulp.task('html', ()=> {
    const option = {
        removeComments: true,                //清除html注释
        collapseWhitespace: true,            //压缩html
        collapseBooleanAttributes: true,     //省略布尔属性的值
        removeEmptyAttributes: true,         //删除所有空格作为属性值
        removeScriptTypeAttributes: false,    //删除type=text/javascript
        removeStyleLinkTypeAttributes: false, //删除type=text/css
        minifyJS:false,                       //压缩页面js
        minifyCSS:false                       //压缩页面css
    };
    gulp.src(targetHtmlPath)
        // .pipe(htmlmin(option))
        .pipe(rev())
        .pipe(gulp.dest(desHtmlPath))
        .pipe(browsersync.stream());
});

gulp.task('serve', ['clean'], ()=> {
    gulp.start('scripts','style','image','html');
    browsersync.init({
        port: 8081,
        server: {
            baseDir: ['dist'],
            routes:{ //匹配路由
                '/node_modules': 'node_modules'
            }
        }
    });
    gulp.watch(targetJsPath, ['scripts']);     //监控文件变化，自动更新
    gulp.watch(targetLessPath, ['style']);
    gulp.watch(targetImagesPath, ['image']);
    gulp.watch(targetHtmlPath, ['html']);
});

gulp.task('default',['serve']);