import {MissingStudentsController} from './controllers/MissingStudentsController';
import {MemberThumbnail} from './directives/MemberThumbnail';
import {MissingStudentsList} from './directives/MissingStudentsList';
import {UsersProxy} from './services/UsersProxy';
import {UsersStore} from './services/UsersStore';

export default angular.module('LearniApp.users', [])
  .controller('MissingStudentsController', MissingStudentsController)
  .component('memberThumbnail', new MemberThumbnail())
  .component('missingStudentsList', new MissingStudentsList())
  .factory('UsersProxy', UsersProxy)
  .service('UsersStore', UsersStore).name;
