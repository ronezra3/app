"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RequestedController_1 = require("./controllers/RequestedController");
var TeacherTogetherButton_1 = require("./directives/TeacherTogetherButton");
var StudentTogetherButton_1 = require("./directives/StudentTogetherButton");
var TogetherEventsRouter_1 = require("./services/TogetherEventsRouter");
var TogetherFactory_1 = require("./services/TogetherFactory");
exports.default = angular.module('LearniApp.together', [])
    .controller('RequestedController', RequestedController_1.RequestedController)
    .component('teacherTogetherButton', new TeacherTogetherButton_1.TeacherTogetherButton())
    .component('studentTogetherButton', new StudentTogetherButton_1.StudentTogetherButton())
    .service('TogetherEventsRouter', TogetherEventsRouter_1.TogetherEventsRouter)
    .factory('Together', TogetherFactory_1.Together).name;
//# sourceMappingURL=index.js.map