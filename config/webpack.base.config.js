'use strict';

var webpack = require('webpack');
var helpers = require('./helpers');

var autoprefixer = require('autoprefixer');

var ExtendedDefinePlugin = require('extended-define-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CordovaPlugin = require('webpack-cordova-plugin');
var ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
var WebpackBuildNotifierPlugin = require('webpack-build-notifier');

const vendors = ['angular', 'angular-resource', 'angular-ui-router', 'angular-animate', 'angular-touch', 'angular-carousel', 'angular-load', 'jszip',
  'angular-local-storage', 'angular-moment', 'angular-resource', 'angular-translate', 'angular-translate-loader-static-files',
  'matchmedia-ng', 'ng-cordova', 'ng-file-upload', 'ng-lodash', 'aes', 'angular-cryptography', 'RC4', 'fastclick', 'ts-helpers', 'angular-loading-bar','angular-upload'];

module.exports = function (ENV, platform) {
  Object.assign(ENV, {
    version: require('./../package.json').version,
    appName: require('./../package.json').name,
    compliantLmsVersion: '0.1.5',
    cloudinaryApi: 'http://res.cloudinary.com/',
    cloudinaryCloudName: 'liverhino',
    teacher: {
      activities: {
        poll: null,
        snapshot: null,
        participant: null,
        story: null,
        assess: ['enrich-preview', 'teach-preview', 'form', 'play', 'teach-results', 'report', 'session-report'],
        ideas: null
        // url: ['enrich-preview', 'teach-preview', 'play', 'teach-results', 'enrich-results']
        //url: null
      }
    },
    student: {
      activities: {}
    }
  });

  console.info(`webpack platform is: ${platform || 'web'}`);

  var config = {
    entry: {
      vendor: vendors,
      app: ['./app/app.ts', 'Common', 'Config']
    },
    output: {
      path: './www',
      filename: '[name]-bundle.js'
    },
    module: {
      loaders: [
        { test: /\.ts$/, loaders: ['ng-annotate', 'awesome-typescript-loader'] },
        { test: /\.scss$/, loaders: ["style", "css", "postcss", "sass"] },
        { test: /\.(png|jpg)$/, loader: 'file', query: { name: '[hash].[ext]' } },
        { test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/, loader: 'file-loader' },
        { test: /\.html$/, loader: 'raw-loader', exclude: [helpers.root('app/index.html')] }
      ]
    },
    postcss: function () {
      return [autoprefixer];
    },
    plugins: [
      new ForkCheckerPlugin(),
      new CopyWebpackPlugin([
        { from: 'app/languages', to: 'languages' },
        { from: 'app/images', to: 'images' },
        { from: 'app/3rdparty/common/images', to: '3rdparty/common/images' },
        { from: 'app/3rdparty/shim/windows', to: '3rdparty/shim/windows' },
        { from: 'app/3rdparty/zip', to: '3rdparty/zip' }
      ]),
      new HtmlWebpackPlugin({
        template: 'app/index.html',
        platform: platform,
        title: 'BeeTime'
      }),
      new ExtendedDefinePlugin({
        APP_CONFIG: ENV
      }),
      new WebpackBuildNotifierPlugin()
    ],
    resolve: {
      extensions: ['', '.ts', '.js'],
      modulesDirectories: ['node_modules'],
      alias: {
        lf: 'lovefield',
        progressbar: 'progressbar.js',
        localytics: helpers.root('app/3rdparty/localytics/localytics.js'),
        wordcloud2: helpers.root('app/3rdparty/wordcloud2/wordcloud2.js'),
        // nosleep: helpers.root('app/3rdparty/nosleep/nosleep.js'),
        aes: helpers.root('app/3rdparty/crypto/angular-cryptography/aes.js'),
        "angular-cryptography": helpers.root('app/3rdparty/crypto/angular-cryptography/mdo-angular-cryptography.js'),
        RC4: helpers.root('app/3rdparty/crypto/RC4.js'),
        Common: helpers.root('app/3rdparty/common/common.ts'),
        Config: helpers.root('app/init/Config.ts')
      }
    },
    tslint: {
      emitErrors: false,
      failOnHint: false,
      resourcePath: 'app'
    }
  };

  // if (helpers.isCordova(platform)) {
  //   config.plugins.push(new CordovaPlugin({
  //     config: 'config.xml',
  //     src: 'index.html',
  //     platform: platform,
  //     version: false
  //   }));
  // } else {
  config.output.publicPath = '/';
  // }

  /**
   * This plugin enables us to debug the application in visual studio
   */
  // if (platform === 'windows') {
  //   let VSFixSourceMapsPlugin = require('vs-fix-sourcemaps');
  //   config.plugins.push(new VSFixSourceMapsPlugin());
  // }

  return config;
};
