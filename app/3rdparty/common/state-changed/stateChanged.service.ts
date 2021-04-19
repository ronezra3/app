import IQService = angular.IQService;
import LoDashStatic = _.LoDashStatic;
import IRootScopeService = angular.IRootScopeService;

export class StateChangedService {
  private callbacks = [];

  /*@ngInject*/
  constructor(private lodash : LoDashStatic, $rootScope : IRootScopeService) {
    $rootScope.$on('$stateChangeStart', this.stateChangeStart);
  }

  public onStateChange(callback) {
    this.callbacks.push(callback);
  }

  private stateChangeStart = (event, destinationState, toParams) : any => {
    let shouldProceed = this.lodash.any(this.callbacks, callback => callback(destinationState.name, toParams));

    if (!shouldProceed) {
      event.preventDefault();
    }
  };
}
