"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ClassThumbnailDirective_1 = require("./common/ClassThumbnailDirective");
var classes_1 = require("./common/classes");
var dependencies = ['join-class', 'create-class'].map(function (name) { return require("./" + name + "/index").default; });
exports.default = angular.module('LearniApp.classes', dependencies)
    .config(function ($stateProvider) {
    $stateProvider.state('classes', new classes_1.Classes());
})
    .value('ClassesValues', {
    'descriptionMaxLength': 20
})
    .component('classThumbnail', new ClassThumbnailDirective_1.ClassThumbnail()).name;
//# sourceMappingURL=index.js.map