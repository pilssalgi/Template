var gulp = require('gulp');
var gulpSequence = require('gulp-sequence');

gulp.task('release',function(cb){
    gulpSequence('clean',['copy','imagemin'],['js:release','scss:release','svgstore','pug:release'],cb)
});