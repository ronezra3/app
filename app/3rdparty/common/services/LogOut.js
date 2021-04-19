"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LOGGED_OUT = 'loggedOut';
var LOGGING_OUT = 'loggingOut';
var LogOut = /** @class */ (function () {
    /*@ngInject*/
    function LogOut($rootScope, AuthenticationToken) {
        this.$rootScope = $rootScope;
        this.AuthenticationToken = AuthenticationToken;
    }
    LogOut.prototype.logOut = function (error) {
        this.$rootScope.$broadcast(LOGGING_OUT, error);
        this.AuthenticationToken.remove();
        this.$rootScope.$broadcast(LOGGED_OUT, error);
    };
    LogOut.prototype.onLoggingOut = function (callback) {
        return this.$rootScope.$on(LOGGING_OUT, callback);
    };
    LogOut.prototype.onLoggedOut = function (callback) {
        return this.$rootScope.$on(LOGGED_OUT, callback);
    };
    return LogOut;
}());
exports.LogOut = LogOut;
//# sourceMappingURL=LogOut.js.map