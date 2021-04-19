import {IStateProvider} from 'angular-ui-router';
import {LoginState} from './states/login';
import {SigninState} from './states/signin';
import {TeacherLoginState} from './states/teacher_login';
import {LoginBackground} from './components/background';
import {RegisterState} from './states/register';
import {LoginStateChangedService} from './stateChanged.service';
import {StateChangedService} from '../../3rdparty/common/state-changed/stateChanged.service';
import {LogOut} from '../../3rdparty/common/services/LogOut';
import {IStateServiceExtended} from '../../3rdparty/common/decorators/StateDecorator';

export default angular.module('LearniApp.login', [])
  .config(($stateProvider : IStateProvider) => {
    $stateProvider
      .state('login', new LoginState())
      .state('login.signin', new SigninState())
      .state('login.register', new RegisterState())
      .state('login.teacher_login', new TeacherLoginState());
  })
  .run(($state : IStateServiceExtended, LogOut : LogOut, LoginStateChangedService : LoginStateChangedService,
        StateChangedService : StateChangedService) => {
    LogOut.onLoggedOut(() => $state.go('login.signin', null, {replace: true}));
    StateChangedService.onStateChange(LoginStateChangedService.stateChangeStart);
  })
  .service('LoginStateChangedService', LoginStateChangedService)
  .component('loginBackground', new LoginBackground()).name;
