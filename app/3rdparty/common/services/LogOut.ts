import IRootScopeService = angular.IRootScopeService;

const LOGGED_OUT = 'loggedOut';
const LOGGING_OUT = 'loggingOut';

export class LogOut {
  /*@ngInject*/
  constructor(private $rootScope : IRootScopeService, private AuthenticationToken) {
  }

  logOut(error?) {
    this.$rootScope.$broadcast(LOGGING_OUT, error);
    this.AuthenticationToken.remove();
    this.$rootScope.$broadcast(LOGGED_OUT, error);
  }

  onLoggingOut(callback) {
    return this.$rootScope.$on(LOGGING_OUT, callback);
  }

  onLoggedOut(callback) {
    return this.$rootScope.$on(LOGGED_OUT, callback);
  }
}
