"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TeacherLoginController = /** @class */ (function () {
    /*@ngInject*/
    function TeacherLoginController(UsersStore, CurrentUser, $state, $q, AuthenticationToken) {
        this.CurrentUser = CurrentUser;
        this.$state = $state;
        this.$q = $q;
        this.AuthenticationToken = AuthenticationToken;
        this.user = UsersStore.create();
    }
    TeacherLoginController.prototype.validate = function () {
        if (!this.user.userName || !this.user.password) {
            return 'missing_login_details';
        }
        return null;
    };
    TeacherLoginController.prototype.login = function () {
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
                default:
                    return _this.$q.reject('backand_generic_error');
            }
        });
    };
    return TeacherLoginController;
}());
var template = "\n<form>\n  <div class=\"login-details\">\n  <embed class=\"full-logo\" src=\"images/new/Bee1.svg\" style=\"top: -3.3rem;\" />\n    <input name=\"username\" class=\"login-input\" type=\"text\" ng-model=\"$ctrl.user.userName\"\n           placeholder=\"{{'user_name' | translate}}\">\n    <input name=\"password\" class=\"login-input\" type=\"password\" ng-model=\"$ctrl.user.password\"\n           placeholder=\"{{'password_param' | translate}}\">\n    <click-once-button class=\"primary action-button\" on-click=\"$ctrl.login()\" is-valid=\"$ctrl.validate()\">\n      <span>{{'sign_in' | translate}}</span>\n      <loader></loader>\n    </click-once-button>\n  </div>\n</form>\n\n<div class=\"login-account-text\">{{'no_account' | translate}}</div>\n<button class=\"secondary action-button\" ng-click=\"\" ui-sref=\"login.register\">{{'create_account' | translate}}</button>\n";
var TeacherLoginState = /** @class */ (function () {
    function TeacherLoginState() {
        this.url = '/teacher_login';
        this.template = template;
        this.controller = TeacherLoginController;
        this.controllerAs = '$ctrl';
    }
    return TeacherLoginState;
}());
exports.TeacherLoginState = TeacherLoginState;
//# sourceMappingURL=teacher_login.js.map