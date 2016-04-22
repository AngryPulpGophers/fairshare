var gulp = require('gulp');
var webpack = require('webpack-stream');
var $    = require('gulp-load-plugins')();
var nodemon = require('gulp-nodemon');
var clean = require('gulp-clean-css');

var sassPaths = [
  'bower_components/foundation-sites/scss',
  'bower_components/motion-ui/src'
];

gulp.task('sass', function() {
  return gulp.src('./scss/app.scss')
    .pipe($.sass({
      includePaths: sassPaths
    })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }))
    .pipe(gulp.dest('client/styles'));
});

//minify css
gulp.task('minify-css', function() {
  return gulp.src('./client/styles/app.css')
    .pipe(clean({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/styles/'));
});

gulp.task('webpack', function() {
  return gulp.src('./client/**/*.js')
    .pipe(webpack( require('./webpack.config.js') ))
    .pipe(gulp.dest('./dist/'));
});

//fire up our server
gulp.task('dev', function () {
  nodemon({
    script: 'server/index.js',
    ext: 'js html',
    env: { 'NODE_ENV': 'development' }
  });
});

gulp.task('default', ['webpack','sass','dev'], function() {
  gulp.watch(['scss/**/*.scss'], ['sass']);
});
gulp.task('prod',['webpack','sass','minify-css']);
