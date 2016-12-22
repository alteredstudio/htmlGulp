'use strict';

var gulp = require('gulp'); // Gulp Javascript Task Runner
var sass = require('gulp-sass'); // SCSS & SASS Compiler
var csslint = require('gulp-csslint'); // CSS Error message handling
var cssmin = require('gulp-cssmin'); // Combine Files
var autoprefixer = require('gulp-autoprefixer'); // CSS vender prefixes
var uglify = require('gulp-uglify'); // Commpress JS
var concat = require('gulp-concat'); // Combine Files
var imagemin = require('gulp-imagemin'); // Commpress Images
var watch = require('gulp-watch'); // Watch files for changes then build
var plumber = require('gulp-plumber'); // Fix error breaking watch

// Task to Minify JS
gulp.task('js-min', function() {
  // If you want to include files in a specific order
  // return gulp.src([
  //   './js/example.js',
  //   './js/example.js',
  //   './js/example.js'
  // ])
  return gulp.src('./src/assets/js/*.js')
    .pipe(uglify())
    .pipe(concat('scripts.min.js'))
    .pipe(gulp.dest('src/assets/js'));
});

gulp.task('sass-min', function () {
  // gulp.src([
  //   'css/**/*.scss'
  // ])
  gulp.src([
    'src/assets/css/scss/import.scss'
  ])
  .pipe(plumber())
  .pipe(sass({outputStyle: 'compressed'}))
  .pipe(csslint())
  .pipe(autoprefixer())
  .pipe(cssmin())
  .pipe(concat('styles.min.css'))
  .pipe(gulp.dest('src/assets/css'));
  // .pipe(gulp.dest('leads/css'));
});

gulp.task('img-min', () =>
    gulp.src('src/assets/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('src/assets/img'))
);

gulp.task('watch', function () {
  gulp.watch('src/assets/**/*.+(scss|js)', ['default']);
});

// Gulp Default Task
gulp.task('default', ['js-min', 'sass-min', 'img-min']);
