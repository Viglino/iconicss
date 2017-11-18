/** Gulp file to create dist
*/
var gulp = require("gulp");
var autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const cssmin = require('gulp-cssmin');

gulp.task('css', function () {
    gulp.src(['icss.css','./css/*.css'])
        .pipe(autoprefixer('last 10 versions', 'ie 10'))
		.pipe(concat('iconicss.css'))
		.pipe(gulp.dest('./dist'));
});

gulp.task('cssmin', function () {
    gulp.src(['icss.css','./css/*.css'])
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
		}))
		.pipe(concat('iconicss.min.css'))
		.pipe(cssmin())
		.pipe(gulp.dest('./dist'));
});

// The default task that will be run if no task is supplied
gulp.task("default", ["css", "cssmin"]);
