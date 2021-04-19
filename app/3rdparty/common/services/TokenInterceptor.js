"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TokenInterceptor = /** @class */ (function () {
    /*@ngInject*/
    function TokenInterceptor($q, AuthenticationToken, LogOut) {
        var _this = this;
        this.$q = $q;
        this.AuthenticationToken = AuthenticationToken;
        this.LogOut = LogOut;
        this.request = function (config) {
            config.headers = config.headers || {};
            var token = _this.AuthenticationToken.get();
            if (token) {
                config.headers.Authorization = 'Bearer ' + token;
            }
            return config;
        };
        this.responseError = function (rejection) {
            if (rejection !== null && rejection.status === 401 && _this.AuthenticationToken.get()) {
                _this.LogOut.logOut('different_device_error');
            }
            return _this.$q.reject(rejection);
        };
    }
    return TokenInterceptor;
}());
exports.TokenInterceptor = TokenInterceptor;
//# sourceMappingURL=TokenInterceptor.js.map