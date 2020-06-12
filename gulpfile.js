const gulp = require('gulp')
const sass = require('gulp-sass')
const babel = require('gulp-babel')

sass.compiler = require('node-sass')

function styles() {
  return gulp.src('styles/**/*.scss')
      .pipe(sass({ outputStyle: 'compressed', includePaths: ['styles'] })
          .on('error', sass.logError))
      .pipe(gulp.dest('static/styles'))
}

function scripts() {
  return gulp.src('scripts/**/*.js')
      .pipe(babel({ presets: ['@babel/preset-env'] }))
      .pipe(gulp.dest('static/scripts'))
}

function watch() {
  gulp.watch('./styles/**/*.scss', styles)
  gulp.watch('./scripts/**/*.js', scripts)
}

exports.build = gulp.parallel(styles, scripts)
exports.watch = gulp.series(exports.build, watch)
exports.default = exports.build
