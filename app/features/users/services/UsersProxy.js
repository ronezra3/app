"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*@ngInject*/
function UsersProxy($resource, ENV) {
    var baseUrl = ENV.lmsEndpoint + '/users/:id';
    var avatarId;
    var UserResource = $resource(baseUrl, { id: '@id' }, {
        login: {
            method: 'POST',
            url: baseUrl + '/login'
        },
        logout: {
            method: 'POST',
            url: baseUrl + '/logout'
        },
        register: {
            method: 'POST',
            url: baseUrl + '/register'
        },
        confirmPassword: {
            method: 'POST',
            url: baseUrl + '/confirmPassword'
        },
        query: {
            method: 'GET',
            isArray: true,
            params: { classId: '@classId' }
        },
        getSchool: {
            method: 'GET',
            url: baseUrl + '/school'
        },
        removeFromClass: {
            method: 'POST',
            url: baseUrl + '/removeFromClass',
            params: { classId: '@classId' }
        },
        resetPassword: {
            method: 'POST',
            url: baseUrl + '/resetPassword'
        }
    });
    UserResource.prototype.getFullName = function () {
        return ((this['firstName'] || '') + ' ' + (this['lastName'] || '')).toString().trim();
    };
    function isCloudinaryId(avatarId) {
        return Boolean(avatarId.length > 2);
    }
    UserResource.prototype.getAvatarUrl = function (w) {
        if (w === void 0) { w = 'auto'; }
        var avatarPath = isCloudinaryId(this.avatarId) ?
            "" + ENV.cloudinaryApi + ENV.cloudinaryCloudName + "/image/upload/w_" + w + ",dpr_auto/" :
            'images/avatars/';
        return avatarPath + this.avatarId + '.png';
    };
    return UserResource;
}
exports.UsersProxy = UsersProxy;
//# sourceMappingURL=UsersProxy.js.map