import {JoinButton} from './join-button';

export default angular.module('LearniApp.session-join-button', [])
  .component('joinSessionButton', new JoinButton())
  .name;
