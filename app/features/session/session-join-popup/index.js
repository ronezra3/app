"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var session_join_popup_state_1 = require("./session-join-popup.state");
var session_join_popup_service_1 = require("./session-join-popup.service");
exports.default = angular.module('LearniApp.session-join-popup', [])
    /*@ngInject*/
    .config(function (ngDialogRouterProvider) {
    ngDialogRouterProvider.state('session.join-popup', new session_join_popup_state_1.SessionJoinPopupState());
})
    .service('SessionJoinPopupService', session_join_popup_service_1.SessionJoinPopupService)
    /*@ngInject*/
    .run(function (SessionJoinPopupService, CurrentUser) {
    return CurrentUser.onLoad(function (user) {
        if (!user.isTeacher) {
            // SessionJoinPopupService.openActive();
        }
    });
}).name;
//# sourceMappingURL=index.js.map