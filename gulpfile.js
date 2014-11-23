var gulp = require('gulp');
var jasmine = require('gulp-jasmine');

gulp.task('test', function () {
  gulp
    .src('compare-strings.spec.js')
    .pipe(jasmine());
});

gulp.task('default', ['test']);
