import {NgDialogRouterProvider} from '../../../3rdparty/common/layout/services/NgDialogRouter';

import {CreateClassState} from './create-class.state';
import {CreateClassThumbnail} from './create-class-thumbnail.component';

export default angular.module('LearniApp.create-class', [])
/*@ngInject*/
  .config((ngDialogRouterProvider : NgDialogRouterProvider) => {
    ngDialogRouterProvider.state('classes.create.class', new CreateClassState());
  })
  .component('createClassThumbnail', new CreateClassThumbnail()).name;
