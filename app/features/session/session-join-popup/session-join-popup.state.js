"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SessionJoinPopupController = /** @class */ (function () {
    /*@ngInject*/
    function SessionJoinPopupController($scope, $state, StudentSessionService) {
        this.$state = $state;
        this.StudentSessionService = StudentSessionService;
        this.classInfo = $scope['classInfo'];
        this.teacher = $scope['teacher'];
        this.closeThisDialog = $scope['closeThisDialog'];
        this.createdAt = $scope['session'].createdAt;
    }
    SessionJoinPopupController.prototype.join = function () {
        var _this = this;
        return this.$state.go('learn.books', { classId: this.classInfo.id })
            .then(function () { return _this.StudentSessionService.join(_this.classInfo.id); })
            .then(function () { return _this.closeThisDialog(); });
    };
    return SessionJoinPopupController;
}());
var template = "\n<div class=\"wrapper\">\n  <header>\n    <h3>{{'join-session-popup-title' | translate}}</h3>\n  </header>\n  <article>\n    <span>{{$ctrl.classInfo.subject.name | translate}} {{'with' | translate}} {{$ctrl.teacher.getFullName()}}</span>\n    <div>\n      <img src=\"images/session-join-popup/rhino.svg\">\n      <div>\n        <span class=\"time\">\n          {{'started' | translate}} <span am-time-ago=\"$ctrl.createdAt\"></span>\n        </span> \n        <nav class=\"activity-buttons-nav\">\n          <join-session-button class=\"primary\" join=\"$ctrl.join()\"></join-session-button> \n        </nav>\n      </div>\n    </div>\n  </article>\n</div>\n";
var SessionJoinPopupState = /** @class */ (function () {
    function SessionJoinPopupState() {
        this.template = template;
        this.controller = SessionJoinPopupController;
        this.controllerAs = '$ctrl';
        this.appendClassName = 'new session-join-popup';
        this.showClose = true;
    }
    return SessionJoinPopupState;
}());
exports.SessionJoinPopupState = SessionJoinPopupState;
//# sourceMappingURL=session-join-popup.state.js.map