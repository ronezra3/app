"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AssessDashboardHeaderController = /** @class */ (function () {
    /*@ngInject*/
    function AssessDashboardHeaderController(Localytics, Attention, CurrentSession, $interval) {
        this.Localytics = Localytics;
        this.Attention = Attention;
        this.CurrentSession = CurrentSession;
        this.$interval = $interval;
        this.paused = false;
    }
    AssessDashboardHeaderController.prototype.$onInit = function () {
        this.startTimer();
    };
    AssessDashboardHeaderController.prototype.$onDestroy = function () {
        this.stopTimer();
    };
    AssessDashboardHeaderController.prototype.resume = function () {
        this.Localytics.tagEvent('Assessment Resumed');
        this.Attention.toggle(this.CurrentSession.getInfo());
        this.startTimer();
        this.paused = false;
    };
    AssessDashboardHeaderController.prototype.pause = function () {
        this.Localytics.tagEvent('Assessment Paused');
        this.Attention.toggle(this.CurrentSession.getInfo());
        this.stopTimer();
        this.paused = true;
    };
    AssessDashboardHeaderController.prototype.startTimer = function () {
        var _this = this;
        this.countdownIntervalPromise = this.$interval(function () { return _this.onTimeChanged(); }, 1000);
    };
    AssessDashboardHeaderController.prototype.stopTimer = function () {
        this.$interval.cancel(this.countdownIntervalPromise);
    };
    return AssessDashboardHeaderController;
}());
var template = "\n<navigation-bar>\n  <right-buttons>\n    <missing-students-section append-class=\"assess\">\n      <ng-include src=\"'images/assess/left_arrow_icon.svg'\"></ng-include>\n    </missing-students-section>\n\n    <button class=\"header-button\" ng-show=\"$ctrl.paused\" ng-click=\"$ctrl.resume()\">\n      <ng-include class=\"header-icon\" src=\"'images/assess/resume_icon.svg'\"></ng-include>\n      <span class=\"header-text\">{{'resume' | translate}}</span>\n    </button>\n\n    <button class=\"header-button\" ng-hide=\"$ctrl.paused\" ng-click=\"$ctrl.pause()\">\n      <ng-include class=\"header-icon\" src=\"'images/assess/pause_icon.svg'\"></ng-include>\n      <span class=\"header-text\">{{'pause' | translate}}</span>\n    </button>\n\n    <assess-end-button activity=\"$ctrl.assess\" still-working-count=\"$ctrl.stillWorkingCount\"></assess-end-button>\n  </right-buttons>\n</navigation-bar>\n";
var AssessDashboardHeader = /** @class */ (function () {
    function AssessDashboardHeader() {
        this.controller = AssessDashboardHeaderController;
        this.template = template;
        this.bindings = {
            assess: '<',
            stillWorkingCount: '<',
            onTimeChanged: '&'
        };
    }
    return AssessDashboardHeader;
}());
exports.AssessDashboardHeader = AssessDashboardHeader;
//# sourceMappingURL=AssessDashboardHeaderDirective.js.map