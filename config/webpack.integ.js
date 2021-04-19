'use strict';

var webpack = require('webpack');
var helprs = require('./helpers');

// const APP_CONFIG = {
//   apiEndpoint: 'https://learni-server-integ.herokuapp.com',
//   lmsEndpoint: 'https://learni-lms-integ.herokuapp.com',
//   realtimeEndpoint: 'https://learni-realtime-integ.herokuapp.com',
//   localyticsAppKey: 'c4d4037c52ac541b7f32181-649877ee-5565-11e5-ac6f-00d0fea82624',
//   storageBaseUrl: 'https://learni-integ.s3.amazonaws.com'
// };
const host = 'localhost';
const APP_CONFIG = {
  apiEndpoint: 'https://learni-server-qa2.herokuapp.com',
  lmsEndpoint: 'http://localhost:3000',
  realtimeEndpoint: 'https://learni-realtime-qa2.herokuapp.com',
  localyticsAppKey: 'fbcd4feeab663c56cab2afa-c828c2a0-a7e0-11e5-d56d-0013a62af900',
  storageBaseUrl: 'https://learni-sales.s3.amazonaws.com',
  ssoLoginEnabled: true
};

let platform = helprs.extractPlatform(process.argv);
let webpackBaseConfig = require('./webpack.base.config')(APP_CONFIG, platform);

let config = Object.assign(webpackBaseConfig, {
  debug: true,
  devtool: 'source-map',
  devServer: {
    port: 8100,
    host: 'localhost',
    historyApiFallback: true,
    disableHostCheck: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },
    outputPath: './www'
  }
});

// Object.assign doesn't deepMerge objects
config.plugins = webpackBaseConfig.plugins.concat([
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.optimize.DedupePlugin()
]);

module.exports = config;
