require('dotenv').config();

import path from 'path';
import gulp from 'gulp';
import browserSync from 'browser-sync';
import rollup from './gulp/rollup';
import sass from './gulp/sass';

const THEME_NAME = 'studionock';
const THEME_ROOT = path.join('web/app/themes', THEME_NAME);

const paths = {
  styles: {
    src: path.join(THEME_ROOT, 'src/scss/**/*.scss'),
    dest: path.join(THEME_ROOT, 'assets/css'),
  },
  scripts: {
    src: path.join(THEME_ROOT, 'src/js/app.js'),
    dest: path.join(THEME_ROOT, 'assets/js/app.js'),
  },
};

exports.rollup = rollup({
  src: paths.scripts.src,
  dest: paths.scripts.dest,
  name: THEME_NAME,
});

exports.sass = sass({ src: paths.styles.src, dest: paths.styles.dest });

const bs = browserSync.create();
const reload = done => {
  bs.reload();
  done();
};

exports.watch = function watch() {
  bs.init({
    proxy: process.env.WP_HOME,
  });

  gulp.watch(
    paths.scripts.src.replace('app.js', '**/*.js'),
    gulp.series(exports.rollup, reload),
  );

  gulp.watch(paths.styles.src, () => exports.sass().pipe(bs.stream()));
};
