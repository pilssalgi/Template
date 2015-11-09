
var gulp 		= require('gulp');
var uglify 	= require('gulp-uglify');
var concat 	= require('gulp-concat');
var source 	= require('vinyl-source-stream');
var buffer 	= require('vinyl-buffer');
var sass 		= require('gulp-sass');
var clean 	= require('del');
var minifycss 	= require('gulp-minify-css');
var minifyhtml 	= require('gulp-minify-html');
var browserify 	= require('browserify');
var browserSync = require('browser-sync').create();
var imagemin    = require('gulp-imagemin');
var changed     = require('gulp-changed');

var paths = {
	sass : 'src/css/main.scss'
}

gulp.task('server',['images','uglify','sass','minifyhtml'],function(){
	return browserSync.init({
		server : {
			baseDir : './public'
		}
	})
});

gulp.task('clean', function(cb) {
  clean(['public/images'],function(){});
});

gulp.task('images',function() {
	// clean(['public/images']).then(
		gulp.src('src/images/**')
    .pipe(changed('public/images/')) // Ignore unchanged files
    .pipe(imagemin({cache:false})) // Optimize
    .pipe(gulp.dest('public/images/'))
    .pipe(browserSync.reload({stream:true}))
	// )
})

gulp.task('minifyhtml',function(){
	return gulp.src('src/**/*.html')
		.pipe(minifyhtml())
		.pipe(gulp.dest('public'))
		.pipe(browserSync.reload({stream:true}));
});

gulp.task('sass',function(){
	return gulp.src(paths.sass)
		.pipe(sass())
		.pipe(minifycss())
		.pipe(gulp.dest('public/css'))
		.pipe(browserSync.reload({stream:true}));
});

gulp.task('uglify',function(){
	return browserify('src/js/index.js')
		.bundle()
		.pipe(source('index.js'))
		.pipe(buffer())
		.pipe(uglify())
		.pipe(gulp.dest('public/js'))
		.pipe(browserSync.reload({stream:true}));
});

gulp.task('watch',function(){
	gulp.watch('src/images/**',['images']);
	gulp.watch('src/**/*.js',['uglify']);
	gulp.watch('src/**/*.scss',['sass']);
	gulp.watch('src/**/*.html',['minifyhtml']);
});

gulp.task('default',['clean','server','watch']);


