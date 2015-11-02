var gulp = require('gulp');
var zip = require('gulp-zip');
var forceDeploy = require('gulp-jsforce-deploy');

gulp.task('deploy', function() {
  gulp.src('./pkg/**', { base: "." })
    .pipe(zip('pkg.zip'))
    .pipe(forceDeploy({
      username: process.env.SF_USERNAME,
      password: process.env.SF_PASSWORD
      //, loginUrl: 'https://test.salesforce.com'
      //, pollTimeout: 120*1000
      //, pollInterval: 10*1000
      //, version: '33.0'
    }));
});
