import {MDMSection} from './mdm-section.component';
import {TeacherPanel} from './teacher-panel.component';

export default angular.module('LearniApp.teacher-panel', [])
  .component('teacherPanel', new TeacherPanel())
  .component('mdmSection', new MDMSection()).name;
