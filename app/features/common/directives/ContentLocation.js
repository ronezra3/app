"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var template = "\n\n";
// <ng-include class="page-number-icon" src="'images/page_icon.svg'"></ng-include>
// <span class="page-number-label">{{'page' | translate}} {{$ctrl.current}}</span>
var ContentLocation = /** @class */ (function () {
    function ContentLocation() {
        this.template = template;
        this.bindings = {
            current: '@'
        };
    }
    return ContentLocation;
}());
exports.ContentLocation = ContentLocation;
//# sourceMappingURL=ContentLocation.js.map