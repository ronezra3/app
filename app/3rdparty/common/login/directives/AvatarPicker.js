"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AvatarPickerController = /** @class */ (function () {
    /*@ngInject*/
    function AvatarPickerController(DeviceUtilities) {
        this.isCordova = DeviceUtilities.isCordovaSupported();
    }
    return AvatarPickerController;
}());
var template = "\n  <browser-avatar-picker ng-if=\"!$ctrl.isCordova\" on-avatar-added=\"$ctrl.onAvatarAdded({avatar: avatar})\"\n  avatar-url=\"$ctrl.avatarUrl\"></browser-avatar-picker>\n  <cordova-avatar-picker ng-if=\"$ctrl.isCordova\" on-avatar-added=\"$ctrl.onAvatarAdded({avatar: avatar})\"\n  avatar-url=\"$ctrl.avatarUrl\"></cordova-avatar-picker>\n";
var AvatarPicker = /** @class */ (function () {
    function AvatarPicker() {
        this.controller = AvatarPickerController;
        this.template = template;
        this.bindings = {
            onAvatarAdded: '&',
            avatarUrl: '<'
        };
    }
    return AvatarPicker;
}());
exports.AvatarPicker = AvatarPicker;
//# sourceMappingURL=AvatarPicker.js.map