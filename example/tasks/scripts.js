var gulp = require('gulp');
var gutil = require('gulp-util');
var browserify = require('browserify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var config = require('./config').scripts;

makeTask('scripts', false);
makeTask('scripts:watch', true);
makeTask('scripts:dist', false, true);

function makeTask(name, watch, dist) {
  checkEnvironment();

  var bundler;

  if (watch) {
    bundler = watchify(browserify(config.src, watchify.args));
  } else {
    bundler = browserify(config.src);
  }

  bundler
    .transform('babelify')
    .transform('react-jade-helper')
    .transform('envify')
    .on('update', bundle)
    .on('log', gutil.log);

  gulp.task(name, bundle);

  function bundle() {
    return bundler.bundle()
      .on('error', function(err) {
        gutil.log('Browserify', err.stack);
        this.emit('end');
      })
      .pipe(source('bundle.js'))
      .pipe(gulp.dest(config.dest));
  }
}

function checkEnvironment() {
  var names = ['FACEBOOK_APP_ID', 'AWS_LAMBDA_INVOKER_ROLE_ARN', 'AWS_REGION'];

  names.forEach((name) => {
    if (!process.env[name]) {
      throw new Error(`Environment variable ${name} must be specified.`);
    }
  });
}
