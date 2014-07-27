// Include gulp
var gulp = require('gulp'); 

// Plugins
var concat = require('gulp-concat'),
    connect = require('gulp-connect'),
    imagemin = require('gulp-imagemin'),
    minifyCSS = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    stripDebug = require('gulp-strip-debug'),
    uglify = require('gulp-uglify');

// Define sources
var src_paths = {
  scss : 'css/scss/*.scss',
  foundation_js : 'bower_components/foundation/js/foundation.min.js',
  fastclick : 'bower_components/fastclick/lib/fastclick.js',
  jquery : 'bower_components/jquery/dist/jquery.min.js',
  scripts_js : 'js/scripts.js',
  js : 'js/*.js',
  modernizr: 'bower_components/modernizr/modernizr.js',
  img : 'img/*'
};

// Define destinations
var dest_paths = {
  css : 'css',
  js : 'js',
  img : 'img'
};

// Create webserver. ex. localhost:8080
gulp.task('webserver', function() {
  connect.server({
    livereload: true
  });
});

// Compile SCSS
gulp.task('sass', function() {
  return gulp.src(src_paths.scss)
  .pipe(sass({ includePaths : ['bower_components/foundation/scss'] }))
  .pipe(minifyCSS())
  .pipe(gulp.dest(dest_paths.css))
  .pipe(connect.reload());
});

// Concate and Minify JS
gulp.task('scripts', function() {
  return gulp.src([
    src_paths.jquery,
    src_paths.foundation_js,
    src_paths.scripts_js])
  .pipe(concat('all.min.js'))
  .pipe(stripDebug())
  .pipe(uglify())
  .pipe(gulp.dest('js'));
});

// Bower's Modernizr is not minified by default
gulp.task('modernizr', function() {
  return gulp.src(src_paths.modernizr)
  .pipe(uglify())
  .pipe(rename('modernizr.min.js'))
  .pipe(gulp.dest('js'));
});

// Crush images
gulp.task('images', function () {
  return gulp.src(src_paths.img)
  .pipe(imagemin())
  .pipe(gulp.dest(dest_paths.img));
});

// Watch our CSS and JS files
gulp.task('watch', function() {
  gulp.watch(src_paths.scripts_js, ['scripts']);
  gulp.watch(src_paths.scss, ['sass']);
});

// Build Task
gulp.task('default', ['sass', 'modernizr', 'scripts', 'webserver', 'watch']);




