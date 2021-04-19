import {RequestedController} from './controllers/RequestedController';
import {TeacherTogetherButton} from './directives/TeacherTogetherButton';
import {StudentTogetherButton} from './directives/StudentTogetherButton';
import {TogetherEventsRouter} from './services/TogetherEventsRouter';
import {Together} from './services/TogetherFactory';

export default angular.module('LearniApp.together', [])
  .controller('RequestedController', RequestedController)
  .component('teacherTogetherButton', new TeacherTogetherButton())
  .component('studentTogetherButton', new StudentTogetherButton())
  .service('TogetherEventsRouter', TogetherEventsRouter)
  .factory('Together', Together).name;
