//Pug(テンプレートエンジン)
var config      = require('../config');
var path        = require('path');
var paths = {
	dest: path.join(config.base.dest, config.html.dest)
}
gulp.task("pug", function() {
		gulp.src(
			 ["src/**/*.pug",'!' + "src/**/_*.pug"] //参照するディレクトリ、出力を除外するファイル
		)
		.pipe(data( file => {
        return JSON.parse(fs.readFileSync(`./pages.json`));
    }))
    //ここまで追記

		.pipe(pug())
		.pipe(gulp.dest(paths.dest))
		// .pipe(gulp.dest("dest/")) //出力先
});