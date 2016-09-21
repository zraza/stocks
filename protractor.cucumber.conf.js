// Protractor configuration file for Cucumber
// see https://github.com/angular/protractor/blob/master/docs/referenceConf.js

var CucumberHTMLReport = require('cucumber-html-report')
var paths = require('./.yo-rc.json')['generator-gulp-angular'].props.paths;
var common = { nonInteractive: true };
exports.config = {

  capabilities: {
    'browserName': 'chrome'
  },

  baseUrl: 'http://localhost:3000',

  // Spec patterns are relative to the current working directory when
  // protractor is called.
  specs: [paths.e2e + '/**/*.js'],

  // Options to be passed to Jasmine-node.
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000
  },


  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),

  onPrepare: function() {
    browser.driver.manage().window().setSize(1200, 1000);
  },

  afterLaunch: function() {
    if (common.nonInteractive) {
      var report = new CucumberHTMLReport({
        source: 'report/cucumber-report.json',
        dest: 'report',
        name: 'cucumber-report.html'
      });
      report.createReport();
    }
  },

  specs: [
    paths.e2e + '/cucumber/**/*.feature'
  ],

  cucumberOpts: {
    require: paths.e2e + '/cucumber/**/*.js',
    format: common.nonInteractive ? 'json:report/cucumber-report.json' : 'pretty'
  }

};
