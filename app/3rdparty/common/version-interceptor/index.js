"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var version_interceptor_service_1 = require("./version-interceptor.service");
var version_interceptor_state_1 = require("./version.interceptor.state");
exports.default = angular.module('Common.VersionInterceptor', ['Common.stateChanged'])
    .config(function ($httpProvider, $stateProvider) {
    $httpProvider.interceptors.push('VersionInterceptor');
    $stateProvider.state('insufficient-version', new version_interceptor_state_1.VersionInterceptorState());
})
    .run(function (StateChangedService, VersionInterceptor) {
    return StateChangedService.onStateChange(VersionInterceptor.onStateChanged);
})
    .service('VersionInterceptor', version_interceptor_service_1.VersionInterceptor).name;
//# sourceMappingURL=index.js.map