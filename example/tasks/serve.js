var gulp = require('gulp');
var gutil = require('gulp-util');
var config = require('./config').serve;
var browserSync = require('browser-sync');

gulp.task('serve', config.deps, function() {
  browserSync(config.browserSync);
});
