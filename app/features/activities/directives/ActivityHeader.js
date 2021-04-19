"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var template = "\n<header class=\"activity-header narrow\">\n  <h1 ng-transclude>{{$ctrl.field || ('default-' + $ctrl.type + '-title' | translate)}}</h1>\n</header>\n";
//<ng-include class="icon" src="'images/panel/icons/' + $ctrl.type + '.svg'"></ng-include>
var ActivityHeader = /** @class */ (function () {
    function ActivityHeader() {
        this.template = template;
        this.transclude = true;
        this.bindings = {
            type: '@',
            field: '<'
        };
    }
    return ActivityHeader;
}());
exports.ActivityHeader = ActivityHeader;
//# sourceMappingURL=ActivityHeader.js.map