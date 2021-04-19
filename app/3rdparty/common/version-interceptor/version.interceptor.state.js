"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var template = "\n<view>\n  <content class=\"insufficient-version\">\n    <ng-include class=\"validation-icon\" src=\"'3rdparty/common/images/alert.svg'\"></ng-include>\n    <p class=\"validation-error-message\">{{'insufficient_client_version' | translate}}</p>\n  </content>\n</view>\n";
var VersionInterceptorState = /** @class */ (function () {
    function VersionInterceptorState() {
        this.url = '/insufficient-version';
        this.template = template;
    }
    return VersionInterceptorState;
}());
exports.VersionInterceptorState = VersionInterceptorState;
//# sourceMappingURL=version.interceptor.state.js.map