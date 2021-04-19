"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var join_class_state_1 = require("./join-class.state");
var JoinClassThumbnailDirective_1 = require("./JoinClassThumbnailDirective");
exports.default = angular.module('LearniApp.join-class', [])
    /*@ngInject*/
    .config(function (ngDialogRouterProvider) {
    ngDialogRouterProvider.state('classes.join.class', new join_class_state_1.JoinClassState());
})
    .component('joinClassThumbnail', new JoinClassThumbnailDirective_1.JoinClassThumbnail()).name;
//# sourceMappingURL=index.js.map