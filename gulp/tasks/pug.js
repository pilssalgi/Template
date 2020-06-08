var config      = require('../config');
var path        = require('path');
var gulp   			= require('gulp');
var pug 				= require("gulp-pug");
var data 				= require("gulp-data");
var fs 					= require("fs");
let browserSync   = require('browser-sync');
let handleErrors  = require('../lib/handleErrors');

var paths = {
	dest: path.join(config.base.dest, config.html.dest)
}
gulp.task("pug", function() {
	gulp.src(
		 ["src/**/*.pug",'!' + "src/**/_*.pug"] //参照するディレクトリ、出力を除外するファイル
	)
	.pipe(pug({basedir: config.pug.basedir}))
	.on('error', handleErrors)
	.pipe(gulp.dest(paths.dest))
	.pipe(browserSync.reload({stream:true}));
});

gulp.task("pug:release", function() {
	gulp.src(
		 ["src/**/*.pug",'!' + "src/**/_*.pug"] //参照するディレクトリ、出力を除外するファイル
	)
	.pipe(pug({basedir: config.pug.basedir}))
	.on('error', handleErrors)
	.pipe(gulp.dest(paths.dest))
});