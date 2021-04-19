"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var VersionInterceptor = /** @class */ (function () {
    /*@ngInject*/
    function VersionInterceptor($q, $injector, ENV) {
        var _this = this;
        this.$q = $q;
        this.$injector = $injector;
        this.ENV = ENV;
        this.isInInsufficientVersion = false;
        this.onStateChanged = function (toName) { return toName === 'insufficient-version' && _this.isInInsufficientVersion; };
        this.request = function (config) {
            config.headers = config.headers || {};
            // TODO - refactor this to take the right version depend on the request url
            config.headers.version = _this.ENV.compliantLmsVersion;
            return config;
        };
        this.responseError = function (rejection) {
            if (rejection !== null && rejection.status === 406
                && rejection.data === VersionInterceptor.VERSION_ERROR_MSG && !_this.isInInsufficientVersion) {
                _this.isInInsufficientVersion = true;
                var ngDialogRouter = _this.$injector.get('ngDialogRouter');
                ngDialogRouter.closeAll();
                var $state = _this.$injector.get('$state');
                $state.go('insufficient-version');
            }
            return _this.$q.reject(rejection);
        };
    }
    VersionInterceptor.VERSION_ERROR_MSG = 'insufficient_client_version';
    return VersionInterceptor;
}());
exports.VersionInterceptor = VersionInterceptor;
//# sourceMappingURL=version-interceptor.service.js.map