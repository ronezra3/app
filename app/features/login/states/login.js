"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var template = "\n<view class=\"login\">\n  <content scrollable=\"true\">\n    <ui-view></ui-view>\n  </content>\n</view>\n";
//
var LoginState = /** @class */ (function () {
    function LoginState() {
        this.url = '/login';
        this.abstract = true;
        this.template = template;
    }
    return LoginState;
}());
exports.LoginState = LoginState;
//# sourceMappingURL=login.js.map