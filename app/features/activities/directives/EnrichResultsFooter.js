"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var template = "\n<nav class=\"activity-buttons-nav padded\">\n  <activity-remove-button class=\"secondary\" activity=\"$ctrl.activity\" type=\"{{$ctrl.type}}\"></activity-remove-button>\n  <activity-reset-button class=\"secondary\" activity=\"$ctrl.activity\" type=\"{{$ctrl.type}}\"></activity-reset-button>\n</nav>\n";
var ActivityEnrichResultsFooter = /** @class */ (function () {
    function ActivityEnrichResultsFooter() {
        this.template = template;
        this.bindings = {
            type: '@',
            activity: '<'
        };
    }
    return ActivityEnrichResultsFooter;
}());
exports.ActivityEnrichResultsFooter = ActivityEnrichResultsFooter;
//# sourceMappingURL=EnrichResultsFooter.js.map