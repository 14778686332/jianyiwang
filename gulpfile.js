var gulp = require('gulp'),
    minifyCss = require("gulp-cssmin"),
    rename = require("gulp-rename"),
    uglify = require("gulp-uglify"),
    babel = require("gulp-babel"),
    htmlmin = require('gulp-htmlmin'),
    imgmin = require("gulp-imagemin");

//压缩css
gulp.task('minify-css', function () {
    gulp.src('src/css/*.css') // 要压缩的css文件
    .pipe(minifyCss()) //压缩css
    .pipe(gulp.dest('dist/css'));
});

//压缩js
gulp.task('minify-js', function () {
    gulp.src('src/js/*.js') // 要压缩的js文件
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest('dist/js')); //压缩后的路径
});

// 压缩html
gulp.task('minify-html',function(){
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: false,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: false,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    gulp.src('src/html/*.html')
    .pipe(htmlmin(options))
    .pipe(gulp.dest('dist/html'))
});

gulp.task("htmlmin",function(){
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: false,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: false,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    gulp.src("src/index.html").pipe(htmlmin(options)).pipe(gulp.dest("dist"))
})
//压缩图片
// gulp.task('minify-img',function(){
//     gulp.src('src/img/**/*.{png,jpg,gif,ico}')
//     .pipe(imgmin())
//     .pipe(gulp.dest("dist/img"))
// });

//转存sass
// gulp.task('sassSave',function(){
//     gulp.src("src/sass/*.scss")
//     .pipe(gulp.dest("dist/sass"));
// });

//转存lib
// gulp.task('sassLib',function(){
//     gulp.src("src/lib/*.js")
//     .pipe(gulp.dest("dist/lib"));
// });

//整合 
gulp.task('default',()=>{
    gulp.start('minify-css','minify-js','minify-html','htmlmin');
});