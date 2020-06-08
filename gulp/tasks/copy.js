var gulp         = require('gulp');
var config       = require('../config');
var browserSync  = require('browser-sync');
const changed     = require('gulp-changed');
const path          = require('path');
const dest          = path.join(config.base.dest, config.copy.dest);

gulp.task('copy', function() {
  return gulp.src(config.copy.src)
    .pipe(changed(dest))
    .pipe(gulp.dest(dest))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('copy:release', function() {
  return gulp.src(config.copy.src)
    .pipe(gulp.dest(dest))
});
