'use strict';

const gulp = require('gulp');
const connect = require('gulp-connect');
const uglify = require('gulp-uglify');
const minifyInline = require('gulp-minify-inline');
const htmlmin = require('gulp-htmlmin');

var dest = 'dist/';

gulp
  .task('serve', function () {
    connect.server({
      root: dest,
      livereload: true
    });
  })
  .task('js', function () {
    var js_dest = dest + 'assets/js';
    gulp.src(
      [
        'bower_components/bootstrap/dist/css/bootstrap.min.css',
        'bower_components/bootstrap/dist/css/bootstrap-theme.min.css',
        'bower_components/html5shiv/dist/html5shiv.min.js',
        'bower_components/respond/dest/respond.min.js',
        'bower_components/angular/angular.min.js',
        'bower_components/jquery/dist/jquery.min.js',
        'bower_components/bootstrap/dist/js/bootstrap.min.js'
      ]
    ).pipe(gulp.dest(js_dest));
    gulp.src(
      [
        'src/startpage.js'
      ]
    ).pipe(gulp.dest(js_dest));
  })
  .task('minify', function () {
    var minifyInlineOption = {
        output: {
          comments: false
        }
      },
      htmlminOption = {
        collapseWhitespace: true,
        removeComments: true
      };
    gulp.src('src/index.html')
      .pipe(minifyInline(minifyInlineOption))
      .pipe(htmlmin(htmlminOption))
      .pipe(gulp.dest(dest))
  })
  .task('copy', function() {
      gulp.src('src/*.json')
        .pipe(gulp.dest(dest))
  })
  .task('watch', function() {
    gulp.watch('src/*.html', ['minify']);
    gulp.watch('src/*.js', ['js']);
    gulp.watch('src/*.json', ['copy']);
  });

gulp.task('default', ['js', 'minify', 'copy', 'serve', 'watch']);
