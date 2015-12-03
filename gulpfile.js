var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    rename = require("gulp-rename"),
    uglify = require('gulp-uglify');

//default task
gulp.task('default', ['watchJS']);

//watchJS
gulp.task('watchJS', function () {
    gulp.watch(['src/*.js'], ['jshint', 'uglify']);
});

//jshint task
gulp.task('jshint', function () {
    return gulp.src(['src/*.js'])
        .pipe(jshint({multistr: true}))
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(gulp.dest('dist'));
});

//uglify
gulp.task('uglify',function () {
    return gulp.src('src/*.js')
        .pipe(uglify())
        .pipe(rename('knouckout.table.min.js'))
        .pipe(gulp.dest('dist'));
});
