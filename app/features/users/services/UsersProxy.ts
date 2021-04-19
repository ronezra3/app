/*@ngInject*/
export function UsersProxy($resource, ENV) {
  var baseUrl = ENV.lmsEndpoint + '/users/:id';
  let avatarId;


  var UserResource = $resource(baseUrl, { id: '@id' }, {
    login: {
      method: 'POST',
      url: baseUrl + '/login'
    },
    loginSSO: {
      method: 'POST',
      url: baseUrl + '/login-sso',
      params: { isTeacher: '@isTeacher' },
      withCredentials: true
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
    if (typeof(avatarId) == 'undefined') return false;
    return Boolean(avatarId.length > 2)
  }

  UserResource.prototype.getAvatarUrl = function (w = 'auto') {
    let avatarPath = 'images/avatars/';

    if (ENV.isOffline) {
      avatarPath = 'images/avatars/'
    }

    return avatarPath + this.avatarId + '.png';
  };

  return UserResource;
}
