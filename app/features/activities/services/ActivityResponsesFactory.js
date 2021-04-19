"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ActivityResponses = /** @class */ (function () {
    /*@ngInject*/
    function ActivityResponses(SocketIO, CurrentSession) {
        this.SocketIO = SocketIO;
        this.CurrentSession = CurrentSession;
    }
    ActivityResponses.prototype.submit = function (type, activity, response) {
        var _this = this;
        return response.$submit().then(function () {
            _this.SocketIO.emit(_this.CurrentSession.getInfo().id, type + ".submit", response);
        });
    };
    return ActivityResponses;
}());
exports.ActivityResponses = ActivityResponses;
//# sourceMappingURL=ActivityResponsesFactory.js.map