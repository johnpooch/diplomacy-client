const gulp = require('gulp');

gulp.task('copyRedirects', () => {
  return gulp.src(['./src/_redirects']).pipe(gulp.dest('./dist'));
});

gulp.task('default', gulp.series('copyRedirects'));
