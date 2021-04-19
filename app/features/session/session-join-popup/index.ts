import {NgDialogRouterProvider} from '../../../3rdparty/common/layout/services/NgDialogRouter';
import {SessionJoinPopupState} from './session-join-popup.state';
import {SessionJoinPopupService} from './session-join-popup.service';
import {CurrentUser} from '../../../3rdparty/common/services/CurrentUser';

export default angular.module('LearniApp.session-join-popup', [])
/*@ngInject*/
  .config((ngDialogRouterProvider : NgDialogRouterProvider) => {
    ngDialogRouterProvider.state('session.join-popup', new SessionJoinPopupState());
  })
  .service('SessionJoinPopupService', SessionJoinPopupService)
  /*@ngInject*/
  .run((SessionJoinPopupService : SessionJoinPopupService, CurrentUser : CurrentUser) =>
    CurrentUser.onLoad((user) => {
      if (!user.isTeacher) {
        // SessionJoinPopupService.openActive();
      }
    })
  ).name;
