"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EditProfileController = /** @class */ (function () {
    /*@ngInject*/
    function EditProfileController(CurrentUser, ngDialogRouter, UsersProxy, Registrar, validateUserPassword, $q) {
        this.CurrentUser = CurrentUser;
        this.ngDialogRouter = ngDialogRouter;
        this.Registrar = Registrar;
        this.validateUserPassword = validateUserPassword;
        this.$q = $q;
        this.user = new UsersProxy(CurrentUser.get());
    }
    EditProfileController.prototype.onAvatarAdded = function (avatar) {
        this.selectedAvatar = avatar;
    };
    //
    EditProfileController.prototype.validate = function () {
        if (!(this.user.firstName && this.user.lastName)) {
            return 'missing_register_details';
        }
        var isChangingPassword = Boolean(this.user.oldPassword || this.user.newPassword || this.user.confirmedPassword);
        if (isChangingPassword) {
            var allPasswordFieldsPresent = this.user.oldPassword && this.user.newPassword && this.user.confirmedPassword;
            if (!allPasswordFieldsPresent) {
                return 'missing_register_details';
            }
            var passwordValidationError = this.validateUserPassword(this.user.newPassword, this.user.confirmedPassword);
            if (passwordValidationError) {
                return passwordValidationError;
            }
        }
        return null;
    };
    EditProfileController.prototype.save = function () {
        var _this = this;
        if (!this.user.oldPassword) {
            return this.updateUser();
        }
        return this.user.$confirmPassword()
            .then(function (confirmation) { return confirmation['isOldPasswordConfirmed'] ? _this.updateUser() : _this.$q.reject('not_old_password'); });
    };
    EditProfileController.prototype.close = function () {
        this.ngDialogRouter.close('editProfile');
    };
    EditProfileController.prototype.updateUser = function () {
        var _this = this;
        return this.Registrar.update(this.user, this.selectedAvatar)
            .then(function () { return _this.close(); });
    };
    return EditProfileController;
}());
exports.EditProfileController = EditProfileController;
//# sourceMappingURL=EditProfileController.js.map