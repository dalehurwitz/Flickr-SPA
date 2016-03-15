var gulp = require("gulp");
var browserify = require("browserify");
var babelify = require("babelify");
var source = require("vinyl-source-stream");
var browserSync = require("browser-sync");

var config = {
	paths: {
		js: "./src/**/*.js",
		mainJs: "./src/app.js",
		dist: "./dist"
	}
}

gulp.task("build", function () {
    browserify({ entries: config.paths.mainJs, debug: true })
        .transform("babelify", {presets: ["es2015", "react"]})
        .bundle()
		.on("error", console.error.bind(console))
        .pipe(source("bundle.js"))
        .pipe(gulp.dest(config.paths.dist + "/js"));
});

gulp.task("browserSync", function () {
	browserSync({
		server: {
			baseDir: "./dist"
		}
	})
});

gulp.task("watch", ["build"], browserSync.reload);

gulp.task("default", ["browserSync"], function() {
	 gulp.watch(config.paths.js, ["watch"]);
});