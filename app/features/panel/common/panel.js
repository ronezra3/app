"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var template = "\n<side-bar>\n  <header ng-transclude=\"header\"></header>\n  <article ng-transclude=\"content\"></article>\n</side-bar>\n";
var Panel = /** @class */ (function () {
    function Panel() {
        this.template = template;
        this.transclude = {
            header: '?panelHeader',
            content: 'panelContent'
        };
    }
    return Panel;
}());
exports.Panel = Panel;
//# sourceMappingURL=panel.js.map