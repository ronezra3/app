"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ManageInfoController = /** @class */ (function () {
    /*@ngInject*/
    function ManageInfoController(ClassesStore, $state, $q, $rootScope, lodash, ClassesValues, subjects) {
        var _this = this;
        this.ClassesStore = ClassesStore;
        this.$q = $q;
        this.$rootScope = $rootScope;
        this.lodash = lodash;
        this.ClassesValues = ClassesValues;
        this.subjects = subjects;
        ClassesStore.get($state.params['classId']).then(function (classInfo) { return _this.classInfo = classInfo; });
    }
    ManageInfoController.prototype.descriptionValidate = function () {
        var isTooLong = (this.classInfo.desc.length > this.ClassesValues.descriptionMaxLength);
        if (isTooLong) {
            this.classInfo.desc = this.classInfo.desc.slice(0, this.ClassesValues.descriptionMaxLength);
        }
        return isTooLong;
    };
    ManageInfoController.prototype.saveChanges = function () {
        // return this.classInfo.validate()
        //   .then((error) => {
        //     if (error) {
        //       return this.$q.reject(error);
        //     }
        var _this = this;
        return this.ClassesStore.update(this.classInfo)
            .then(function () { return _this.$rootScope.$broadcast('classInfoChanged', _this.lodash.clone(_this.classInfo)); });
        // });
    };
    ManageInfoController.prototype.changeSubject = function (_a) {
        var subject = _a.subject;
        this.classInfo.subjectId = subject;
    };
    return ManageInfoController;
}());
var template = "\n<view class=\"beige-view\">\n  <content class=\"manage-info\" scrollable=\"true\">\n    <div class=\"info-code\">\n      <ng-include src=\"'images/manage/lock_icon.svg'\"></ng-include>\n      <span>{{$ctrl.classInfo.code}}</span>\n    </div>\n    <div class=\"info-share-code\">{{'share_the_code' | translate}}</div>\n\n    <fieldset class=\"info-class-details\">\n      <legend class=\"info-class-details-title\">{{'class_details' | translate}}</legend>\n      <subject-picker model=\"$ctrl.classInfo.subject.id\" subjects=\"$ctrl.subjects\" on-change=\"$ctrl.changeSubject($event)\"></subject-picker>\n      <input type=\"text\" ng-model=\"$ctrl.classInfo.desc\" ng-change=\"$ctrl.descriptionValidate()\"\n             placeholder=\"{{'manage-description-placeholder' | translate}}\"/>\n      <click-once-button class=\"primary action-button\" on-click=\"$ctrl.saveChanges()\" enable-on-success=\"true\">\n        <span>{{'save_changes' | translate}}</span>\n        <loader></loader>\n      </click-once-button>\n    </fieldset>\n  </content>\n</view>\n";
var ManageInfoState = /** @class */ (function () {
    function ManageInfoState() {
        this.url = '/info';
        this.controller = ManageInfoController;
        this.controllerAs = '$ctrl';
        this.template = template;
        this.resolve = {
            /*@ngInject*/
            subjects: function (SubjectsProxy, CurrentUser) { return SubjectsProxy.query({ id: CurrentUser.get().id }).$promise; }
        };
    }
    return ManageInfoState;
}());
exports.ManageInfoState = ManageInfoState;
//# sourceMappingURL=ManageInfoController.js.map