import {LogOut} from './LogOut';
import IQService = angular.IQService;

export class TokenInterceptor {
  /*@ngInject*/
  constructor(private $q : IQService, private AuthenticationToken, private LogOut : LogOut, private ENV) {
  }

  request = (config) => {
    config.headers = config.headers || {};
    if ((config.url && config.url.includes("login-sso")) || (config.headers.Authorization && config.headers.Authorization.includes("Negotiate"))) {
      return config;
    }

    let token = this.AuthenticationToken.get();
    if (token) {
      config.headers.Authorization = 'Bearer ' + token;
    }
    return config;
  };

  responseError = (rejection) => {
    if (rejection !== null && rejection.status === 401 && this.AuthenticationToken.get()) {
      this.LogOut.logOut('different_device_error');
    }

    return this.$q.reject(rejection);
  };
}
