var gulp = require("gulp");
var browserify = require("browserify");
var babelify = require("babelify");
var source = require("vinyl-source-stream");
var browserSync = require("browser-sync").create();

var config = {
	paths: {
		js: "./src/**/*.js",
		mainJs: "./src/main.js",
		dist: "./dist"
	}
}

gulp.task("build", function () {
    browserify({ entries: config.paths.mainJs, debug: true })
        .transform("babelify", {presets: ["es2015", "react"]})
        .bundle()
		.on("error", console.error.bind(console))
        .pipe(source("bundle.js"))
        .pipe(gulp.dest(config.paths.dist + "/js"))
		.pipe(browserSync.stream());
});

gulp.task("browserSync", function () {
	browserSync.init({
		server: {
			baseDir: config.paths.dist
		}
	})
});

gulp.task("default", ["browserSync"], function() {
	 gulp.watch(config.paths.js, ["build"]);
});
