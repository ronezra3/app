"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*@ngInject*/
var AvatarUploader = /** @class */ (function () {
    function AvatarUploader(EnvWrapper, Upload, Utilities, $q) {
        this.EnvWrapper = EnvWrapper;
        this.Upload = Upload;
        this.Utilities = Utilities;
        this.$q = $q;
    }
    AvatarUploader.prototype.upload = function (avatar) {
        return this.fromFile(avatar);
        // if (this.isString(avatar)) {
        //   let resizedAvatar = avatar;// this.Utilities.imgResize(`data:image/jpeg;base64,${avatar}`, 512, 512, 'image/jpeg');
        //   return this.fromFile(resizedAvatar);
        // }
        // let deferred = this.$q.defer();
        // let reader = new FileReader();
        // reader.readAsDataURL(avatar);
        // reader.addEventListener('load', () => {
        //   let resizedAvatar = this.Utilities.imgResize(reader.result, 512, 512, 'image/jpeg');
        //   this.fromFile(resizedAvatar).then(deferred.resolve).catch(deferred.reject);
        // });
        // return deferred.promise;
    };
    AvatarUploader.prototype.fromFile = function (file) {
        return this.Upload.upload({ url: this.EnvWrapper.getLmsEndpoint() + "/avatars", method: 'POST', file: file });
    };
    AvatarUploader.prototype.isString = function (avatar) {
        return typeof avatar === 'string' || avatar instanceof String;
    };
    return AvatarUploader;
}());
exports.AvatarUploader = AvatarUploader;
//# sourceMappingURL=AvatarUploader.js.map