"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SigninController = /** @class */ (function () {
    /*@ngInject*/
    function SigninController(UsersStore, CurrentUser, $state, $q, AuthenticationToken) {
        this.CurrentUser = CurrentUser;
        this.$state = $state;
        this.$q = $q;
        this.AuthenticationToken = AuthenticationToken;
        this.termsAgreed = false;
        this.user = UsersStore.create();
    }
    SigninController.prototype.validate = function () {
        if (!this.user.userName || !this.termsAgreed) {
            return 'missing_login_details';
        }
        return null;
    };
    SigninController.prototype.onTermsChange = function (value) {
        this.termsAgreed = value;
    };
    SigninController.prototype.login = function () {
        var _this = this;
        this.user.userName = this.user.userName.toLowerCase();
        return this.user.$login()
            .then(function (user) {
            _this.CurrentUser.set(user);
            _this.AuthenticationToken.set(user.token);
            return _this.$state.go('classes', null, { replace: true });
        })
            .catch(function (exception) {
            switch (exception.status) {
                case 406:
                    return;
                case 401:
                    return _this.$q.reject('unauthorized_login');
                case 409:
                    return _this.$q.reject('user_already_exists');
                default:
                    return _this.$q.reject('backand_generic_error');
            }
        });
    };
    return SigninController;
}());
var template = "\n<form>\n  <div class=\"login-details\">\n    <embed class=\"full-logo\" src=\"images/new/Bee1.svg\" style=\"top: -4.3rem;\" />\n    <input name=\"username\" class=\"login-input\" type=\"text\" ng-model=\"$ctrl.user.userName\"\n           placeholder=\"{{'user_name' | translate}}\" style=\"margin-top:0\">\n           <div class=\"register\">\n  <div class=\"terms-agreement\">\n      <checkbox on-change=\"$ctrl.onTermsChange(value)\" name=\"terms\"></checkbox>\n      <span>{{'i_have_read' | translate}} <dialog-link path=\"termsOfUse\">{{'terms_conditions' | translate}}</dialog-link></span>\n    </div>\n    </div>\n    <click-once-button class=\"primary action-button\" on-click=\"$ctrl.login()\" is-valid=\"$ctrl.validate()\">\n      <span>{{'sign_in' | translate}}</span>\n      <loader></loader>\n    </click-once-button>\n  </div>\n</form>\n\n<div class=\"login-account-text\">{{'no_account' | translate}}</div>\n<button class=\"secondary action-button\" ng-click=\"\" ui-sref=\"login.register\">{{'create_account' | translate}}</button>\n<button class=\"secondary action-button\" ng-click=\"\" ui-sref=\"login.teacher_login\">{{'teacher_login' | translate}}</button>\n<div class=\"login-account-text\">{{'Powered by'}} <embed src=\"images/new/Logo.svg\" class=\"methodic-logo\" /></div>\n";
var SigninState = /** @class */ (function () {
    function SigninState() {
        this.url = '/signin';
        this.template = template;
        this.controller = SigninController;
        this.controllerAs = '$ctrl';
    }
    return SigninState;
}());
exports.SigninState = SigninState;
//# sourceMappingURL=signin.js.map