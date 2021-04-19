"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var template = "\n<button ng-click=\"$ctrl.next()\">\n  <ng-include class=\"pressed\" src=\"'images/start-session-pressed.svg'\"></ng-include>\n  <ng-include class=\"standby\" src=\"'images/start-session.svg'\"></ng-include>\n  <span>{{'start-session' | translate}}</span>\n</button>\n";
var StartSessionButton = /** @class */ (function () {
    function StartSessionButton() {
        this.template = template;
        this.bindings = {
            next: '&'
        };
    }
    return StartSessionButton;
}());
exports.StartSessionButton = StartSessionButton;
//# sourceMappingURL=StartSessionButton.js.map