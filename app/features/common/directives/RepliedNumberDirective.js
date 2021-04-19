"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RepliedNumberController = /** @class */ (function () {
    /*@ngInject*/
    function RepliedNumberController(CurrentSession) {
        this.CurrentSession = CurrentSession;
    }
    RepliedNumberController.prototype.getTotalCount = function () {
        console.log(JSON.stringify(this.activity));
        return this.isPlaying ? this.CurrentSession.getAttendanceMgr().getAttendingCount() : this.activity.attendedCount;
    };
    return RepliedNumberController;
}());
var template = "\n<span class=\"replied-counter\">{{ $ctrl.replied || 0}}/{{ $ctrl.getTotalCount() || 0}} </span>\n<span class=\"replied-label\">{{'replied' | translate}} </span>\n";
var RepliedNumber = /** @class */ (function () {
    function RepliedNumber() {
        this.controller = RepliedNumberController;
        this.template = template;
        this.bindings = {
            replied: '<',
            isPlaying: '<',
            activity: '<'
        };
    }
    return RepliedNumber;
}());
exports.RepliedNumber = RepliedNumber;
//# sourceMappingURL=RepliedNumberDirective.js.map