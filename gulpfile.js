var gulp = require('gulp');
var less = require('gulp-less');
var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var server = require('browser-sync');

gulp.task('style', function() {
	gulp.src('less/style.less')
	.pipe(plumber())
	.pipe(less())
	.pipe(postcss([
		autoprefixer({browsers: [
			'last 1 version',
			'last 2 Chrome versions'
			]})
		]))
	.pipe(gulp.dest('css'))
	.pipe(server.reload({stream: true}));
});

gulp.task('index', ['style'], function() {
	server.init({
		server: '.'
	});

	gulp.watch('less/**/*.less', ['style']);
	gulp.watch('*.html')
			.on('change', server.reload);
});

gulp.task('less', function() {
	gulp.src('less/style.less')
	.pipe(less())
	.pipe(gulp.dest('css'));
});