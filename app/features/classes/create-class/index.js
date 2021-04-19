"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var create_class_state_1 = require("./create-class.state");
var create_class_thumbnail_component_1 = require("./create-class-thumbnail.component");
exports.default = angular.module('LearniApp.create-class', [])
    /*@ngInject*/
    .config(function (ngDialogRouterProvider) {
    ngDialogRouterProvider.state('classes.create.class', new create_class_state_1.CreateClassState());
})
    .component('createClassThumbnail', new create_class_thumbnail_component_1.CreateClassThumbnail()).name;
//# sourceMappingURL=index.js.map