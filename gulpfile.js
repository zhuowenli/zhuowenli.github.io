
var gulp = require('gulp');
var exec = require('child_process').exec;

gulp.task('babel', function(cb){
    exec('babel src --out-dir build', function(err, stdout, stderr){
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
})

gulp.task('default', function(){
    gulp.watch(['./src/**/*.js'], ['babel']);
});
