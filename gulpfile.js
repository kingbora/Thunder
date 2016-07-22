var gulp = require("gulp");
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var tsify = require("tsify");

gulp.task("default", function () {
    return browserify({
        basedir: '.',
        debug: true,
        entries: ['src/Game.ts'],
        cache: {},
        packageCache: {}
    })
    .plugin(tsify)
    .bundle()
    .pipe(source('out.js'))
    .pipe(gulp.dest("dist"));
});
