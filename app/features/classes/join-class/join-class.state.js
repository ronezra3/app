"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var JoinClassCtrl = /** @class */ (function () {
    /*@ngInject*/
    function JoinClassCtrl(ClassesStore, CurrentUser, ngDialogRouter, SessionProxy, $state, $q, SessionJoinPopupService, StudentSessionService) {
        this.ClassesStore = ClassesStore;
        this.CurrentUser = CurrentUser;
        this.ngDialogRouter = ngDialogRouter;
        this.SessionProxy = SessionProxy;
        this.$state = $state;
        this.$q = $q;
        this.SessionJoinPopupService = SessionJoinPopupService;
        this.StudentSessionService = StudentSessionService;
    }
    JoinClassCtrl.prototype.join = function () {
        var _this = this;
        return this.ClassesStore.join(this.code, this.CurrentUser.get())
            .then(function (_a) {
            var id = _a.id;
            _this.closeAfterFinish();
            _this.$state.go('learn.books', { classId: id })
                .then(function () { return _this.StudentSessionService.join(id); });
            // .then(() => this.joinSessionPopupHandler(id));
        })
            .catch(function () { return _this.$q.reject('join_class_error'); });
    };
    JoinClassCtrl.prototype.validate = function () {
        if (!this.code) {
            return 'join_class_empty_code';
        }
        return null;
    };
    JoinClassCtrl.prototype.closeAfterFinish = function () {
        this.ngDialogRouter.close('classes.join.class');
    };
    JoinClassCtrl.prototype.joinSessionPopupHandler = function (classId) {
        var _this = this;
        this.SessionProxy.getCurrent(classId).then(function (activeSession) { return _this.SessionJoinPopupService.open(activeSession); });
    };
    return JoinClassCtrl;
}());
var template = "\n<form class=\"add-class join\">\n  <img src=\"images/add_class.svg\"/>\n  <header>\n    <div>{{'join_class' | translate}}</div>\n    <div class=\"sub-header\">{{'enter_digits' | translate}}</div>\n  </header>\n  <input type=\"text\" ng-model=\"$ctrl.code\" placeholder=\"\u2022 \u2022 \u2022 \u2022 \u2022\"/>\n  <footer>\n    <click-once-button class=\"primary action-button\" on-click=\"$ctrl.join()\" is-valid=\"$ctrl.validate()\">\n      <span>{{'join' | translate}}</span>\n      <loader></loader>\n    </click-once-button>\n  </footer>\n</form>\n";
// <button class="secondary action-button" ng-click="$ctrl.close()" type="button">{{'close' | translate}}</button>
var JoinClassState = /** @class */ (function () {
    function JoinClassState() {
        this.template = template;
        this.controller = JoinClassCtrl;
        this.controllerAs = '$ctrl';
    }
    return JoinClassState;
}());
exports.JoinClassState = JoinClassState;
//# sourceMappingURL=join-class.state.js.map