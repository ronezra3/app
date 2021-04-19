"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SECONDS_TO_AUTO_CLOSE_INTRO = 15;
var AssessPlayIntroController = /** @class */ (function () {
    /*@ngInject*/
    function AssessPlayIntroController($scope, $interval) {
        var _this = this;
        this.heyTranslationData = {
            name: $scope['name'],
            minutes: $scope['minutes']
        };
        this.immediateFeedback = $scope['immediateFeedback'];
        this.seconds = SECONDS_TO_AUTO_CLOSE_INTRO;
        var countdownIntervalPromise = $interval(function () {
            _this.seconds--;
            if (_this.seconds === 0) {
                // $scope['closeThisDialog']();
            }
        }, 1000);
        $scope.$on('$destroy', function () { return $interval.cancel(countdownIntervalPromise); });
    }
    return AssessPlayIntroController;
}());
var template = "\n<header class=\"assess-dialog-header\">\n  <h1>\u05D1\u05D5\u05D0\u05D5 \u05E0\u05E6\u05D0 \u05DC\u05E1\u05D3\u05E8\u05EA \u05E9\u05D0\u05DC\u05D5\u05EA \u05D7\u05E9\u05D9\u05D1\u05D4</h1>\n</header>\n<p>\u05D0\u05D5\u05DC\u05D9 \u05E0\u05D8\u05E2\u05D4, \u05D0\u05D1\u05DC \u05D1\u05D8\u05D5\u05D7 \u05E0\u05D6\u05DB\u05D5\u05E8\n<br>\u05D1\u05D4\u05E6\u05DC\u05D7\u05D4 \u05D5\u05D1\u05D4\u05E0\u05D0\u05D4</p>\n<p ng-if=\"$ctrl.immediateFeedback\">{{'assess-play-intro-immediate' | translate}}</p>\n<p ng-if=\"!$ctrl.immediateFeedback\" style=\"direction: rtl;\">{{'assess-play-intro-none-immediate' | translate}}</p>\n<embed class=\"icon\" style=\"height:130px;display:inline\" src=\"images/new/ic5.svg\" />\n<footer>\n  <button class=\"primary action-button\" ng-click=\"closeThisDialog()\">\n    <span>{{'start' | translate}}</span> <span class=\"direction-rtl\" style=\"unicode-bidi: bidi-override;\"> ({{$ctrl.seconds}})</span>\n  </button>\n</footer>\n";
// <ng-include class="icon" src="'images/panel/icons/assess.svg'"></ng-include>
// <p>{{'assess-play-intro-hey' | translate:$ctrl.heyTranslationData}}</p>
var AssessPlayIntro = /** @class */ (function () {
    function AssessPlayIntro() {
        this.template = template;
        this.controllerAs = '$ctrl';
        this.controller = AssessPlayIntroController;
        this.appendClassName = 'assess play-intro';
    }
    return AssessPlayIntro;
}());
exports.AssessPlayIntro = AssessPlayIntro;
//# sourceMappingURL=PlayIntro.js.map