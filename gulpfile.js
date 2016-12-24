'use strict';

const gulp = require('gulp');
const connect = require('gulp-connect');

gulp.task('serve', function () {
    connect.server({
        root: 'public'
    });
});

gulp.task('default', ['serve']);
