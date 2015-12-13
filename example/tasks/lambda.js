var gulp = require('gulp');
var install = require('gulp-install');
var through2 = require('through2');
var babel = require('gulp-babel');
var lambda = require('gulp-awslambda');
var zip = require('gulp-zip');
var config = require('./config').lambda;

gulp.task('lambda', function() {
  checkEnvironment();

  return gulp.src(config.packageJson)
    .pipe(install())
    .pipe(through2({ objectMode: true }, undefined, function(callback) {
      return gulp.src(config.src)
        .pipe(babel(config.babelOptions))
        .pipe(zip('lambda.zip'))
        .pipe(gulp.dest('tmp/'))
        .pipe(lambda(config.lambdaParams, config.lambdaOpts))
        .on('error', callback)
        .on('end', callback);
    }));
});

function checkEnvironment() {
  var names = ['AWS_LAMBDA_EXECUTOR_ROLE_ARN', 'AWS_REGION'];

  names.forEach((name) => {
    if (!process.env[name]) {
      throw new Error(`Environment variable ${name} must be specified.`);
    }
  });
}
