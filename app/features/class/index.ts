import {ClassController} from './controllers/ClassController';
import {ClassHeaderTitle} from './directives/ClassHeaderTitleDirective';
import {ClassMenuItem} from './directives/ClassMenuItemDirective';
import {MissingStudentsSection} from './directives/MissingStudentsSectionDirective';
import {SessionReportsButton} from './directives/SessionReportsButtonDirective';
import {ClassesProxy} from './services/ClassesProxy';
import {ClassesStore} from './services/ClassesStore';
import {SessionEvents} from './services/SessionEventsFactory';
import {SubjectsProxy} from './services/SubjectsProxy';

export default angular.module('LearniApp.class', [])
  .controller('ClassController', ClassController)
  .directive('classHeaderTitle', ClassHeaderTitle)
  .directive('classMenuItem', ClassMenuItem)
  .component('missingStudentsSection', new MissingStudentsSection())
  .directive('sessionReportsButton', SessionReportsButton)
  .factory('ClassesProxy', ClassesProxy)
  .service('ClassesStore', ClassesStore)
  .service('SessionEvents', SessionEvents)
  .factory('SubjectsProxy', SubjectsProxy).name;
