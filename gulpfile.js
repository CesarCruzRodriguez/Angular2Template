var gulp =        require('gulp'),
    webserver =   require('gulp-webserver'),
    typescript =  require('gulp-typescript'),
    sass =        require('gulp-sass'),
    sourcemaps =  require('gulp-sourcemaps'),
    tscConfig =   require('./tsconfig.json');

var appSrc = 'builds/development/',
    tsSrc = 'process/typescript/',
    sassSrc = 'process/sass/';

gulp.task('html', function() {
  gulp.src(appSrc + '**/*.html');
});

// gulp.task('css', function() {
//   gulp.src(appSrc + '**/*.css');
// });

gulp.task('copylibs', function() {
  return gulp
    .src([
      'node_modules/es6-shim/es6-shim.min.js',
      'node_modules/systemjs/dist/system-polyfills.js',
      'node_modules/angular2/bundles/angular2-polyfills.js',
      'node_modules/systemjs/dist/system.src.js',
      'node_modules/rxjs/bundles/Rx.js',
      'node_modules/angular2/bundles/angular2.dev.js'
    ])
    .pipe(gulp.dest(appSrc + 'js/lib/angular2'));
});

gulp.task('typescript', function () {
  return gulp
    .src(tsSrc + '**/*.ts')
    .pipe(sourcemaps.init())
    .pipe(typescript(tscConfig.compilerOptions))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(appSrc + 'js/'));
});

gulp.task('sass', function () {
  return gulp.src(sassSrc + '**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest( appSrc + 'css/'));
});

gulp.task('watch', function() {
  gulp.watch(tsSrc + '**/*.ts', ['typescript']);
  gulp.watch(sassSrc + '**/*.scss', ['sass']);
  // gulp.watch(appSrc + 'css/*.css', ['css']);
  gulp.watch(appSrc + '**/*.html', ['html']);
});

gulp.task('webserver', function() {
  gulp.src(appSrc)
    .pipe(webserver({
      livereload: true,
      open: true
    }));
});

gulp.task('default', ['copylibs', 'typescript', 'sass', 'watch', 'webserver']);
