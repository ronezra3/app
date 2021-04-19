import {IDialogRouter} from '../layout/services/NgDialogRouter';
import IInjectorService = angular.auto.IInjectorService;
import {IStateService} from 'angular-ui-router';

export class VersionInterceptor {
  static VERSION_ERROR_MSG = 'insufficient_client_version';

  private isInInsufficientVersion = false;

  /*@ngInject*/
  constructor(private $q, private $injector : IInjectorService, private ENV) {
  }

  onStateChanged = toName => toName === 'insufficient-version' && this.isInInsufficientVersion;

  request = (config) => {
    config.headers = config.headers || {};
    // TODO - refactor this to take the right version depend on the request url
    config.headers.version = this.ENV.compliantLmsVersion;
    return config;
  };

  responseError = (rejection) => {
    if (rejection !== null && rejection.status === 406
      && rejection.data === VersionInterceptor.VERSION_ERROR_MSG && !this.isInInsufficientVersion) {
      this.isInInsufficientVersion = true;
      let ngDialogRouter : IDialogRouter = this.$injector.get<IDialogRouter>('ngDialogRouter');
      ngDialogRouter.closeAll();

      let $state : IStateService = this.$injector.get<IStateService>('$state');
      $state.go('insufficient-version');
    }

    return this.$q.reject(rejection);
  };
}
