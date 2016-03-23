var gulp = require("gulp");
var uglify = require('gulp-uglify');
var useref = require('gulp-useref');
var cssnano = require('gulp-cssnano');
var gulpIf = require('gulp-if');
   
gulp.task("default",function(){
    console.log("hello");
});
gulp.task('useref', function(){
  return gulp.src('public/*.html')
    .pipe(useref({searchPath:['./libs','']}))
    .pipe(gulpIf('*.js', uglify()))
    // Minifies only if it's a CSS file
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'));
});
 
// gulp.task('compress', function() {
//   return gulp.src('lib/*.js')
//     .pipe(uglify())
//     .pipe(gulp.dest('dist'));
// });