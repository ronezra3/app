"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var template = "\n  <activity-header type=\"poll\" field=\"$ctrl.activity.question\"></activity-header>\n  <replied-number replied=\"$ctrl.activity.getVoters().length\"\n                    is-playing=\"$ctrl.isPlaying\" activity=\"$ctrl.activity\"></replied-number>\n  <div class=\"narrow\">\n    <poll-answers-chart activity=\"$ctrl.activity\" is-playing=\"$ctrl.isPlaying\"></poll-answers-chart>\n  </div>\n";
var PollResultsContent = /** @class */ (function () {
    function PollResultsContent() {
        this.template = template;
        this.bindings = {
            activity: '<',
            isPlaying: '<'
        };
    }
    return PollResultsContent;
}());
exports.PollResultsContent = PollResultsContent;
//# sourceMappingURL=ResultsContent.js.map