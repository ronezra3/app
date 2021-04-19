"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PlanReaderController = /** @class */ (function () {
    /*@ngInject*/
    function PlanReaderController(ENV) {
        this.ENV = ENV;
        this.activities = this.ENV.teacher.activities;
    }
    return PlanReaderController;
}());
var template = "\n<side-bars class=\"plan\">\n  <side-bars-content>\n    <ui-view></ui-view>\n  </side-bars-content>\n\n  <right-side-bar>\n    <panel>\n      <panel-content>\n        <activities-section activities=\"$ctrl.activities\" mode=\"enrich\"></activities-section>\n      </panel-content>\n    </panel>\n  </right-side-bar>\n</side-bars>\n";
var PlanReaderState = /** @class */ (function () {
    function PlanReaderState() {
        this.controller = PlanReaderController;
        this.url = '/reader/:bookId';
        this.template = template;
        this.abstract = true;
        this.controllerAs = '$ctrl';
    }
    return PlanReaderState;
}());
exports.PlanReaderState = PlanReaderState;
//# sourceMappingURL=plan.reader.js.map