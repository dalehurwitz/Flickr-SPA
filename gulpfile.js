var gulp = require("gulp");
var browserify = require("browserify");
var babelify = require("babelify");
var source = require("vinyl-source-stream");
var buffer = require("vinyl-buffer");
var browserSync = require("browser-sync").create();
var del = require("del");
var uglify = require("gulp-uglify");
var gulpIf = require("gulp-if");
var less = require("gulp-less");

var config = {
	paths: {
		js: "./src/**/*.js",
		mainJs: "./src/main.js",
		less: "./src/less/**/*.less",
		mainLess: "./src/less/main.less",
		dist: "./dist"
	}
}

gulp.task("build", function () {

	var isProd = process.env.NODE_ENV === "production";

    browserify({ entries: config.paths.mainJs, debug: true })
        .transform("babelify", {presets: ["es2015", "react"]})
        .bundle()
		.on("error", console.error.bind(console))
        .pipe(source("bundle.js"))
		.pipe(gulpIf(isProd, buffer()))
		.pipe(gulpIf(isProd, uglify()))
        .pipe(gulp.dest(config.paths.dist + "/js"))
		.pipe(browserSync.stream());
});

gulp.task("less", function() {
	gulp.src(config.paths.mainLess)
		.pipe(less())
		.pipe(gulp.dest(config.paths.dist + "/css"))
		.pipe(browserSync.stream());
});

gulp.task("build:prod", ["set-env:prod", "clean", "build", "set-env:dev"]);

gulp.task("browserSync", function () {
	browserSync.init({
		server: {
			baseDir: config.paths.dist
		}
	})
});

gulp.task("default", ["browserSync"], function() {
	gulp.watch(config.paths.js, ["build"]);
	gulp.watch(config.paths.less, ["less"]);
});

gulp.task("clean", function() {
	del([config.paths.dist + "/js"]);
});

gulp.task("set-env:prod", function() {
	process.env.NODE_ENV = "production";
});

gulp.task("set-env:dev", function() {
	process.env.NODE_ENV = "development";
});
