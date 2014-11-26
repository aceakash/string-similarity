var gulp = require('gulp');
var jasmine = require('gulp-jasmine');
//var watch = require('gulp-watch');


gulp.task('test', function () {
  return gulp
    .src('compare-strings.spec.js')
    .pipe(jasmine());
});

gulp.task('watch', function () {
  gulp.watch('compare-strings*.js', ['test']);
});

gulp.task('default', ['watch']);
