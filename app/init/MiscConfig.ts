/*@ngInject*/
export function MiscConfig($translateProvider, $httpProvider, $compileProvider, ENV, cfpLoadingBarProvider) {
  $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|blob):|data:image\//);
  if (ENV.name !== 'development') {
    $compileProvider.debugInfoEnabled(false);
  }

  $httpProvider.defaults.headers.delete = {'Content-Type': 'application/json;charset=utf-8'};
  $httpProvider.defaults.headers.put = {'Content-Type': 'application/json;charset=utf-8'};

  $translateProvider.useStaticFilesLoader({
    prefix: 'languages/',
    suffix: '.json'
  });

  $translateProvider.preferredLanguage('en');
  $translateProvider.fallbackLanguage('en');

  cfpLoadingBarProvider.includeSpinner = false;
}
