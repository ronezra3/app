"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RegisterController = /** @class */ (function () {
    /*@ngInject*/
    function RegisterController(UsersStore, $state, validateUserPassword, Registrar) {
        this.$state = $state;
        this.validateUserPassword = validateUserPassword;
        this.Registrar = Registrar;
        this.termsAgreed = false;
        this.user = UsersStore.create();
    }
    RegisterController.prototype.onAvatarAdded = function (avatar) {
        this.selectedAvatar = avatar;
    };
    RegisterController.prototype.cancel = function () {
        this.$state.back();
    };
    RegisterController.prototype.onTermsChange = function (value) {
        this.termsAgreed = value;
    };
    RegisterController.prototype.register = function () {
        var _this = this;
        return this.Registrar.register(this.selectedAvatar, this.user).then(function () { return _this.$state.go('classes'); });
    };
    RegisterController.prototype.validate = function () {
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
        if (!this.selectedAvatar) {
            return 'missing_avatar';
        }
        if (!this.termsAgreed) {
            return 'missing_terms_agreement';
        }
        return null;
    };
    //
    RegisterController.prototype.validateUserName = function (userName) {
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
    };
    return RegisterController;
}());
var template = "\n<form name=\"$ctrl.form\" class=\"register\">\n  <div class=\"login-details\">\n    <avatar-picker on-avatar-added=\"$ctrl.onAvatarAdded(avatar)\" avatar-url=\"'3rdparty/common/images/login_avatar.svg'\"></avatar-picker>\n    <input name=\"username\" class=\"login-input\" type=\"text\" ng-model=\"$ctrl.user.userName\" placeholder=\"{{'user_name' | translate}}\">\n    <input class=\"login-input\" type=\"password\" ng-model=\"$ctrl.user.password\" placeholder=\"{{'password_param' | translate}}\">\n    <input class=\"login-input\" type=\"password\" ng-model=\"$ctrl.user.confirmedPassword\" placeholder=\"{{'confirm_password' | translate}}\">\n    <div class=\"register-details-names\">\n      <input type=\"text\" class=\"login-input\" ng-model=\"$ctrl.user.firstName\" placeholder=\"{{'first_name' | translate}}\">\n      <input type=\"text\" class=\"login-input\" ng-model=\"$ctrl.user.lastName\" placeholder=\"{{'last_name' | translate}}\">\n    </div>\n    <div class=\"terms-agreement\">\n      <checkbox on-change=\"$ctrl.onTermsChange(value)\" name=\"terms\"></checkbox>\n      <span>{{'i_have_read' | translate}} <dialog-link path=\"termsOfUse\">{{'terms_conditions' | translate}}</dialog-link></span>\n    </div>\n    <click-once-button class=\"primary action-button\" on-click=\"$ctrl.register()\" is-valid=\"$ctrl.validate()\">\n      <span>{{'create_account' | translate}}</span>\n      <loader></loader>\n    </click-once-button>\n  </div>\n</form>\n\n<div class=\"login-account-text\">{{'have_account' | translate}}</div>\n<button class=\"secondary action-button\" ng-click=\"\" ui-sref=\"login.signin\">{{'sign_in' | translate}}</button>\n";
var RegisterState = /** @class */ (function () {
    function RegisterState() {
        this.url = '/register';
        this.template = template;
        this.controller = RegisterController;
        this.controllerAs = '$ctrl';
    }
    return RegisterState;
}());
exports.RegisterState = RegisterState;
//# sourceMappingURL=register.js.map