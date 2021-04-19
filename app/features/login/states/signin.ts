import { UsersStore } from '../../users/services/UsersStore';
import { Registrar } from '../../../3rdparty/common/login/services/Registrar';

class SigninController {
  user;
  termsAgreed = false;
  chooseAvatarState = false;
  avatarIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  userProxy;

  ssoLoginEnabled = false;

  /*@ngInject*/
  constructor(private Registrar, UsersStore: UsersStore, private CurrentUser, private $state, private $q, private AuthenticationToken, private ENV) {
    this.user = UsersStore.create();

    this.ssoLoginEnabled = this.ENV.ssoLoginEnabled;
    if (this.ssoLoginEnabled) {
      // @TODO: if user is not logged in....
      this.loginSSO();
    }
  }


  validate(): string {
    if (!this.user.userName || !this.termsAgreed) {
      return 'missing_login_details';
    }

    return null;
  }
  onTermsChange(value) {
    this.termsAgreed = value;
  }

  choose(avatarId) {
    this.user.avatarId = avatarId;
    this.Registrar.update(this.user).then(() => {
      return this.$state.go('classes', null, { replace: true });
    })

  }
  chooseAvatarSatae(value) {
    if(value === true) {
      this.chooseAvatarState = value;
    }
    
    return this.chooseAvatarState
    
  }

  loginSSO() {
    return this.login(this.user.$loginSSO);
  }

  loginUser() {
    this.user.userName = this.user.userName.toLowerCase();
    console.log("USERNAME:",this.user.userName);
    return this.login(this.user.$login);
  }
  
  login(loginFn) {
    loginFn().then((user) => {
        this.CurrentUser.set(user);
        this.AuthenticationToken.set(user.token);
        this.user = user;

        if (!user.isTeacher) {
          this.chooseAvatarSatae(true);
        }
        else {
          return this.$state.go('classes', null, { replace: true });
        }
        // return this.$state.go('login.choose_avatar', null, { replace: true });
      })
      .catch((exception) => {
        switch (exception.status) {
          case 406:
            return;
          case 401:
            return this.$q.reject('unauthorized_login');
          case 409:
            return this.$q.reject('user_already_exists');
          default:
            return this.$q.reject('backand_generic_error');
        }
      });
  }
}

const template = `
<form ng-if="!$ctrl.chooseAvatarSatae()">
  <div class="login-details">
    <embed class="full-logo" src="images/new/Bee1.png" style="top: -4.3rem;" />
    <input name="username" class="login-input" type="text" ng-model="$ctrl.user.userName"
           placeholder="{{'user_name' | translate}}" style="margin-top:0">
           <div class="register">
  <div class="terms-agreement">
      <checkbox on-change="$ctrl.onTermsChange(value)" name="terms"></checkbox>
      <span>{{'i_have_read' | translate}} <dialog-link path="termsOfUse">{{'terms_conditions' | translate}}</dialog-link></span>
    </div>
    </div>
    <click-once-button class="primary action-button" on-click="$ctrl.loginUser()" is-valid="$ctrl.validate()">
      <span>{{'sign_in' | translate}}</span>
      <loader></loader>
    </click-once-button>
  </div>
</form>
<div ng-if="!$ctrl.chooseAvatarSatae()">
<div class="login-account-text">{{'no_account' | translate}}</div>
<button class="secondary action-button" ng-click="" ui-sref="login.register">{{'create_account' | translate}}</button>
<button class="secondary action-button" ng-click="" ui-sref="login.teacher_login">{{'teacher_login' | translate}}</button>
<div class="login-account-text">{{'Powered by'}} <embed src="images/new/Logo.png" class="methodic-logo" /></div>
</div>

<div class="choose-avatar" ng-if="$ctrl.chooseAvatarSatae()">

<header class="activity-header narrow">
  <h1>בחר דמות</h1>
</header>
<ul class="wrap-panel" style="margin-left:50px">
<li ng-repeat="avatarId in $ctrl.avatarIds">
<button ng-click="$ctrl.choose(avatarId)" style="margin-right: 10px;">
  <div class="member-circle">
    <img class="member-image" src="images/avatars/{{avatarId}}.png"/>
  </div>
</button>
</li>
</ul>
</div>
`;

export class SigninState {
  url = '/signin';
  template = template;
  controller = SigninController;
  controllerAs = '$ctrl';
}
