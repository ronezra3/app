"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SessionReportBookLocation = /** @class */ (function () {
    /*@ngInject*/
    function SessionReportBookLocation(lodash) {
        this.lodash = lodash;
    }
    SessionReportBookLocation.prototype.$onInit = function () {
        if (this.book.type !== 'html' && this.pages.length) {
            this.minPage = this.lodash.min(this.pages);
            this.maxPage = this.lodash.max(this.pages);
        }
    };
    return SessionReportBookLocation;
}());
var SessionReportBookLocationComponent = /** @class */ (function () {
    function SessionReportBookLocationComponent() {
        this.bindings = {
            pages: '<',
            book: '<'
        };
        this.controller = SessionReportBookLocation;
        this.controllerAs = 'ctrl';
        this.template = require('./../templates/sessionReportBookLocation.html');
    }
    return SessionReportBookLocationComponent;
}());
exports.SessionReportBookLocationComponent = SessionReportBookLocationComponent;
//# sourceMappingURL=SessionReportBookLocationDirective.js.map