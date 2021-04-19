import IQService = angular.IQService;
import { IStateServiceExtended } from '../../../3rdparty/common/decorators/StateDecorator';
import { UsersStore } from '../../users/services/UsersStore';
import { Registrar } from '../../../3rdparty/common/login/services/Registrar';

class RegisterController {
  selectedAvatar;
  user;
  termsAgreed = false;
  chooseAvatarState = false;
  avatarIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  /*@ngInject*/
  constructor(UsersStore: UsersStore, private $state: IStateServiceExtended, private validateUserPassword, private Registrar: Registrar) {
    this.user = UsersStore.create();
  }

  choose(avatarId) {
    this.user.avatarId = avatarId;
    this.Registrar.update(this.user).then(() => {
      return this.$state.go('classes');
    })

  }
  chooseAvatarSatae(value) {
    if(value === true) {
      this.chooseAvatarState = value;
    }
    
    return this.chooseAvatarState
    
  }

  onAvatarAdded(avatar) {
    this.selectedAvatar = avatar;
  }

  cancel() {
    this.$state.back();
  }

  onTermsChange(value) {
    this.termsAgreed = value;
  }

  register() {
    return this.Registrar.register(this.selectedAvatar, this.user).then(() => {
      if (this.selectedAvatar)
        this.$state.go('classes')
      else {
        this.chooseAvatarSatae(true);
      }

    });
  }

  validate() {
    if (!(this.user.userName && this.user.password && this.user.confirmedPassword
      && this.user.firstName && this.user.lastName)) {
      return 'missing_register_details';
    }

    var userNameValidationError = this.validateUserName(this.user.userName);
    if (userNameValidationError) {
      return userNameValidationError;
    }

    var passwordValidationError = this.validateUserPassword(this.user.password, this.user.confirmedPassword);
    if (passwordValidationError) {
      return passwordValidationError;
    }

    // if (!this.selectedAvatar) {
    //   return 'missing_avatar';
    // }

    if (!this.termsAgreed) {
      return 'missing_terms_agreement';
    }

    return null;
  }
  //
  private validateUserName(userName): any {
    var startsWithLetter = new RegExp('^[a-z, A-Z]');
    /* tslint:disable */
    var containsOnlyValidChars = new RegExp("^[-_.'A-Za-z0-9]+$");
    var haveTwoSeparators = new RegExp("[_.'-]{2,}");
    /* tslint:enable */

    if (userName.length < 4) {
      return 'username_too_short';
    }

    if (userName.length > 20) {
      return 'username_too_long';
    }

    if (!startsWithLetter.test(userName)) {
      return 'username_should_start_with_letter';
    }

    if (!containsOnlyValidChars.test(userName)) {
      return 'username_contains_invalid_chars';
    }

    if (haveTwoSeparators.test(userName)) {
      return 'username_has_two_separators';
    }

    return false;
  }
}


const template = `
<form name="$ctrl.form" class="register" ng-if="!$ctrl.chooseAvatarSatae()">
  <div class="login-details">
    <avatar-picker on-avatar-added="$ctrl.onAvatarAdded(avatar)" avatar-url="'3rdparty/common/images/login_avatar.png'"></avatar-picker>
    <input name="username" class="login-input" type="text" ng-model="$ctrl.user.userName" placeholder="{{'user_name' | translate}}">
    <span style="    text-align: right;
    direction: rtl;
    display: inherit;
    font-size: 14px;">שם משתמש צריך להכיל 4 תווים לפחות ויכול להכיל רק אותיות אנגליות וספרות</span>
    <input class="login-input" type="password" ng-model="$ctrl.user.password" placeholder="{{'password_param' | translate}}">
    <input class="login-input" type="password" ng-model="$ctrl.user.confirmedPassword" placeholder="{{'confirm_password' | translate}}">
    <div class="register-details-names">
      <input type="text" class="login-input" ng-model="$ctrl.user.firstName" placeholder="{{'first_name' | translate}}">
      <input type="text" class="login-input" ng-model="$ctrl.user.lastName" placeholder="{{'last_name' | translate}}">
    </div>
    <input class="login-input" type="text" ng-model="$ctrl.user.schoolCode" placeholder="קוד בית ספר">
    <div class="terms-agreement">
      <checkbox on-change="$ctrl.onTermsChange(value)" name="terms"></checkbox>
      <span>{{'i_have_read' | translate}} <dialog-link path="termsOfUse">{{'terms_conditions' | translate}}</dialog-link></span>
    </div>
    <click-once-button class="primary action-button" on-click="$ctrl.register()" is-valid="$ctrl.validate()">
      <span>{{'create_account' | translate}}</span>
      <loader></loader>
    </click-once-button>
  </div>
</form>

<div class="login-account-text" ng-if="!$ctrl.chooseAvatarSatae()">{{'have_account' | translate}}</div>
<button class="secondary action-button" ng-click="" ui-sref="login.signin"  ng-if="!$ctrl.chooseAvatarSatae()">{{'sign_in' | translate}}</button>


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

export class RegisterState {
  url = '/register';
  template = template;
  controller = RegisterController;
  controllerAs = '$ctrl';
}
