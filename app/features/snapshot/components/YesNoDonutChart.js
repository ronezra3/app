"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var YesNoDonutController = /** @class */ (function () {
    /*@ngInject*/
    function YesNoDonutController(CssUtilities, CurrentSession, Activities) {
        this.CssUtilities = CssUtilities;
        this.CurrentSession = CurrentSession;
        this.Activities = Activities;
    }
    YesNoDonutController.prototype.$onInit = function () {
        var _this = this;
        if (this.isPlaying) {
            this.Activities.onSubmitted('snapshot', function (vote) { return _this.activity[vote.vote].push(vote.userId); });
        }
    };
    YesNoDonutController.prototype.convertRem = function (value) {
        return this.CssUtilities.convertRem(value);
    };
    YesNoDonutController.prototype.getTotalCount = function () {
        return this.isPlaying ? this.CurrentSession.getAttendanceMgr().getAttendingCount() : this.activity.attendedCount;
    };
    return YesNoDonutController;
}());
exports.YesNoDonutController = YesNoDonutController;
var template = "\n<aside class=\"snapshot-label-no\">\n  <ng-include class=\"snapshot-no-icon-small\" src=\"'images/new/X.svg'\"></ng-include>\n  <div class=\"yes-no-num\">{{$ctrl.activity.no.length}}</div>\n</aside>\n<svg class=\"yes-no-chart\" xmlns=\"http://www.w3.org/2000/svg\">\n  <circle class=\"chart-inner-circle\" ng-attr-r=\"{{$ctrl.convertRem(6.063)}}\"\n    ng-attr-cy=\"{{$ctrl.convertRem(10.875)}}\" ng-attr-cx=\"{{$ctrl.convertRem(10.875)}}\" />\n  <donut-chart-vote-progress class=\"yes-chart\" total=\"$ctrl.getTotalCount()\" votes-count=\"$ctrl.activity.yes.length\" />\n  <donut-chart-vote-progress class=\"no-chart\" total=\"$ctrl.getTotalCount()\"\n    votes-count=\"$ctrl.activity.no.length\" counter-clockwise=\"true\" />\n  <g class=\"donut-title-wrapper\">\n    <text ng-attr-y=\"{{$ctrl.convertRem(10.875)}}\" ng-attr-x=\"{{$ctrl.convertRem(10.875)}}\"\n      text-anchor=\"middle\" class=\"donut-title-counter\">{{ $ctrl.activity.yes.length + $ctrl.activity.no.length }} / {{ $ctrl.getTotalCount() }}</text>\n    <text ng-attr-y=\"{{$ctrl.convertRem(12.875)}}\" ng-attr-x=\"{{$ctrl.convertRem(10.875)}}\"\n      text-anchor=\"middle\" class=\"donut-title-replied\">{{'replied' | translate}}</text>\n  </g>\n</svg>\n<aside class=\"snapshot-label-yes\">\n  <ng-include class=\"snapshot-yes-icon-small\" src=\"'images/new/V.svg'\"></ng-include>\n  <div class=\"yes-no-num\">{{$ctrl.activity.yes.length}}</div>\n</aside>\n";
var YesNoDonut = /** @class */ (function () {
    function YesNoDonut() {
        this.controller = YesNoDonutController;
        this.template = template;
        this.bindings = {
            activity: '<',
            isPlaying: '<'
        };
    }
    return YesNoDonut;
}());
exports.YesNoDonut = YesNoDonut;
//# sourceMappingURL=YesNoDonutChart.js.map