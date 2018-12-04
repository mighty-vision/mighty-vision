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
    i18n = require('gulp-i18n-localize'),
    browserSync = require('browser-sync').create();


///// Production /////
var uglify = require('gulp-uglify'),
    pump = require('pump'),
    cleanCSS = require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer'),
    htmlmin = require('gulp-htmlmin');


///// Settings /////
var defaultLang = 'ru';
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


gulp.task('i18n', ['compileHandlebars'], function () {
	return gulp.src('./.tmp/compiled/**/*.html')
		.pipe(i18n({
      localeDir: './locales/',
      locales: ['ru', 'en'],
      delimeters: ['@{', '}']
		}))
		.pipe(gulp.dest('./.tmp/translated'));
});


///// Transfer default language HTML to dist /////
gulp.task('transferDefaultLang', ['i18n'], () => {
  return gulp.src('./.tmp/translated/' + defaultLang + '/**/*.html')
    .pipe(flatten())
    .pipe(gulp.dest(dist))
  }
);


///// Transfer othe languages HTML to dist /////
gulp.task('transferOtherLangs', ['transferDefaultLang'], () => {
  return gulp.src([
                    '.tmp/translated/**/*.html', 
                    '!.tmp/translated/' + defaultLang + '/**/*.html'
                  ])
    .pipe(gulp.dest(dist))
    .pipe(browserSync.reload({
      stream: true
    }))
  }
);

gulp.task('runI18n', ['i18n', 'transferDefaultLang', 'transferOtherLangs'], function() {
  console.log('Locales bulded')
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
                      'runI18n',
                      'compileSass',
                      'compileJS',
                      ],
  function() {
    gulp.watch([src + '/**/*.scss', 'src/index.scss'], ['compileSass']);
    gulp.watch([src + '/**/*.js', 'src/index.js'], ['compileJS']);
    gulp.watch([src + '/**/*.js', 'src/critical/critical.js']);
    gulp.watch([src + '/**/*.handlebars'], ['runI18n']);
    gulp.watch(['locales/**/*'], ['runI18n']);
});


///// Production & Netlify /////
gulp.task('prod', [
                    'runI18n',
                    'prodStaticTransporter',
                    'compileSass',
                    'compileJS',
                    'compileSass',
                    'compileJS',
                    'MinifyJS',
                    'minifyCSS',
                    'minifyHTML'
                  ]);