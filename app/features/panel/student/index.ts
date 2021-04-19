import {StudentPanel} from './student-panel.component';

export default angular.module('LearniApp.student-panel', [])
  .component('studentPanel', new StudentPanel()).name;
