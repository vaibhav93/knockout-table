var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    connect = require('gulp-connect');

//default task
gulp.task('default', ['server','watchJS','watchHTML','watchDIST']);

//conenct server
gulp.task('server', function () {
    connect.server({
        root: 'demo',
        livereload: true,
        port:9000
    });
});

//watchJS
gulp.task('watchJS', function () {
    gulp.watch(['src/*.js'], ['jshint', 'uglify']);
});

gulp.task('watchDIST',function(){
    gulp.watch(['dist/*js'],['toDEMO']);
})

gulp.task('toDEMO',function(){
    return gulp.src('dist/*.js')
        .pipe(gulp.dest('demo/js'));
});

//watch HTML and CSS
gulp.task('watchHTML',function(){
    gulp.watch(['demo/*.html','demo/css/*.css'],['reload']);
})

gulp.task('reload',function(){
    return gulp.src(['demo/*.html'])
    .pipe(connect.reload());
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
        .pipe(rename('knockout.table.min.js'))
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload());
});
