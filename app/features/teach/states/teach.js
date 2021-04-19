"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var template = "\n<side-bars class=\"gray-view\">\n  <side-bars-content>\n    <ui-view></ui-view>\n  </side-bars-content>\n\n  <right-side-bar>\n    <teacher-panel></teacher-panel>\n  </right-side-bar>\n</side-bars>\n";
var TeachState = /** @class */ (function () {
    function TeachState() {
        this.abstract = true;
        this.url = '/teach/:classId';
        this.template = template;
    }
    return TeachState;
}());
exports.TeachState = TeachState;
//# sourceMappingURL=teach.js.map