const gulp = require('gulp')
const sass = require('gulp-sass')
const babel = require('gulp-babel')
const { spawn } = require('child_process')

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

function hugo(cb) {
  const hg = spawn('hugo', ['server'], { stdio: 'inherit' })
  hg.on('exit', (code) => {
    cb(code === 0 ? null : code)
  })
}

function watch(cb) {
  gulp.watch('./styles/**/*.scss', styles)
  gulp.watch('./scripts/**/*.js', scripts)
}

exports.build = gulp.parallel(styles, scripts)
exports.watch = gulp.series(exports.build, gulp.parallel(watch, hugo))
exports.default = exports.build
