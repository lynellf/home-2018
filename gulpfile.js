'use strict';

var gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  sass = require('gulp-sass'),
  maps = require('gulp-sourcemaps'),
  del = require('del');

gulp.task('compileSass', function() {
  gulp
    .src('./front-end/src/styles/scss/styles.scss')
    .pipe(maps.init())
    .pipe(sass())
    .on('error', function(err) {
      console.log(err.toString());

      this.emit('end');
    })
    .pipe(maps.write('./front-end/src/styles/css'))
    .pipe(gulp.dest('./front-end/src/styles/css'));
});

gulp.task('watch', function() {
  gulp.watch(
    [
      './front-end/src/styles/scss/**/*.scss',
      './front-end/src/components/**/*.scss',
    ],
    ['compileSass']
  );
});
