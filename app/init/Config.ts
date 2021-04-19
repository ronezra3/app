declare var APP_CONFIG : any;

angular.module('config', [])
  .constant('ENV', APP_CONFIG);
