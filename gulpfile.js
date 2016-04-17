/**
 * @author: 卓文理
 * @email : 531840344@qq.com
 * @site  : www.zhuowenli.com
 */

var gulp = require('gulp'),
    sass   = require('gulp-sass'),
    plumber = require('gulp-plumber');
var nodemon    = require('gulp-nodemon');
var livereload = require('gulp-livereload');

var exec = require('child_process').exec;

var nodemonConfig = '';

gulp.task('serve', function() {
    livereload.listen();

    return nodemon({
        script: './bin/www',
        watch : './src/',
        ext: "js",
        env: { 'NODE_ENV': 'development' }
    })
    .on('start', function () {
        console.log('nodemon start!')
        setTimeout(function () {
            livereload();
            console.log('Reload done!')
        }, 1000)
    });
});

gulp.task('babel', function(cb){
    return exec('babel src --out-dir build', function(err, stdout, stderr){
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

gulp.task('sass', function() {
    //编译sass
    return gulp.src('./assets/sass/*.scss')
        .pipe(plumber({errorHandler: function(e){console.log(e);this.emit('end');}}))
        .pipe(sass())
        .pipe(gulp.dest('./assets/css/'));
});

gulp.task('default', ['serve'], function(){
    gulp.watch('./assets/sass/**/*.scss', ['sass']);
    gulp.watch(['./src/**/*.js'], ['babel']);
});
