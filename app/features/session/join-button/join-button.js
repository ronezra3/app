"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('./join-button.scss');
var template = "\n<click-once-button on-click=\"$ctrl.join()\">\n  <img class=\"standby\" src=\"images/join_session.svg\">\n  <img class=\"pressed\" src=\"images/join_session.svg\">\n  <span class=\"full-text\">{{'join-session-button-text' | translate}}</span>\n  <span class=\"short-text\">{{'join_session' | translate}}</span>\n  <loader></loader>\n</click-once-button>\n";
var JoinButton = /** @class */ (function () {
    function JoinButton() {
        this.template = template;
        this.bindings = {
            join: '&'
        };
    }
    return JoinButton;
}());
exports.JoinButton = JoinButton;
//# sourceMappingURL=join-button.js.map