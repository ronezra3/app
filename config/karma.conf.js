'use strict';

let singleRun;
let browsers;
let autoWatch;

switch (process.env.NODE_ENV) {
  case 'prod':
  case 'production':
    singleRun = true;
    browsers = ['PhantomJS', 'Chrome'];
    autoWatch = false;
    break;
  default:
    singleRun = false;
    browsers = ['PhantomJS'];
    autoWatch = true;
}


module.exports = (config) => {
  let testWebpackConfig = require('./webpack.test.js');

  config.set({

    // base path that will be used to resolve all patterns (e.g. files, exclude)
    basePath: '',

    /*
     * Frameworks to use
     *
     * available frameworks: https://npmjs.org/browse/keyword/karma-adapter
     */
    frameworks: ['jasmine'],

    // list of files to exclude
    exclude: [],

    /*
     * list of files / patterns to load in the browser
     *
     * we are building the test environment in ./spec-bundle.js
     */
    files: [{pattern: './config/spec-bundle.js', watched: false}],

    /*
     * preprocess matching files before serving them to the browser
     * available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
     */
    preprocessors: {'./config/spec-bundle.js': ['webpack', 'sourcemap']},

    // Webpack Config at ./webpack.test.js
    webpack: testWebpackConfig,

    // Webpack please don't spam the console when running in karma!
    webpackServer: {noInfo: true},

    /*
     * test results reporter to use
     *
     * possible values: 'dots', 'progress'
     * available reporters: https://npmjs.org/browse/keyword/karma-reporter
     */
    reporters: ['mocha'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    /*
     * level of logging
     * possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
     */
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: autoWatch,

    /*
     * start these browsers
     * available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
     */
    browsers: browsers,

    /*
     * Continuous Integration mode
     * if true, Karma captures browsers, runs the tests and exits
     */
    singleRun: singleRun
  });

};
