"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TeacherTogetherController = /** @class */ (function () {
    /*@ngInject*/
    function TeacherTogetherController(CurrentSession, UsersStore, Localytics, Together, TogetherEventsRouter, Popup, $rootScope, CurrentBook, $state) {
        var _this = this;
        this.CurrentSession = CurrentSession;
        this.UsersStore = UsersStore;
        this.Localytics = Localytics;
        this.Together = Together;
        this.TogetherEventsRouter = TogetherEventsRouter;
        this.Popup = Popup;
        this.$rootScope = $rootScope;
        this.CurrentBook = CurrentBook;
        this.$state = $state;
        this.togetherEnabled = this.Together.isInTogether;
        UsersStore.query({ classId: $state.params['classId'] }).then(function (members) { return _this.members = members; });
    }
    TeacherTogetherController.prototype.$onInit = function () {
        var _this = this;
        this.Together.update();
        var requestingUserId = this.getRequestingUserId();
        if (requestingUserId) {
            this.openPopup(requestingUserId);
        }
        this.$rootScope.$on('sessionEnding', this.close.bind(this));
        this.TogetherEventsRouter.onGranted(this.close.bind(this));
        this.TogetherEventsRouter.onRequestCanceled(this.close.bind(this));
        this.$rootScope.$on('rightSidebarStateChanged', function (event, isOpen) {
            if (isOpen === true) {
                var requestingUserId_1 = _this.getRequestingUserId();
                if (requestingUserId_1) {
                    _this.openPopup(requestingUserId_1);
                }
            }
            else {
                _this.close();
            }
        });
        this.TogetherEventsRouter.onRequested(function (requestingUserId) {
            if (_this.popup) {
                _this.popup.close();
            }
            _this.openPopup(requestingUserId);
        });
    };
    TeacherTogetherController.prototype.$onDestroy = function () {
        if (this.popup) {
            this.popup.close();
        }
    };
    TeacherTogetherController.prototype.toggle = function () {
        // return;
        if (this.Together.isInTogether()) {
            this.Localytics.tagEvent('Together Deactivated');
            this.Together.deactivate();
        }
        else {
            this.Localytics.tagEvent('Together Activated');
            if (this.$state.includes('teach.reader')) {
                this.Together.update(this.$state.params['bookId'], this.CurrentBook.pageUrl);
            }
            else {
                this.Together.update();
            }
        }
    };
    TeacherTogetherController.prototype.getController = function () {
        if (!this.Together.isInTogether()) {
            return;
        }
        if (this.Together.inControl()) {
            return 'with_me';
        }
        var controller = this.Together.getController(this.members);
        if (controller) {
            return controller.getFullName();
        }
    };
    ;
    TeacherTogetherController.prototype.getRequestingUserId = function () {
        var currentSession = this.CurrentSession.getInfo();
        return (currentSession && currentSession.together.requestingUserId) ? currentSession.together.requestingUserId : null;
    };
    TeacherTogetherController.prototype.openPopup = function (requestingUserId) {
        var _this = this;
        this.UsersStore.get(requestingUserId).then(function (user) {
            _this.popup = new _this.Popup({
                template: require('./../templates/together-request-popup.html')
            }, {
                askingStudent: user,
                onAccept: _this.accept.bind(_this),
                onDecline: _this.decline.bind(_this)
            });
            _this.popup.open();
        });
    };
    TeacherTogetherController.prototype.accept = function () {
        this.Localytics.tagEvent('Together Request Approved');
        this.Together.give();
        if (this.popup) {
            this.popup.close();
        }
    };
    TeacherTogetherController.prototype.decline = function () {
        this.Localytics.tagEvent('Together Request Denied');
        this.Together.cancelRequest();
        if (this.popup) {
            this.popup.close();
        }
    };
    TeacherTogetherController.prototype.close = function () {
        if (this.popup) {
            this.popup.close();
        }
    };
    return TeacherTogetherController;
}());
var template = "\n<button ng-click=\"$ctrl.toggle()\" class=\"panel-button {{$ctrl.togetherEnabled() ? 'selected' : ''}}\" ng-disabled=\"true\">\n  <ng-include src=\"'images/panel/icons/together.svg'\"></ng-include>\n  <span class=\"text\">{{ ($ctrl.togetherEnabled() ? $ctrl.getController() : 'together') | translate}}</span>\n</button>\n";
var TeacherTogetherButton = /** @class */ (function () {
    function TeacherTogetherButton() {
        this.template = template;
        this.controller = TeacherTogetherController;
    }
    return TeacherTogetherButton;
}());
exports.TeacherTogetherButton = TeacherTogetherButton;
//# sourceMappingURL=TeacherTogetherButton.js.map