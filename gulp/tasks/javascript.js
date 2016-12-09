var gulp        = require('gulp');
var webpack     = require('gulp-webpack');
var uglify      = require('gulp-uglify');
var named       = require('vinyl-named');
var through     = require('through');
var browserSync = require('browser-sync');
var config      = require('../config');
var dest        = config.base.dest;

gulp.task('js', function() {
  return gulp.src(config.js.files,{ base: config.base.src })
    .pipe(named(function(file) {
      return file.relative.replace(/\.[^\.]+$/, '');
    }))
    .pipe(webpack())
    .pipe(uglify())
    .pipe(gulp.dest(dest))
    .pipe(browserSync.reload({stream:true}));
});
