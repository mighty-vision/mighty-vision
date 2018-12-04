var gulp = require('gulp'),
    handlebars = require('gulp-compile-handlebars'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    webpackStream = require('webpack-stream'),
    webpack = require('webpack'),
    flatten = require('gulp-flatten'),
    exec = require('gulp-exec'),
    watch = require('gulp-watch'),
    gulp = require('gulp'),
    browserSync = require('browser-sync').create();


///// Production /////
var uglify = require('gulp-uglify'),
    pump = require('pump'),
    cleanCSS = require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer'),
    htmlmin = require('gulp-htmlmin');


///// Settings /////
var src = './src';
var static = './static';
var dist = './dist';


///// Assemble all handlebars partials  //////
gulp.task('assemblePartials', function () {
  return gulp.src([src + '/components/**/*.handlebars', src + '/basic/**/*.handlebars'])
    .pipe(flatten())
    .pipe(gulp.dest('.tmp/partials'))
});


///// Compile handlebars /////
gulp.task('compileHandlebars', ['assemblePartials'], function () {
  return gulp.src(src + '/*.handlebars')
    .pipe(handlebars({},{
      batch : ['.tmp/partials']
    }))
    .pipe(rename({
      extname: ".html"
    }))
    .pipe(gulp.dest('.tmp/compiled'))
});


///// I18n //////
var exec = require('gulp-exec');

gulp.task('i18n', ['compileHandlebars'], function() {
  var options = {
    continueOnError: false, // default = false, true means don't emit error event
    pipeStdout: false, // default = false, true means stdout is written to file.contents
    customTemplatingThing: "test" // content passed to lodash.template()
  };
  var reportOptions = {
  	err: true, // default = true, false means don't write err
  	stderr: true, // default = true, false means don't write stderr
  	stdout: true // default = true, false means don't write stdout
  };
  return gulp.src('./')
    .pipe(exec('npm start', options))
    .pipe(exec.reporter(reportOptions))
    .pipe(browserSync.reload({
      stream: true
    }));
});


gulp.task('devStaticTransporter', function() {  
  gulp.src(static + '/**/*', {base: static + '/'})
    .pipe(watch(static + '/**/*', {base: static + '/'}))
    .pipe(gulp.dest(dist))
    .pipe(browserSync.reload({
      stream: true
    }));
});


gulp.task('prodStaticTransporter', function() {
  return gulp.src(static + '/**/*')
    .pipe(gulp.dest(dist))
});


gulp.task('compileSass', function () {
  return gulp.src(src + '/index.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(dist + '/styles'))
    .pipe(browserSync.reload({
      stream: true
    }))
});


gulp.task('compileJS', function() {
    return gulp.src(src + '/index.js')
    .pipe(webpackStream({
      module: {
        loaders: [
          {
            test: /\.js$/,
            loader: 'babel-loader',
            query: {
              presets: ['es2015']
            }
          }
        ],
      },
      output: {
        filename: 'index.js',
      }
    }, webpack))
    .pipe(gulp.dest(dist + '/scripts'))
    .pipe(browserSync.reload({
      stream: true
    }))
});


///// Live reload //////
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: dist
    },
    open: "external"
  })
});


gulp.task('MinifyJS', ['compileJS'], function (cb) {
  pump([
        gulp.src(dist + '/scripts/**/*.js'),
        uglify(),
        gulp.dest(dist + '/scripts')
    ],
    cb
  );
});


gulp.task('minifyCSS', ['compileSass', 'setPrefixes'], function () {
  return gulp.src(dist + '/styles/**/*.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest(dist + '/styles'));
});


gulp.task('setPrefixes', function(){
  return gulp.src(dist + '/styles/**/*.css')
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest(dist + '/styles'))
});


gulp.task('minifyHTML', ['i18n'], function() {
  return gulp.src(dist + '/**/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(dist));
});


///// Watch /////
gulp.task('default', [
                      'browserSync',
                      'devStaticTransporter',
                      'i18n',
                      'compileSass',
                      'compileJS',
                      ],
  function() {
    gulp.watch([src + '/**/*.scss', 'src/index.scss'], ['compileSass']);
    gulp.watch([src + '/**/*.js', 'src/index.js'], ['compileJS']);
    gulp.watch([src + '/**/*.js', 'src/critical/critical.js']);
    gulp.watch([src + '/**/*.handlebars'], ['i18n']);
    gulp.watch(['locales/**/*'], ['i18n']);
});


///// Production & Netlify /////
gulp.task('prod', [
                    'i18n',
                    'prodStaticTransporter',
                    'compileSass',
                    'compileJS',
                    'compileSass',
                    'compileJS',
                    // 'MinifyJS',
                    'minifyCSS',
                    // 'minifyHTML'
                  ]);