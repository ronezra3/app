import {IStateProvider} from 'angular-ui-router';

import {ClassThumbnail} from './common/ClassThumbnailDirective';

import {Classes} from './common/classes';

let dependencies : any = ['join-class', 'create-class'].map(name => require(`./${name}/index`).default);

export default angular.module('LearniApp.classes', dependencies)
  .config(($stateProvider : IStateProvider) => {
    $stateProvider.state('classes', new Classes());
  })
  .value('ClassesValues', {
    'descriptionMaxLength': 20
  })
  .component('classThumbnail', new ClassThumbnail()).name;
