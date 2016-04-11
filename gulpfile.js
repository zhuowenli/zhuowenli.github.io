/**
 * @author: 卓文理
 * @email : 531840344@qq.com
 * @site  : www.zhuowenli.com
 */

var gulp = require('gulp'),
    sass   = require('gulp-sass'),
    plumber = require('gulp-plumber');

var exec = require('child_process').exec;

gulp.task('babel', function(cb){
    exec('babel src --out-dir build', function(err, stdout, stderr){
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

gulp.task('sass', function() {
    //编译sass
    return gulp.src('./public/sass/*.scss')
        .pipe(plumber({errorHandler: function(e){console.log(e);this.emit('end');}}))
        .pipe(sass())
        .pipe(gulp.dest('./public/css/'));
});

gulp.task('default', function(){
    gulp.watch('./public/sass/*.scss', ['sass']);
    gulp.watch(['./src/**/*.js'], ['babel']);
});
