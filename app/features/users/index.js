"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MissingStudentsController_1 = require("./controllers/MissingStudentsController");
var MemberThumbnail_1 = require("./directives/MemberThumbnail");
var MissingStudentsList_1 = require("./directives/MissingStudentsList");
var UsersProxy_1 = require("./services/UsersProxy");
var UsersStore_1 = require("./services/UsersStore");
exports.default = angular.module('LearniApp.users', [])
    .controller('MissingStudentsController', MissingStudentsController_1.MissingStudentsController)
    .component('memberThumbnail', new MemberThumbnail_1.MemberThumbnail())
    .component('missingStudentsList', new MissingStudentsList_1.MissingStudentsList())
    .factory('UsersProxy', UsersProxy_1.UsersProxy)
    .service('UsersStore', UsersStore_1.UsersStore).name;
//# sourceMappingURL=index.js.map