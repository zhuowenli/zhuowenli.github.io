/**
 * @author: 卓文理
 * @email : 531840344@qq.com
 * @desc  : Description
 */

var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('styles', function() {
    gulp.src('res/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('.'))
});

//Watch task
gulp.task('default',function() {
    gulp.watch('res/**/*.scss', ['styles']);
});