import IQService = angular.IQService;
import LoDashStatic = _.LoDashStatic;
import {CurrentUser} from '../../3rdparty/common/services/CurrentUser';
import {IStateServiceExtended} from '../../3rdparty/common/decorators/StateDecorator';
import IRootScopeService = angular.IRootScopeService;

export class LoginStateChangedService {

  /*@ngInject*/
  constructor(private AuthenticationToken, private CurrentUser : CurrentUser, private $state : IStateServiceExtended,
              private $q : IQService, private lodash : LoDashStatic) {
  }

  public stateChangeStart = (toName, toParams) => {
    var isSignUpDestination = toName === 'login.register' || toName === 'login.signin' || toName === 'login.teacher_login';
    if (this.AuthenticationToken.get() === null || this.CurrentUser.get() === null) {
      if (!isSignUpDestination) {
        this.loadUser(toName, toParams);
        return false;
      }
    } else if (isSignUpDestination) {
      this.$state.go('classes');
      return false;
    }

    return true;
  };

  private loadUser(stateName, params) {
    this.$q.all([this.CurrentUser.load(), this.AuthenticationToken.load()])
      .then((results) => this.lodash.every(results) ?
        this.$state.go(stateName, params, {replace: true}) : this.$state.go('login.signin', null, {replace: true}))
      .catch(() => this.$state.go('login.signin', null, {replace: true}));
  }
}
