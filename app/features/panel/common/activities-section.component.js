"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var template = "\n<ul class=\"panel-section\">\n  <li ng-repeat=\"(activity, stages) in $ctrl.activities\">\n    <activity-button type=\"{{activity}}\" mode=\"{{$ctrl.mode}}\"></activity-button>\n  </li>\n</ul>\n";
var ActivitiesSection = /** @class */ (function () {
    function ActivitiesSection() {
        this.template = template;
        this.bindings = {
            activities: '<',
            mode: '@'
        };
    }
    return ActivitiesSection;
}());
exports.ActivitiesSection = ActivitiesSection;
//# sourceMappingURL=activities-section.component.js.map