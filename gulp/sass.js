import gulp from 'gulp';
import gulpSass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import cleanCss from 'gulp-clean-css';

function task({ src, dest }) {
  return function sass() {
    return gulp
      .src(src)
      .pipe(gulpSass().on('error', gulpSass.logError))
      .pipe(autoprefixer())
      .pipe(cleanCss())
      .pipe(gulp.dest(dest));
  };
}

export { task as default };
