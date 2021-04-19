"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ManageController = /** @class */ (function () {
    /*@ngInject*/
    function ManageController($rootScope, $state, ngDialogRouter, CurrentUser, ClassesStore) {
        var _this = this;
        this.$state = $state;
        this.ngDialogRouter = ngDialogRouter;
        this.CurrentUser = CurrentUser;
        this.ClassesStore = ClassesStore;
        ClassesStore.get($state.params['classId'])
            .then(function (classInfo) { return _this.classInfo = classInfo; });
        $rootScope.$on('classInfoChanged', function (event, newClassInfo) { return _this.classInfo = newClassInfo; });
    }
    ManageController.prototype.deleteClass = function () {
        var _this = this;
        this.ngDialogRouter.go('are-you-sure', {
            yes: function () {
                return _this.ClassesStore.delete(_this.classInfo)
                    .then(function () { return _this.$state.back(false, 2); });
            },
            message: 'are_you_sure_delete_class',
        }, null, { appendClassName: 'manage' });
    };
    return ManageController;
}());
var template = "\n<view class=\"gray-view flex-view\">\n  <navigation-bar>\n    <left-buttons>\n      <back-button></back-button>\n    </left-buttons>\n    <nav-bar-title>\n      <class-header-title class-info=\"$ctrl.classInfo\" show-details=\"true\"></class-header-title>\n    </nav-bar-title>\n    <right-buttons>\n      <button class=\"delete-class-button\" ng-click=\"$ctrl.deleteClass()\">\n        <ng-include src=\"'images/manage/trash.svg'\"></ng-include>\n        <span>{{'delete_class' | translate}}</span>\n      </button>\n    </right-buttons>\n  </navigation-bar>\n\n  <content>\n    <ui-view></ui-view>\n  </content>\n\n  <nav class=\"manage-tabs\">\n    <manage-tab-button type=\"{{'info'}}\"></manage-tab-button>\n  </nav>\n</view>\n";
// <manage-tab-button type="{{'books'}}"></manage-tab-button>
// <manage-tab-button type="{{'students'}}"></manage-tab-button>
var ManageState = /** @class */ (function () {
    function ManageState() {
        this.url = '/manage/:classId';
        this.abstract = true;
        this.controller = ManageController;
        this.controllerAs = '$ctrl';
        this.bindToController = true;
        this.template = template;
    }
    return ManageState;
}());
exports.ManageState = ManageState;
//# sourceMappingURL=ManageController.js.map