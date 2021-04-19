"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var EndButton_1 = require("../../activities/directives/EndButton");
var AssessEndButtonController = /** @class */ (function (_super) {
    __extends(AssessEndButtonController, _super);
    /*@ngInject*/
    function AssessEndButtonController(Activities, $state, ngDialogRouter, $q) {
        var _this = _super.call(this, Activities, $state) || this;
        _this.ngDialogRouter = ngDialogRouter;
        _this.$q = $q;
        _this.type = 'assess';
        return _this;
    }
    AssessEndButtonController.prototype.endAndBack = function () {
        var _this = this;
        if (!this.stillWorkingCount) {
            return _super.prototype.endAndBack.call(this);
        }
        var deferred = this.$q.defer();
        this.ngDialogRouter.go('are-you-sure', {
            message: 'confirm-end-assess',
            secondMessage: 'assess-still-working',
            yes: function () { return _super.prototype.endAndBack.call(_this).then(deferred.resolve); },
            no: deferred.reject,
            translationData: { studentCount: this.stillWorkingCount }
        }, false, { appendClassName: 'assess' });
        return deferred.promise;
    };
    return AssessEndButtonController;
}(EndButton_1.ActivityEndButtonController));
var template = "\n<click-once-button class=\"header-button\" on-click=\"$ctrl.endAndBack()\">\n  <loader></loader>\n  <ng-include class=\"header-icon\" src=\"'images/assess/stop_icon.svg'\"></ng-include>\n  <span class=\"header-text\">{{'end' | translate}}</span>\n</click-once-button>\n";
//   <ng-include class="header-icon" src="'images/stop.svg'"></ng-include>
var AssessEndButton = /** @class */ (function () {
    function AssessEndButton() {
        this.controller = AssessEndButtonController;
        this.template = template;
        this.bindings = {
            activity: '<',
            stillWorkingCount: '<'
        };
    }
    return AssessEndButton;
}());
exports.AssessEndButton = AssessEndButton;
//# sourceMappingURL=EndButton.js.map