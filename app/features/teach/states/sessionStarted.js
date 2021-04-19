"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SessionStartedController = /** @class */ (function () {
    /*@ngInject*/
    function SessionStartedController($state, classInfo, CurrentSession) {
        this.$state = $state;
        this.classInfo = classInfo;
        this.session = CurrentSession.getInfo();
    }
    SessionStartedController.prototype.next = function () {
        this.$state.go('teach.books', { classId: this.classInfo.id }, { replace: true });
    };
    return SessionStartedController;
}());
var template = "\n<view class=\"gray-view flex-view session-started\" hardware-back-button-enabled=\"false\">\n  <navigation-bar>\n    <nav-bar-title>\n      <class-header-title class-info=\"$ctrl.classInfo\" show-details=\"true\"></class-header-title>\n\n      <div class=\"extended-title\">\n        <ng-include class=\"clock\" src=\"'images/manage/lock_icon.svg'\"></ng-include>\n        <span>{{ $ctrl.classInfo.code.toUpperCase()}}</span>\n      </div>\n    </nav-bar-title>\n  </navigation-bar>\n  <content class=\"padded\">\n    <div>\n      <h2 class=\"main-title\">{{ 'session_started' | translate }}</h2>\n      <div class=\"instructions\">\n        <span>{{'instruct_students_join' | translate}}</span>\n        <span class=\"join-button\">\n          <span class=\"session-clock\" ng-include=\"'images/panel/icons/session-clock.svg'\"></span>\n          <span>{{ 'join_session' | translate }}</span>\n        </span>\n        <span>{{'instruct_students_join_button' | translate}}.</span>\n      </div>\n      <attendance-stats class-id=\"$ctrl.classInfo.id\"></attendance-stats>\n      <button class=\"full-attendance\" ui-sref=\"attendance({classId: $ctrl.classInfo.id, sessionId: $ctrl.session.id})\"\n              ng-click=\"\">\n        <div class=\"person\">\n          <div class=\"head\"></div>\n          <div class=\"body\"></div>\n        </div>\n        <span>{{\"full_attendance\" | translate}}</span>\n      </button>\n    </div>\n  </content>\n  <nav class=\"activity-buttons-nav narrow padded\">\n    <start-session-button next=\"$ctrl.next()\" class=\"primary\"></start-session-button>\n  </nav>\n</view>\n";
var SessionStartedState = /** @class */ (function () {
    function SessionStartedState() {
        this.controller = SessionStartedController;
        this.controllerAs = '$ctrl';
        this.url = '/:classId/sessionStarted';
        this.template = template;
        this.resolve = {
            /*@ngInject*/
            classInfo: function (ClassesStore, $stateParams) { return ClassesStore.get($stateParams['classId']); }
        };
    }
    return SessionStartedState;
}());
exports.SessionStartedState = SessionStartedState;
//# sourceMappingURL=sessionStarted.js.map