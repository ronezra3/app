/*@ngInject*/
export function ClassesProxy($resource, ENV, UsersStore, CurrentUser, BooksStore, lodash, $q) {
  var baseUrl = ENV.lmsEndpoint + '/classes/:id';
  var baseUrlActivities = ENV.apiEndpoint + '/bookActivities';

  var ClassesResource = $resource(baseUrl, {id: '@id'}, {
    query: {method: 'GET', params: {type: '@type', userId: '@userId'}, isArray: true},
    create: {method: 'POST', params: {classInfo: '@classInfo', userId: '@userId'}},
    duplicate: {method: 'POST', params: {classInfo: '@classInfo', userId: '@userId', srcClassId: '@srcClassId'}, url: baseUrlActivities + '/duplicate'},
    join: {method: 'POST', params: {code: '@code', userId: '@userId'}, url: baseUrl + '/join'}
  });

  ClassesResource.classTypes = {
    'studying': 'studying',
    'teaching': 'teaching'
  };

  ClassesResource.prototype.isTeacherDefined = function () {
    return this['teachers'] && this['teachers'][0];
  };

  ClassesResource.prototype.isTeacher = function (user) {
    if (angular.isUndefined(user)) {
      user = CurrentUser.get();
    }

    return this.isTeacherDefined() && this['teachers'][0].id === user.id;
  };

  ClassesResource.prototype.getTeacher = function () {
    if (this.isTeacherDefined()) {
      return UsersStore.get(this['teachers'][0].id);
    }

    return $q.reject('There is no teacher defined for the class');
  };

  ClassesResource.prototype.validate = function () {
    var self = this;

    return BooksStore.query({classId: self.id}).then(function (books) {
      var isSubjectInvalid = lodash.some(books, function (book) {
        return book.subjectId !== self.subject.id;
      });

      if (isSubjectInvalid) {
        return 'cannot_change_subject';
      }

      return null;
    });
  };

  return ClassesResource;
}
