import {VersionInterceptor} from './version-interceptor.service';
import {IStateProvider} from 'angular-ui-router';
import {VersionInterceptorState} from './version.interceptor.state';
import {StateChangedService} from '../state-changed/stateChanged.service';

export default angular.module('Common.VersionInterceptor', ['Common.stateChanged'])
  .config(($httpProvider, $stateProvider : IStateProvider) => {
    $httpProvider.interceptors.push('VersionInterceptor');
    $stateProvider.state('insufficient-version', new VersionInterceptorState());
  })
  .run((StateChangedService : StateChangedService, VersionInterceptor : VersionInterceptor) =>
    StateChangedService.onStateChange(VersionInterceptor.onStateChanged))
  .service('VersionInterceptor', VersionInterceptor).name;
