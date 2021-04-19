"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*@ngInject*/
var BrowserAvatarPickerController = /** @class */ (function () {
    function BrowserAvatarPickerController(ValidationHandler) {
        this.ValidationHandler = ValidationHandler;
    }
    BrowserAvatarPickerController.prototype.avatarGetterSetter = function (avatar) {
        if (avatar) {
            if (avatar.type !== 'image/jpeg') {
                return this.ValidationHandler.handle('bad_image_type');
            }
            this.avatar = avatar;
            this.onAvatarAdded({ avatar: avatar });
        }
        return avatar;
    };
    return BrowserAvatarPickerController;
}());
var template = "\n<drop-box ng-model=\"$ctrl.avatarGetterSetter\" ng-model-options=\"{getterSetter: true}\" ngf-accept=\"'image/jpeg'\" ngf-pattern=\"'image/jpeg'\">\n  <div class=\"login-avatar\" ng-click=\"\">\n    <div class=\"image-container\">\n      <svg-icon class=\"image\" src=\"$ctrl.avatar\" ng-if=\"$ctrl.avatar\"></<svg-icon>\n      <img class=\"image\" csp-src=\"{{$ctrl.avatarUrl}}\" ng-if=\"!$ctrl.avatar\">\n    </div>\n  </div>\n</drop-box>\n";
var BrowserAvatarPicker = /** @class */ (function () {
    function BrowserAvatarPicker() {
        this.controller = BrowserAvatarPickerController;
        this.template = template;
        this.bindings = {
            onAvatarAdded: '&',
            avatarUrl: '<'
        };
    }
    return BrowserAvatarPicker;
}());
exports.BrowserAvatarPicker = BrowserAvatarPicker;
//# sourceMappingURL=BrowserAvatarPicker.js.map