import { UsersStore } from '../../users/services/UsersStore';

class TeacherLoginController {
  user;
  /*@ngInject*/
  constructor(UsersStore: UsersStore, private CurrentUser, private $state, private $q, private AuthenticationToken) {
    this.user = UsersStore.create();
  }

  validate(): string {
    if (!this.user.userName || !this.user.password) {
      return 'missing_login_details';
    }

    return null;
  }


  login() {
    this.user.userName = this.user.userName.toLowerCase();
    return this.user.$login()
      .then((user) => {
        this.CurrentUser.set(user);
        this.AuthenticationToken.set(user.token);
        return this.$state.go('classes', null, { replace: true });
      })
      .catch((exception) => {
        switch (exception.status) {
          case 406:
            return;
          case 401:
            return this.$q.reject('unauthorized_login');
          default:
            return this.$q.reject('backand_generic_error');
        }
      });
  }
}

const template = `
<form>
  <div class="login-details">
  <embed class="full-logo" src="images/new/Bee1.png" style="top: -3.3rem;" />
    <input name="username" class="login-input" type="text" ng-model="$ctrl.user.userName"
           placeholder="{{'user_name' | translate}}">
    <input name="password" class="login-input" type="password" ng-model="$ctrl.user.password"
           placeholder="{{'password_param' | translate}}">
    <click-once-button class="primary action-button" on-click="$ctrl.login()" is-valid="$ctrl.validate()">
      <span>{{'sign_in' | translate}}</span>
      <loader></loader>
    </click-once-button>
  </div>
</form>

<div class="login-account-text">{{'no_account' | translate}}</div>
<button class="secondary action-button" ng-click="" ui-sref="login.register">{{'create_account' | translate}}</button>
`;

export class TeacherLoginState {
  url = '/teacher_login';
  template = template;
  controller = TeacherLoginController;
  controllerAs = '$ctrl';
}
