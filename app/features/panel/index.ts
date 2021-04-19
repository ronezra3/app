import {ActivityButton} from './common/ActivityButton';
import {ActivitiesSection} from './common/activities-section.component';
import {Panel} from './common/panel';

let dependencies : any = ['student', 'teacher'].map(name => require(`./${name}/index`).default);

export default angular.module('LearniApp.panel', dependencies)
  .component('activityButton', new ActivityButton())
  .component('activitiesSection', new ActivitiesSection())
  .component('panel', new Panel())
  .name;
