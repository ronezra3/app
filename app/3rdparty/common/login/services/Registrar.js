"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Registrar = /** @class */ (function () {
    /*@ngInject*/
    function Registrar(AvatarUploader, $q, Localytics, CurrentUser, AuthenticationToken) {
        this.AvatarUploader = AvatarUploader;
        this.$q = $q;
        this.Localytics = Localytics;
        this.CurrentUser = CurrentUser;
        this.AuthenticationToken = AuthenticationToken;
    }
    Registrar.prototype.register = function (avatar, user) {
        var _this = this;
        return this.uploadAvatar(avatar)
            .then(function (_a) {
            var public_id = _a.data.public_id;
            return _this.registerUser(user, public_id);
        });
    };
    Registrar.prototype.update = function (modifiedUser, avatar) {
        var _this = this;
        if (!avatar) {
            return this.updateUser(modifiedUser);
        }
        return this.uploadAvatar(avatar)
            .then(function (_a) {
            var public_id = _a.data.public_id;
            modifiedUser.avatarId = public_id;
            return _this.updateUser(modifiedUser);
        });
    };
    Registrar.prototype.uploadAvatar = function (avatar) {
        var _this = this;
        return this.AvatarUploader.upload(avatar)
            .then(function (uploadedAvatar) {
            // TODO: check if user.$save returned an error and cache uploadedAvatar
            if (uploadedAvatar.status !== 200) {
                // TODO: handle this more gracefully (let users upload avatar later...)
                return _this.$q.reject('cannot_upload_avatar');
            }
            return uploadedAvatar;
        });
    };
    Registrar.prototype.updateUser = function (modified) {
        var _this = this;
        return modified.$save()
            .then(function (user) {
            var currentUser = _this.CurrentUser.get();
            angular.extend(currentUser, user);
            _this.CurrentUser.set(currentUser);
        });
    };
    Registrar.prototype.registerUser = function (user, avatarPublicId) {
        var _this = this;
        user.userName = user.userName.toLowerCase();
        user.avatarId = avatarPublicId;
        return user.$save()
            .then(function (user) {
            _this.Localytics.tagEvent('User Registered');
            _this.CurrentUser.set(user);
            _this.AuthenticationToken.set(user.token);
        })
            .catch(function (exception) {
            switch (exception.status) {
                case 406:
                    return;
                case 409:
                    return _this.$q.reject('user_already_exists');
                default:
                    return _this.$q.reject('backand_generic_error');
            }
        });
    };
    return Registrar;
}());
exports.Registrar = Registrar;
//# sourceMappingURL=Registrar.js.map