import {NgDialogRouterProvider} from '../../../3rdparty/common/layout/services/NgDialogRouter';

import {JoinClassState} from './join-class.state';
import {JoinClassThumbnail} from './JoinClassThumbnailDirective';

export default angular.module('LearniApp.join-class', [])
/*@ngInject*/
  .config((ngDialogRouterProvider : NgDialogRouterProvider) => {
    ngDialogRouterProvider.state('classes.join.class', new JoinClassState());
  })
  .component('joinClassThumbnail', new JoinClassThumbnail()).name;
