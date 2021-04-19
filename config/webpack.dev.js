'use strict';

var readlineSync = require('readline-sync');
var helpers = require('./helpers');
const env = process.env.NODE_ENV

const host = 'localhost';
// console.log('host: ', env.NODE_ENV);

// const ENV = {
//   apiEndpoint: `http://${host}:3002`,
//   realtimeEndpoint: `http://${host}:3004`,
//   proxyEndpoint: `http://${host}:3005`,
//   lmsEndpoint: `http://${host}:3000`,
//   localyticsAppKey: 'c4d4037c52ac541b7f32181-649877ee-5565-11e5-ac6f-00d0fea82624',
//   storageBaseUrl: 'https://s3.amazonaws.com/learni-develop'
// };

const ENV = {
  apiEndpoint: `http://${host}:3002`,
  lmsEndpoint: `http://${host}:3000`,
  realtimeEndpoint: `http://${host}:3004`,
  localyticsAppKey: 'fbcd4feeab663c56cab2afa-c828c2a0-a7e0-11e5-d56d-0013a62af900',
  storageBaseUrl: 'https://learni-sales.s3.amazonaws.com',
  isOffline: true,
  offlineStorage: "localStorage"
};

let platform = helpers.extractPlatform(process.argv);

if (host === 'localhost' && helpers.isCordova(platform)) {
  console.warn(`You are deploying to a remote cordova device (yes, emulator is remote), \d you know that you can't get to localhost from there right?`);
  if (!readlineSync.keyInYN('Are you sure you want to proceed?')) {
    return;
  }
}

var webpackBaseConfig = require('./webpack.base.config')(ENV, platform);

let config = Object.assign(webpackBaseConfig, {
  devtool: 'source-map',
  debug: true,
  devServer: {
    port: 8100,
    disableHostCheck: true,
    historyApiFallback: true,
    // watchOptions: {
    //   aggregateTimeout: 300,
    //   poll: 1000
    // },
    outputPath: './www'
  }
});

module.exports = config;
