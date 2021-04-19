"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CreateClassCtrl = /** @class */ (function () {
    /*@ngInject*/
    function CreateClassCtrl(ClassesStore, CurrentUser, $state, ngDialogRouter, ClassesValues, $q, $scope) {
        this.ClassesStore = ClassesStore;
        this.$state = $state;
        this.ngDialogRouter = ngDialogRouter;
        this.ClassesValues = ClassesValues;
        this.$q = $q;
        this.classInfo = {};
        this.user = CurrentUser.get();
        this.subjects = $scope['subjects'];
    }
    CreateClassCtrl.prototype.descriptionValidate = function () {
        var isTooLong = (this.classInfo.desc && this.classInfo.desc.length > this.ClassesValues.descriptionMaxLength);
        if (isTooLong) {
            this.classInfo.desc = this.classInfo.desc.slice(0, this.ClassesValues.descriptionMaxLength);
        }
        return isTooLong;
    };
    CreateClassCtrl.prototype.codeValidate = function () {
        var isTooLong = (this.classInfo.code && this.classInfo.code.length > 10);
        if (isTooLong) {
            this.classInfo.code = this.classInfo.code.slice(0, 10);
        }
        return /^[a-z0-9][a-z0-9]*$/i.test(this.classInfo.code);
    };
    CreateClassCtrl.prototype.validate = function () {
        var isValid = angular.isDefined(this.classInfo.subjectId) && angular.isDefined(this.classInfo.code);
        if (!isValid) {
            return 'create_class_illegal_params';
        }
        else if (!this.codeValidate()) {
            return 'bad_class_name_character';
        }
        return null;
    };
    CreateClassCtrl.prototype.create = function () {
        var _this = this;
        return this.ClassesStore.create(this.classInfo, this.user)
            .then(function (_a) {
            var id = _a.id;
            _this.close();
            _this.$state.go('class', { classId: id });
            // .then(() => {});
        })
            .catch(function () { return _this.$q.reject('class_name_exist_error'); });
    };
    CreateClassCtrl.prototype.close = function () {
        this.ngDialogRouter.close('classes.create.class');
    };
    CreateClassCtrl.prototype.changeSubject = function (_a) {
        var subject = _a.subject;
        this.classInfo.subjectId = subject;
    };
    return CreateClassCtrl;
}());
var template = "\n<form class=\"add-class create\">\n  <img src=\"images/add_class.svg\"/>\n  <header>{{'create_class' | translate}}</header>\n  <subject-picker on-change=\"$ctrl.changeSubject($event)\" subjects=\"$ctrl.subjects\"></subject-picker>\n    <input type=\"text\" \n         placeholder=\"{{'class_name' | translate}}\" ng-model=\"$ctrl.classInfo.code\"\n         ng-change=\"$ctrl.codeValidate()\">\n  <input type=\"text\" ng-model=\"$ctrl.classInfo.desc\" ng-change=\"$ctrl.descriptionValidate()\"\n         placeholder=\"{{'create_class_desc' | translate}}\">\n  <footer>\n    <button class=\"secondary action-button\" ng-click=\"$ctrl.close()\" type=\"button\">{{'close' | translate}}</button>\n    <click-once-button class=\"primary action-button\" is-valid=\"$ctrl.validate()\" on-click=\"$ctrl.create()\">\n      <span>{{'create' | translate}}</span>\n      <loader></loader>\n    </click-once-button>\n  </footer>\n</form>\n";
var CreateClassState = /** @class */ (function () {
    function CreateClassState() {
        this.template = template;
        this.controller = CreateClassCtrl;
        this.controllerAs = '$ctrl';
    }
    return CreateClassState;
}());
exports.CreateClassState = CreateClassState;
//# sourceMappingURL=create-class.state.js.map