import {ClassesStore} from '../../class/services/ClassesStore';
import {IDialogRouter} from '../../../3rdparty/common/layout/services/NgDialogRouter';
import {SessionProxy} from '../services/SessionProxy';

export class SessionJoinPopupService {

  /*@ngInject*/
  constructor(private ClassesStore : ClassesStore, private ngDialogRouter : IDialogRouter, private SessionProxy : SessionProxy) {
  }

  open(session) {
    this.ClassesStore.get(session.classId).then(classInfo =>
      classInfo.getTeacher().then(
        // teacher => this.ngDialogRouter.go('session.join-popup', {session: session, classInfo, teacher: teacher})
        ));
  }

  openActive() {
    this.SessionProxy.getActive().then(activeSession => {
      if (activeSession) {
        // this.open(activeSession);
      }
    });
  }
}
