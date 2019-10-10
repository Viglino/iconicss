/** Gulp file to create dist
*/
var gulp = require("gulp");
var autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const cssmin = require('gulp-cssmin');
const bump = require('gulp-bump');

/** Autoprefix CSS + minification */
function css() {
    return gulp
        .src(['icss.css','./css/*.css'])
        .pipe(autoprefixer('last 10 versions', 'ie 10'))
		.pipe(concat('iconicss.css'))
		.pipe(gulp.dest('./dist'));
};

function mincss() {
    return gulp
        .src(['icss.css','./css/*.css'])
        .pipe(autoprefixer({
            cascade: false
		}))
		.pipe(concat('iconicss.min.css'))
		.pipe(cssmin())
		.pipe(gulp.dest('./dist'));
};

/** Create a custom build using the custom dir */
function custom() {
    return gulp
        .src(['icss.css','./custom/*.css'])
        .pipe(autoprefixer({
            cascade: false
		}))
		.pipe(concat('myiconicss.css'))
		.pipe(cssmin())
		.pipe(gulp.dest('./dist'));
};

function dobump() {
    return gulp
        .src('./package.json')
        .pipe(bump({type:'minor'}))
        .pipe(gulp.dest('./'));

};

const build = gulp.series(gulp.parallel(css, mincss));

exports.css = css;
exports.mincss = mincss;
exports.custom = custom;
exports.dobump = dobump;
exports.default = build;