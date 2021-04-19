"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var template = "\n  <activity-header type=\"snapshot\" field=\"$ctrl.activity.question\"></activity-header>\n  <yes-no-donut class=\"narrow\" activity=\"$ctrl.activity\" is-playing=\"$ctrl.isPlaying\"></yes-no-donut>\n";
var SnapshotResultsContent = /** @class */ (function () {
    function SnapshotResultsContent() {
        this.template = template;
        this.bindings = {
            activity: '<',
            isPlaying: '<'
        };
    }
    return SnapshotResultsContent;
}());
exports.SnapshotResultsContent = SnapshotResultsContent;
//# sourceMappingURL=ResultsContent.js.map