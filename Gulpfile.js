/**
 * @author: 卓文理
 * @email : 531840344@qq.com
 * @desc  : Description
 */

var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');

gulp.task('styles', function() {
    gulp.src('res/**/*.scss')
        .pipe(plumber({errorHandler: function(e){console.log(e);this.emit('end');}}))
        .pipe(sass())
        .pipe(gulp.dest('res/'))
});

//Watch task
gulp.task('default',function() {
    gulp.watch('res/**/*.scss', ['styles']);
});