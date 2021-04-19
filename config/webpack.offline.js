'use strict';

var webpack = require('webpack');
var helprs = require('./helpers');

// This will be replace with env variables using Dockerfile-offline
const ENV = {
  apiEndpoint: "http://authtest.methodic.co.il:3002",
  lmsEndpoint: "http://authtest.methodic.co.il:3000",
  realtimeEndpoint: "http://authtest.methodic.co.il:3004",
  localyticsAppKey: 'fbcd4feeab663c56cab2afa-c828c2a0-a7e0-11e5-d56d-0013a62af900',
  storageBaseUrl: 'https://learni-sales.s3.amazonaws.com',
  
  isOffline: true,
  offlineStorage: "images",
  ssoLoginEnabled: true
};

let platform = helprs.extractPlatform(process.argv);
let webpackBaseConfig = require('./webpack.base.config')(ENV, platform);

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


// Object.assign doesn't deepMerge objects
config.plugins = webpackBaseConfig.plugins.concat([]);

module.exports = config;
