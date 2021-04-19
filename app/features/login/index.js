"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var login_1 = require("./states/login");
var signin_1 = require("./states/signin");
var teacher_login_1 = require("./states/teacher_login");
var background_1 = require("./components/background");
var register_1 = require("./states/register");
var stateChanged_service_1 = require("./stateChanged.service");
exports.default = angular.module('LearniApp.login', [])
    .config(function ($stateProvider) {
    $stateProvider
        .state('login', new login_1.LoginState())
        .state('login.signin', new signin_1.SigninState())
        .state('login.register', new register_1.RegisterState())
        .state('login.teacher_login', new teacher_login_1.TeacherLoginState());
})
    .run(function ($state, LogOut, LoginStateChangedService, StateChangedService) {
    LogOut.onLoggedOut(function () { return $state.go('login.signin', null, { replace: true }); });
    StateChangedService.onStateChange(LoginStateChangedService.stateChangeStart);
})
    .service('LoginStateChangedService', stateChanged_service_1.LoginStateChangedService)
    .component('loginBackground', new background_1.LoginBackground()).name;
//# sourceMappingURL=index.js.map