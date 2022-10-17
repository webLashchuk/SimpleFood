const { src, dest, watch, parallel, series } = require('gulp');

const scss           = require('gulp-sass')(require('sass'));
const concat         = require('gulp-concat');
const autoprefixer   = require('gulp-autoprefixer');
const uglify         = require('gulp-uglify');
const imagemin       = require('gulp-imagemin');
const svgSprite      = require('gulp-svg-sprite');
const del            = require('del');
const browserSync    = require('browser-sync').create();

function browsersync() {
    browserSync.init({
        server: {
            baseDir: 'app/'
        },
        notify: false
    })
}

function styles() {
    return src('app/scss/style.scss')
        .pipe(scss())
        .pipe(concat('style.css'))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 10 versions'],
            grid: true
        }))
        .pipe(dest('app/css'))
        .pipe(browserSync.stream())
}

function images() {
    return src('app/images/**/*.*')
        .pipe(imagemin([
            imagemin.gifsicle({ interlaced: true }),
            imagemin.mozjpeg({ quality: 75, progressive: true }),
            imagemin.optipng({ optimizationLevel: 5 }),
            imagemin.svgo({
                plugins: [
                    { removeViewBox: true },
                    { cleanupIDs: false }
                ]
            })
        ]))
        .pipe(dest('dist/images'))
}

function scripts() {
    return src([
        'node_modules/jquery/dist/jquery.js',
        'app/js/main.js'
    ])
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(dest('app/js'))
        .pipe(browserSync.stream())
}

function build() {
    return src([
        'app/**/*.html',
        'app/css/style.css',
        'app/js/main.min.js'
    ], { base: 'app' })
        .pipe(dest('dist'))
}

function svgSprites() {
    return src('app/images/icons/*.svg')
        .pipe(
            svgSprite({
                mode: {
                    stack: {
                        sprite: '../sprite.svg',
                    },
                },
            })
        )
        .pipe(dest('app/images'));
}

function cleanDist() {
    return del('dist')
}

function watching() {
    watch(['app/scss/**/*.scss'], styles);
    watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts);
    watch(['app/images/icons/*.svg'], svgSprites);
    watch(['app/**/*.html']).on('change', browserSync.reload);
}

exports.styles = styles;
exports.scripts = scripts;
exports.browsersync = browsersync;
exports.watching = watching;
exports.images = images;
exports.svgSprites = svgSprites;
exports.cleanDist = cleanDist;
exports.build = series(cleanDist, images, build);

exports.default = parallel(svgSprites, styles, scripts, browsersync, watching);