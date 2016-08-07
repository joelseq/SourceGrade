'use strict';

const gulp           = require('gulp'),
      del            = require('del'),
      sass           = require('gulp-sass'),
      babel          = require('gulp-babel'),
      watch          = require('gulp-watch'),
      batch          = require('gulp-batch'),
      cssnano        = require('gulp-cssnano'),
      nodemon        = require('gulp-nodemon'),
      injector       = require('gulp-inject'),
      sourcemaps     = require('gulp-sourcemaps'),
      browserSync    = require('browser-sync'),
      autoprefixer   = require('gulp-autoprefixer');

//======================
// Compiling SCSS to CSS
//======================
gulp.task('workflow', function() {
    gulp.src('./src/sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cssnano())
        .pipe(sourcemaps.write('./'))

        .pipe(gulp.dest('./public/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

//===============================================
// Automatically inject js files in index.html
//===============================================
gulp.task('inject', function () {
    var target = gulp.src('./public/index.html');
    // It's not necessary to read the files (will speed up things), we're only after their paths:
    var sources = gulp.src(['!./public/vendor/**/*.js', './public/**/*.js'], {read: false});

    return target.pipe(injector(sources))
        .pipe(gulp.dest('./public'));
});


//=================================
// Browser Sync
//=================================
gulp.task('browserSync', function() {
    browserSync.init({
        proxy: 'http://localhost:3000',
        files: './public/**/*.*',
        notify: false,
        port: 5000
    });
});


//===========================
// Transpiling ES6 to ES5
//===========================
gulp.task('build', ['clean'], function() {
    gulp.src('./src/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest('./build'))
});


//===========================
// Clean Build directory
//===========================
gulp.task('clean', function() {
    del(['./build']);
});


//===========================
// Run Nodemon
//===========================
gulp.task('nodemon', function() {
    return nodemon({
        script: 'bin/www',
        ignore: ['public', 'build']
    });
});

//======================================
// Watch files and call appropriate task
//======================================
gulp.task('watch', ['browserSync'], function () {
    watch('./src/**/*.js', batch(function (events, done) {
        gulp.start('build', done);
    }));
    watch('./src/sass/**/*.scss', batch(function (events, done) {
        gulp.start('workflow', done);
    }));
});

gulp.task('default', ['workflow', 'build', 'watch', 'nodemon']);