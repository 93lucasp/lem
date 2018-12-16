// PACKAGES
var gulp = require('gulp'),
    gulpSequence = require('gulp-sequence'),
    browserSync = require('browser-sync').create(),
    handlebars = require('gulp-compile-handlebars'),
    rename = require('gulp-rename'),
    sourcemaps = require("gulp-sourcemaps"),
    sass = require('gulp-sass'),
    del = require("del"),
    postcss = require('gulp-postcss'),
    cleanCSS = require('gulp-clean-css'),
    autoprefixer = require('autoprefixer'),
    jsImport = require('gulp-js-import'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    htmlreplace = require('gulp-html-replace');

// REMOVE PUBLIC FOLDER
gulp.task('clean', function() {
    return del([
        './public'
    ])
});
gulp.task('minify-css', () => {
    return gulp.src('./public/assets/css/main.css')
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest('./public/assets/css/'));
});

// HANDLEBARS
gulp.task('build-hbs', function() {
    var options = {
        ignorePartials: true,
        batch: ['./src/view/partials']
    };
    return gulp.src('./src/view/pages/*.hbs')
        .pipe(handlebars("", options))
        .pipe(rename(function(path) {
            path.extname = ".html";
        }))
        .pipe(gulp.dest('src'))
        .pipe(gulp.dest('public'));
});

// SASS
gulp.task('build-sass', function() {
    return gulp.src("./src/assets/css/main.scss")
        .pipe(sass())
        .pipe(gulp.dest("./src/assets/css/"))
        .pipe(browserSync.stream());
});

gulp.task('autoprefixer-css', function() {
    return gulp.src('./src/assets/css/main.css')
        .pipe(sourcemaps.init())
        .pipe(postcss([autoprefixer()]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./public/assets/css'));
    // .pipe(gulp.dest('./public/assets/css'));
});

gulp.task('build-css-vendors', function() {
    return gulp.src('./src/assets/css/vendors.css')
        .pipe(sourcemaps.init())
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(rename(function(path) {
            path.extname = ".min.css";
        }))
        .pipe(gulp.dest('./public/assets/css'))
        .pipe(gulp.dest('./src/assets/css'));
});

// CONCAT JS VENDORS
gulp.task('build-js-vendors', function() {
    return gulp.src('./src/assets/js/vendors/import.js')
        .pipe(jsImport({ hideConsole: true }))
        .pipe(rename("vendors.js"))
        .pipe(gulp.dest('./src/assets/js/vendors/'))
        .pipe(gulp.dest('./public/assets/js/vendors/'))
});
gulp.task('copy-images', function() {
    gulp.src('./src/assets/images/**/*').pipe(gulp.dest('./public/assets/images'));

});
gulp.task('copy-videos', function() {
    gulp.src('./src/assets/videos/**/*').pipe(gulp.dest('./public/assets/videos'));

});
gulp.task('copy-js', function() {
    gulp.src('./src/assets/js/layout/**/*.js').pipe(gulp.dest('./public/assets/js/layout'));
    gulp.src('./src/assets/js/core/**/*.js').pipe(gulp.dest('./public/assets/js/core'));
});
gulp.task('concat-js', function() {
    return gulp.src(['./src/assets/js/**/*.js', '!./src/assets/js/vendors/import.js'])
        .pipe(concat('app.js'))
        .pipe(rename('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./public/assets/js/'));
});
gulp.task('copy-font', function() {
    gulp.src('src/assets/fonts/**/*')
        .pipe(gulp.dest('public/assets/fonts'))
        .pipe(gulp.dest('src/assets/fonts'));

});
gulp.task('html-replace', function() {
    gulp.src('./src/*.html')
        .pipe(htmlreplace({
            'js': '/assets/js/app.min.js'
        }))
        .pipe(gulp.dest('public'));
});
// CONNECTION SERVER
gulp.task('serve', function() {
    browserSync.init({
        open: false,
        reloadDelay: 1000,
        server: {
            baseDir: "./public"
        }
    });
});
gulp.src('src/assets/css/fonts/**/*').pipe(gulp.dest('public/assets/css/fonts')).pipe(gulp.dest('src/assets/css/fonts'));
gulp.watch('./src/assets/css/**/*.scss', ['build-sass']).on('change', browserSync.stream);
gulp.watch('./src/assets/css/main.css', ['autoprefixer-css']).on('change', browserSync.stream);
gulp.watch('./src/view/**/*.hbs', ['build-hbs']).on('change', browserSync.reload);
gulp.watch('./src/assets/js/**/*.js', ['copy-js']).on('change', browserSync.reload);

// TASKS TO RUN
// gulp.task('build', gulpSequence('clean', 'build-sass', 'build-js-vendors', 'copy-into-public', 'build-hbs'));
gulp.task('public', gulpSequence('clean', 'build-sass', 'autoprefixer-css', 'minify-css', 'copy-font', 'copy-images', 'copy-videos', 'concat-js', 'build-hbs', 'html-replace', 'serve'));
gulp.task('default', gulpSequence('build-sass', 'autoprefixer-css', 'build-js-vendors', 'copy-js', 'copy-font', 'copy-images', 'copy-videos', 'build-hbs', 'serve'));