'use strict';

var ExtendedDefinePlugin = require('extended-define-webpack-plugin');

const helpers = require('./helpers');
const APP_CONFIG = {
  apiEndpoint: 'http://localhost:3002',
  realtimeEndpoint: 'http://localhost:3004',
  lmsEndpoint: 'http://localhost:3000',
  localyticsAppKey: 'c4d4037c52ac541b7f32181-649877ee-5565-11e5-ac6f-00d0fea82624',
  storageBaseUrl: 'https://s3.amazonaws.com/learni-develop',
};

process.env.ENV = process.env.NODE_ENV = 'test';

module.exports = {
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['', '.ts', '.js'],
    root: helpers.root('app')
  },

  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'source-map-loader'
      }
    ],
    loaders: [
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader',
        query: {
          compilerOptions: {
            removeComments: true

          }
        }
      },
      {test: /\.json$/, loader: 'json-loader', exclude: [helpers.root('app/index.html')]},
      {test: /\.css$/, loader: 'raw-loader', exclude: [helpers.root('app/index.html')]},
      {test: /\.html$/, loader: 'raw-loader', exclude: [helpers.root('app/index.html')]}

    ]
  },
  plugins: [
    new ExtendedDefinePlugin({
      APP_CONFIG: APP_CONFIG
    })
  ],
  tslint: {
    emitErrors: false,
    failOnHint: false,
    resourcePath: 'app'
  }
};
