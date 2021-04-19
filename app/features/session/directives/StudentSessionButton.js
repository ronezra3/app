"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StudentSessionButton = /** @class */ (function () {
    /*@ngInject*/
    function StudentSessionButton(StudentSessionService, CurrentSession, $stateParams) {
        this.StudentSessionService = StudentSessionService;
        this.CurrentSession = CurrentSession;
        this.$stateParams = $stateParams;
    }
    StudentSessionButton.prototype.isInSession = function () {
        return this.CurrentSession.isActive();
    };
    StudentSessionButton.prototype.leave = function () {
        return this.StudentSessionService.leave();
    };
    StudentSessionButton.prototype.join = function () {
        return this.StudentSessionService.join(this.$stateParams['classId']);
    };
    return StudentSessionButton;
}());
var StudentSessionButtonComponent = /** @class */ (function () {
    function StudentSessionButtonComponent() {
        this.controller = StudentSessionButton;
        this.template = require('./../templates/student-session-button.html');
    }
    return StudentSessionButtonComponent;
}());
exports.StudentSessionButtonComponent = StudentSessionButtonComponent;
//# sourceMappingURL=StudentSessionButton.js.map