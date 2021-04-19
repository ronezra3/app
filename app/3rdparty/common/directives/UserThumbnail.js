"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserThumbnailController = /** @class */ (function () {
    /*@ngInject*/
    function UserThumbnailController(Popup, ngDialogRouter, LogOut, CurrentUser, UsersProxy) {
        this.Popup = Popup;
        this.ngDialogRouter = ngDialogRouter;
        this.LogOut = LogOut;
        this.UsersProxy = UsersProxy;
        this.user = CurrentUser.get();
        this.userProxy = new UsersProxy(CurrentUser.get());
    }
    UserThumbnailController.prototype.$onInit = function () {
        this.popup = new this.Popup({ template: require('./../templates/user-menu.html') }, {
            user: this.user,
            openEditProfile: this.openEditProfile.bind(this),
            logout: this.logout.bind(this)
        }, true);
    };
    UserThumbnailController.prototype.toggleUserPopup = function () {
        this.popup.toggle();
    };
    UserThumbnailController.prototype.openEditProfile = function () {
        this.ngDialogRouter.go('editProfile', {});
        this.popup.close();
    };
    UserThumbnailController.prototype.logout = function () {
        var _this = this;
        this.popup.close();
        this.userProxy.$logout().finally(function (res) {
            _this.LogOut.logOut();
        });
    };
    return UserThumbnailController;
}());
var UserThumbnail = /** @class */ (function () {
    function UserThumbnail() {
        this.controller = UserThumbnailController;
        this.template = "<button ng-click=\"$ctrl.toggleUserPopup()\">\n                                  <span>{{$ctrl.user.firstName}}</span>\n                                  <img csp-src=\"{{$ctrl.user.getAvatarUrl(100)}}\"/>\n                              </button>";
    }
    return UserThumbnail;
}());
exports.UserThumbnail = UserThumbnail;
//# sourceMappingURL=UserThumbnail.js.map