"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var template = "\n<navigation-bar>\n    <left-buttons>\n      <back-button></back-button>\n    </left-buttons>\n\n    <nav-bar-title>\n      <div>{{$ctrl.activity.title || ('default-assess-title' | translate)}}</div>\n    </nav-bar-title>\n\n    <right-buttons>\n      <button class=\"header-button form-button\" ui-sref=\"assess-form({activityId: $ctrl.activity.id})\" ng-click=\"\">\n        <ng-include class=\"header-icon\" src=\"'images/assess/assess_preview_icon.svg'\"></ng-include>\n        <span class=\"header-text\">{{'form' | translate}}</span>\n      </button>\n    </right-buttons>\n  </navigation-bar>\n  ";
var AssessReportNavBar = /** @class */ (function () {
    function AssessReportNavBar() {
        this.template = template;
        this.bindings = {
            activity: '<'
        };
    }
    return AssessReportNavBar;
}());
exports.AssessReportNavBar = AssessReportNavBar;
//# sourceMappingURL=ReportNavBar.js.map