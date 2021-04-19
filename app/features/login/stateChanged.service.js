"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LoginStateChangedService = /** @class */ (function () {
    /*@ngInject*/
    function LoginStateChangedService(AuthenticationToken, CurrentUser, $state, $q, lodash) {
        var _this = this;
        this.AuthenticationToken = AuthenticationToken;
        this.CurrentUser = CurrentUser;
        this.$state = $state;
        this.$q = $q;
        this.lodash = lodash;
        this.stateChangeStart = function (toName, toParams) {
            var isSignUpDestination = toName === 'login.register' || toName === 'login.signin' || toName === 'login.teacher_login';
            if (_this.AuthenticationToken.get() === null || _this.CurrentUser.get() === null) {
                if (!isSignUpDestination) {
                    _this.loadUser(toName, toParams);
                    return false;
                }
            }
            else if (isSignUpDestination) {
                _this.$state.go('classes');
                return false;
            }
            return true;
        };
    }
    LoginStateChangedService.prototype.loadUser = function (stateName, params) {
        var _this = this;
        this.$q.all([this.CurrentUser.load(), this.AuthenticationToken.load()])
            .then(function (results) { return _this.lodash.every(results) ?
            _this.$state.go(stateName, params, { replace: true }) : _this.$state.go('login.signin', null, { replace: true }); })
            .catch(function () { return _this.$state.go('login.signin', null, { replace: true }); });
    };
    return LoginStateChangedService;
}());
exports.LoginStateChangedService = LoginStateChangedService;
//# sourceMappingURL=stateChanged.service.js.map