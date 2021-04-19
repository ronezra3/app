"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var template = "\n<nav class=\"activity-buttons-nav padded\">\n  <activity-remove-button ng-if=\"$ctrl.activity.id\" type=\"{{$ctrl.type}}\" activity=\"$ctrl.activity\"></activity-remove-button>\n  <activity-save-button class=\"primary\" activity=\"$ctrl.activity\" type=\"{{$ctrl.type}}\"\n    specific-data=\"$ctrl.getSpecificData()\" is-valid=\"$ctrl.isValid\"></activity-save-button>\n</nav>\n";
var ActivityEnrichPreviewFooter = /** @class */ (function () {
    function ActivityEnrichPreviewFooter() {
        this.template = template;
        this.bindings = {
            type: '@',
            activity: '<',
            getSpecificData: '&',
            isValid: '<'
        };
    }
    return ActivityEnrichPreviewFooter;
}());
exports.ActivityEnrichPreviewFooter = ActivityEnrichPreviewFooter;
//# sourceMappingURL=EnrichPreviewFooter.js.map