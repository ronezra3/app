"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var template = "\n<view class=\"gray-view\">\n  <ui-view></ui-view>\n</view>\n";
var PlanState = /** @class */ (function () {
    function PlanState() {
        this.abstract = true;
        this.url = '/enrich/:classId';
        this.template = template;
    }
    return PlanState;
}());
exports.PlanState = PlanState;
//# sourceMappingURL=plan.js.map