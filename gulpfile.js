var gulp = require("gulp");
var uglify = require('gulp-uglify');

gulp.task("default",function(){
    console.log("hello");
});

 
// gulp.task('compress', function() {
//   return gulp.src('lib/*.js')
//     .pipe(uglify())
//     .pipe(gulp.dest('dist'));
// });