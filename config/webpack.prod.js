'use strict';

var webpack = require('webpack');
var helprs = require('./helpers');

// const APP_CONFIG = {
//   apiEndpoint: 'https://learni-server-sales.herokuapp.com',
//   lmsEndpoint: 'https://learni-lms-sales.herokuapp.com',
//   realtimeEndpoint: 'https://learni-realtime-sales.herokuapp.com',
//   localyticsAppKey: 'fbcd4feeab663c56cab2afa-c828c2a0-a7e0-11e5-d56d-0013a62af900',
//   storageBaseUrl: 'https://learni-sales.s3.amazonaws.com'
// };
const host = 'localhost';
const APP_CONFIG = {
 apiEndpoint: 'https://learni-server-qa2.herokuapp.com',
 proxyEndpoint: 'https://learni-proxy.herokuapp.com',
  // proxyEndpoint: `http://${host}:3005`,
  lmsEndpoint: 'https://learni-lms-sales.herokuapp.com',
  realtimeEndpoint: 'https://learni-realtime-sales.herokuapp.com',
  localyticsAppKey: 'fbcd4feeab663c56cab2afa-c828c2a0-a7e0-11e5-d56d-0013a62af900',
  storageBaseUrl: 'https://learni-sales.s3.amazonaws.com',
  // environment : 'dev'
};

let platform = helprs.extractPlatform(process.argv);
let webpackBaseConfig = require('./webpack.base.config')(APP_CONFIG, platform);

let config = Object.assign(webpackBaseConfig, {
  debug: false,
  devServer: {
    port: 8100,
    host: 'localhost',
    historyApiFallback: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
  }
});

// Object.assign doesn't deepMerge objects (use webpack-merge instead)
config.plugins = webpackBaseConfig.plugins.concat([
  // new webpack.optimize.UglifyJsPlugin({
  //    uglifyOptions: {
  //           compress: {
  //               drop_console: false
  //           }
  //       }
  // }),
  // new webpack.optimize.OccurenceOrderPlugin(),
  // new webpack.optimize.DedupePlugin()
]);

module.exports = config;
