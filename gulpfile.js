const { src, dest, series, parallel, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const del = require('del');
const pug = require('gulp-pug');
const uglify = require('gulp-uglify-es').default;
const concat = require('gulp-concat');
const avif = require('gulp-avif');
const webp = require('gulp-webp');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const svgSprite = require('gulp-svg-sprite');
const fonter = require('gulp-fonter');
const ttf2woff2 = require('gulp-ttf2woff2');
const babel = require('gulp-babel');
const browserSync = require('browser-sync').create();

const html = () => {
  return src('src/pages/**/*.pug')
    .pipe(pug())
    .pipe(dest('build/'))
    .pipe(browserSync.stream());;
};

const css = () => {
  return src('src/sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'compressed' })).on('error', sass.logError)
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('.'))
    .pipe(dest('build/styles/'))
    .pipe(browserSync.stream());;
};


const js = () => {
  return src('src/js/**/*.js',)
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(src([
      './node_modules/bootstrap/dist/js/bootstrap.min.js',
      './node_modules/bootstrap/dist/js/bootstrap.min.js.map',
      './node_modules/swiper/swiper-bundle.min.js',
      './node_modules/swiper/swiper-bundle.min.js.map'
    ]))
    .pipe(dest('build/js/'))
    .pipe(browserSync.stream());
};

const images = () => {
  return src(['src/images/**/*.*', '!src/images/**/*.svg'])
    .pipe(newer('build/images'))
    .pipe(avif({ quality: 50 }))

    .pipe(src('src/images/**/*.*'))
    .pipe(newer('build/images'))
    .pipe(webp())

    .pipe(src('src/images/**/*.*'))
    .pipe(newer('build/images'))
    .pipe(imagemin())

    .pipe(dest('build/images'))
    .pipe(browserSync.stream());
};


const sprite = () => {
  return src('build/images/**/*.svg')
    .pipe(svgSprite({
      mode: {
        stack: {
          sprite: '../sprite.svg',
          example: true,
        },
      },
    }))
    .pipe(dest('build/images'));
};

const fonts = () => {
  return src('src/fonts/**/*.*')
    .pipe(fonter({
      formats: ['woff', 'ttf']
    }))
    .pipe(src('build/fonts/**/*.ttf'))
    .pipe(ttf2woff2())
    .pipe(dest('build/fonts'))
    .pipe(browserSync.stream());
};

const watching = () => {
  watch(['src/sass/**/*.scss'], css);
  watch(['src/pages/**/*.pug'], html);
  watch(['src/js/**/*.js'], js);
  watch(['src/images/'], images);
  watch(['src/fonts/'], fonts);
};

const clean = () => {
  return del('build/');
};

const browserSyncJob = () => {
  browserSync.init({
    server: "build/"
  });

  watching();
};

exports.del = clean;
exports.html = html;
exports.css = css;
exports.js = js;
exports.images = images;
exports.fonts = fonts;
exports.sprite = sprite;
exports.watching = watching;
exports.server = browserSyncJob;

const build = series(clean, parallel(html, css, js, images, fonts), sprite);
exports.default = parallel(build, browserSyncJob);