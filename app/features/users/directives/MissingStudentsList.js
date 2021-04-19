"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MissingStudentsListController = /** @class */ (function () {
    /*@ngInject*/
    function MissingStudentsListController(lodash, CurrentSession, UsersStore, $stateParams) {
        this.lodash = lodash;
        this.CurrentSession = CurrentSession;
        this.UsersStore = UsersStore;
        this.$stateParams = $stateParams;
    }
    MissingStudentsListController.prototype.$onInit = function () {
        var _this = this;
        this.UsersStore.query({ classId: this.$stateParams['classId'] })
            .then(function (members) { return _this.members = members; });
    };
    MissingStudentsListController.prototype.getMember = function (id) {
        return this.lodash.find(this.members, { id: id });
    };
    MissingStudentsListController.prototype.getMissingStatus = function () {
        return this.CurrentSession.getAttendanceMgr().getMissing();
    };
    return MissingStudentsListController;
}());
var template = "\n<ul class=\"missing-list\">\n  <li ng-repeat=\"missing in $ctrl.getMissingStatus()\">\n    <member-thumbnail member=\"$ctrl.getMember(missing.id)\" is-disabled=\"true\"></member-thumbnail>\n    <span class=\"offline-label\" ng-class=\"{'app-label' : missing.appName}\">{{(missing.appName || 'offline') | translate}}</span>\n  </li>\n</ul>\n";
var MissingStudentsList = /** @class */ (function () {
    function MissingStudentsList() {
        this.controller = MissingStudentsListController;
        this.template = template;
        this.bindings = {
            member: '<',
            onRemove: '&'
        };
    }
    return MissingStudentsList;
}());
exports.MissingStudentsList = MissingStudentsList;
//# sourceMappingURL=MissingStudentsList.js.map