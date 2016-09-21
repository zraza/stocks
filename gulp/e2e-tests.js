'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var spawn = require('child_process').spawn;

var browserSync = require('browser-sync');

var $ = require('gulp-load-plugins')();

// Downloads the selenium webdriver
gulp.task('webdriver-update', $.protractor.webdriver_update);

gulp.task('webdriver-standalone', $.protractor.webdriver_standalone);

function runProtractor (done) {
  var params = process.argv;
  var args = params.length > 3 ? [params[3], params[4]] : [];

  gulp.src(path.join(conf.paths.e2e, '/**/*.js'))
    .pipe($.protractor.protractor({
      configFile: 'protractor.conf.js',
      args: args
    }))
    .on('error', function (err) {
      // Make sure failed tests cause gulp to exit non-zero
      throw err;
    })
    .on('end', function () {
      // Close browser sync server
      browserSync.exit();
      done();
    });
}

// Set up Protractor tasks (based on https://www.npmjs.com/package/gulp-protractor):
function protractorTask(binaryName, args) {
  var winExt = /^win/.test(process.platform) ? '.cmd' : '',
      protractorDir = path.resolve(path.join(path.dirname(require.resolve('protractor')), '..', 'bin')),
      binary = path.join(protractorDir, binaryName + winExt);
  return () => {
    return new Promise((resolve, reject) => {
      spawn(binary, args, {
        stdio: 'inherit'
      }).once('exit', (code) => {
        if (code) {
          reject('Protractor exited with code: ' + code);
        } else {
          resolve();
        }
      });
    });
  };
}

gulp.task('protractor', ['protractor:src']);
gulp.task('protractor:src', ['serve:e2e', 'webdriver-update'], runProtractor);
gulp.task('protractor:dist', ['serve:e2e-dist', 'webdriver-update'], runProtractor);
gulp.task('cucumber', protractorTask('protractor', ['protractor.cucumber.conf.js'].concat(process.argv.slice(3))));