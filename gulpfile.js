const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

sass.compiler = require('node-sass');

gulp.task(
    'styles',
    () => gulp.src('styles/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed', includePaths: ['styles']})
            .on('error', sass.logError))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('static/styles')));

gulp.task(
    'js',
    () => gulp.src('scripts/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel({presets: ['@babel/preset-env']}))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('static/scripts')));

gulp.task('watch', () => {
  gulp.watch('./styles/**/*.scss', gulp.series('styles'));
  gulp.watch('./scripts/**/*.js', gulp.series('js'));
});

gulp.task('build', gulp.series(['styles', 'js']));

gulp.task('default', gulp.series('watch'));
