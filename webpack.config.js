'use strict';

switch (process.env.NODE_ENV) {
  case 'test':
  case 'testing':
    module.exports = require('./config/webpack.test');
    break;
  case 'prod':
  case 'production':
    module.exports = require('./config/webpack.prod');
    break;
  case 'integ':
  case 'integration':
    module.exports = require('./config/webpack.integ');
    break;
  case 'offline':
    module.exports = require('./config/webpack.offline');
    break;
  case 'dev':
  case 'development':
  default:
    module.exports = require('./config/webpack.dev');
}
