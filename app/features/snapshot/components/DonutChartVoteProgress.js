"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DonutChartVoteProgressController = /** @class */ (function () {
    /*@ngInject*/
    function DonutChartVoteProgressController(CssUtilities) {
        this.CssUtilities = CssUtilities;
        this.radiusInRem = 10.25;
        this.middleInRem = 10.875;
        this.circumference = 2 * Math.PI * this.radiusInRem;
    }
    DonutChartVoteProgressController.prototype.convertRem = function (value) {
        return this.CssUtilities.convertRem(value);
    };
    DonutChartVoteProgressController.prototype.transform = function (middle) {
        return this.counterClockwise ? "rotate(-90 " + middle + " " + middle + ") scale(1,-1) translate(0,-" + middle * 2 + ")" : "rotate(-90 " + middle + " " + middle + ")";
    };
    DonutChartVoteProgressController.prototype.getOffset = function () {
        var votesPercentage = (this.votesCount / this.total) || 0;
        var votesStroke = this.circumference * votesPercentage;
        return this.circumference - votesStroke;
    };
    return DonutChartVoteProgressController;
}());
var template = "\n<circle class=\"circle-animation\"\n        ng-attr-r=\"{{$ctrl.convertRem($ctrl.radiusInRem)}}\" ng-attr-cy=\"{{$ctrl.convertRem($ctrl.middleInRem)}}\"\n        ng-attr-cx=\"{{$ctrl.convertRem($ctrl.middleInRem)}}\" stroke-dashoffset=\"{{$ctrl.convertRem($ctrl.getOffset())}}\"\n        ng-attr-transform=\"{{$ctrl.transform($ctrl.convertRem($ctrl.middleInRem))}}\"\n        stroke-dasharray=\"{{$ctrl.convertRem($ctrl.circumference)}}\" stroke-width=\"{{$ctrl.convertRem(1.125)}}\"/>\n";
function DonutChartVoteProgress() {
    return {
        replace: true,
        scope: {},
        controllerAs: '$ctrl',
        templateNamespace: 'svg',
        bindToController: {
            votesCount: '<',
            total: '<',
            counterClockwise: '<'
        },
        template: template,
        controller: DonutChartVoteProgressController
    };
}
exports.DonutChartVoteProgress = DonutChartVoteProgress;
//# sourceMappingURL=DonutChartVoteProgress.js.map