"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PollAnswersChartController = /** @class */ (function () {
    /*@ngInject*/
    function PollAnswersChartController(lodash, Activities, CurrentSession) {
        this.lodash = lodash;
        this.Activities = Activities;
        this.CurrentSession = CurrentSession;
    }
    PollAnswersChartController.prototype.$onInit = function () {
        var _this = this;
        if (this.isPlaying) {
            this.Activities.onSubmitted('poll', function (vote) {
                var answer = _this.lodash.find(_this.activity.answers, { id: vote.answerId });
                answer.voters.push(vote.userId);
            });
        }
    };
    PollAnswersChartController.prototype.getTotalCount = function () {
        return this.isPlaying ? this.CurrentSession.getAttendanceMgr().getAttendingCount() : this.activity.attendedCount;
    };
    return PollAnswersChartController;
}());
var template = "\n<ul class=\"poll-answers-status\">\n  <li ng-repeat=\"answer in $ctrl.activity.answers\">\n    <poll-answer-status answer=\"answer\" index=\"$index\" total=\"$ctrl.getTotalCount()\"></poll-answer-status>\n  </li>\n</ul>\n";
var PollAnswersChart = /** @class */ (function () {
    function PollAnswersChart() {
        this.controller = PollAnswersChartController;
        this.template = template;
        this.bindings = {
            activity: '<',
            isPlaying: '<'
        };
    }
    return PollAnswersChart;
}());
exports.PollAnswersChart = PollAnswersChart;
//# sourceMappingURL=PollAnswersChartDirective.js.map