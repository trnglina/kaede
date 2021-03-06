const gulp = require('gulp')
const sass = require('gulp-sass')
const babel = require('gulp-babel')
const git = require('gulp-git')
const { spawn } = require('child_process')
const { existsSync } = require('fs')
const { platform, chdir } = require('process')

const POSTS_REPO = 'https://github.com/trnglina/posts'

const DEPLOY_USER = 'sysadmin'
const DEPLOY_HOST = 'trnglina.org'
const DEPLOY_PATH = '/var/www/trnglina.org/public_html'

sass.compiler = require('node-sass')

function fetch(cb) {
  if (!existsSync('content')) {
    git.clone(POSTS_REPO, { args: 'content' }, function (err) {
      cb(err)
    })
  } else {
    chdir('./content/')
    git.pull('origin', 'master', {}, function (err) {
      cb(err)
    })
    chdir('../')
  }
}

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

function compile(cb) {
  const hg = spawn('hugo', ['--minify'], { stdio: 'inherit' })
  hg.on('exit', (code) => {
    cb(code === 0 ? null : code)
  })
}

function watch(cb) {
  gulp.watch('./styles/**/*.scss', styles)
  gulp.watch('./scripts/**/*.js', scripts)
}

function serve(cb) {
  const hg = spawn('hugo', ['server', '--disableLiveReload'], { stdio: 'inherit' })
  hg.on('exit', (code) => {
    cb(code === 0 ? null : code)
  })
}

function deploy(cb) {
  const rs = platform === 'win32' ?
    spawn('wsl', ['rsync', '-Iavz', 'public/', `${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}`], { stdio: 'inherit' }) :
    spawn('rsync', ['-Iavz', 'public/', `${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}`], { stdio: 'inherit' })

  rs.on('exit', (code) => {
    cb(code === 0 ? null : code)
  })
}

exports.build = gulp.series(fetch, gulp.parallel(styles, scripts, compile))
exports.dev = gulp.series(exports.build, gulp.parallel(watch, serve))
exports.deploy = gulp.series(exports.build, deploy)
exports.default = exports.build
