"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TeachResultsFooter_1 = require("../../activities/directives/TeachResultsFooter");
var template = "\n<nav class=\"activity-buttons-nav padded\">\n  <activity-reset-button class=\"secondary\" activity=\"$ctrl.activity\" type=\"{{$ctrl.type}}\" should-end=\"$ctrl.isPlaying\"></activity-reset-button>\n  <activity-end-button class=\"primary\" ng-show=\"$ctrl.isPlaying\" type=\"{{$ctrl.type}}\" activity=\"$ctrl.activity\"\n                     pre-end-callback=\"$ctrl.updateAttendance()\"></activity-end-button>\n</nav>\n";
var UrlTeachResultsFooter = /** @class */ (function () {
    function UrlTeachResultsFooter() {
        this.controller = TeachResultsFooter_1.ActivityTeachResultsFooterController;
        this.template = template;
        this.bindings = {
            type: '@',
            activity: '<',
            isPlaying: '<',
        };
    }
    return UrlTeachResultsFooter;
}());
exports.UrlTeachResultsFooter = UrlTeachResultsFooter;
//# sourceMappingURL=TeachResultsFooter.js.map