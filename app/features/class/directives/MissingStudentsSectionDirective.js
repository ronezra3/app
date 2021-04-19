"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MAX_POPUP_CAPACITY = 9;
var MissingStudentsSectionController = /** @class */ (function () {
    /*@ngInject*/
    function MissingStudentsSectionController($rootScope, $state, Popup, MatchMediaWrapper, CurrentSession, Localytics) {
        var _this = this;
        this.$state = $state;
        this.MatchMediaWrapper = MatchMediaWrapper;
        this.Localytics = Localytics;
        this.attendanceManager = CurrentSession.getAttendanceMgr();
        this.popup = new Popup({ template: require('./../templates/MissingStudentsPopover.html') }, { appendClass: this.appendClass });
        this.attendanceManager.onMissingMembersChanged(function () { return _this.missingMembersChanged(); });
        $rootScope.$on('rightSidebarStateChanged', function (event, isOpen) {
            if (isOpen === false) {
                _this.popup.close();
            }
        });
        CurrentSession.onEnding(function () {
            _this.missingStudentsChanged = false;
            _this.popup.close();
        });
    }
    MissingStudentsSectionController.prototype.$onInit = function () {
        this.updateMissingCount();
    };
    MissingStudentsSectionController.prototype.isOpen = function () {
        return this.popup.isOpen();
    };
    MissingStudentsSectionController.prototype.onClick = function () {
        this.missingStudentsChanged = false;
        if (this.shouldOpenInFullScreen()) {
            this.reportLeftSessionOpened();
            this.$state.go('missing', {
                classId: this.$state.params['classId']
            });
        }
        else {
            if (!this.popup.isOpen()) {
                this.Localytics.tagScreen('missing');
                this.reportLeftSessionOpened();
            }
            this.popup.toggle();
        }
    };
    ;
    MissingStudentsSectionController.prototype.$onDestroy = function () {
        this.popup.close();
    };
    MissingStudentsSectionController.prototype.updateMissingCount = function () {
        this.missingCount = this.attendanceManager.getMissingCount();
    };
    MissingStudentsSectionController.prototype.shouldOpenInFullScreen = function () {
        return this.missingCount > MAX_POPUP_CAPACITY
            || this.MatchMediaWrapper.isMiniTabletOrSmaller() || this.MatchMediaWrapper.isPortrait();
    };
    MissingStudentsSectionController.prototype.missingMembersChanged = function () {
        this.missingStudentsChanged = true;
        this.updateMissingCount();
        if (this.isOpen()) {
            if (this.shouldOpenInFullScreen()) {
                this.popup.close();
                this.$state.go('missing', {
                    classId: this.$state.params['classId']
                });
            }
            else if (this.missingCount === 0) {
                this.popup.close();
            }
        }
    };
    MissingStudentsSectionController.prototype.reportLeftSessionOpened = function () {
        this.Localytics.tagEvent('Left Session Opened', { missingCount: this.missingCount });
    };
    return MissingStudentsSectionController;
}());
var template = "\n<button ng-disabled=\"!$ctrl.missingCount\"\n    class=\"{{$ctrl.appendClass}}\"\n    ng-class=\"{selected: $ctrl.isOpen(), notification: $ctrl.missingStudentsChanged && ($ctrl.missingCount > 0)}\"\n    ng-click=\"$ctrl.onClick()\">\n  <ng-transclude></ng-transclude>\n  <span class=\"number-icon\">{{$ctrl.missingCount || 0}}</span>\n  <span class=\"text\">{{'left_session' | translate}}</span>\n</button>\n";
var MissingStudentsSection = /** @class */ (function () {
    function MissingStudentsSection() {
        this.template = template;
        this.controller = MissingStudentsSectionController;
        this.transclude = true;
        this.bindings = {
            appendClass: '@'
        };
    }
    return MissingStudentsSection;
}());
exports.MissingStudentsSection = MissingStudentsSection;
//# sourceMappingURL=MissingStudentsSectionDirective.js.map