var gulp = require('gulp');
var zip = require('gulp-zip');
var forceDeploy = require('gulp-jsforce-deploy');
var env = require('gulp-env');
var minimist = require('minimist');

var DEFAULT_ENV = '.envs/.env.json';

/*
 * Enable to switch the environment (the org to deploy) by passing arguments `--env PATH`
 * ref. https://github.com/gulpjs/gulp/blob/master/docs/recipes/pass-arguments-from-cli.md
 */
var knownOptions = {
  string: 'env',
  default: { env: process.env.NODE_ENV || DEFAULT_ENV }
};
var options = minimist(process.argv.slice(2), knownOptions);

/*
 * set env vars from file
 */
gulp.task('set-env', function() {
  env({
    file: options.env,
  });
});

gulp.task('deploy', function() {
  var res = gulp.src('./pkg/**', { base: "." })
    .pipe(zip('pkg.zip'))
    .pipe(forceDeploy({
      username: process.env.SF_USERNAME,
      password: process.env.SF_PASSWORD
      //, loginUrl: 'https://test.salesforce.com'
      //, pollTimeout: 120*1000
      //, pollInterval: 10*1000
      //, version: '33.0'
    }));

  res.on('error', function(err) {
    console.log(err);
  });
});

gulp.task('default', ['set-env', 'deploy']);
