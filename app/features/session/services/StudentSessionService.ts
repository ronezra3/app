import {IDeviceUtilities} from '../../../3rdparty/common/services/DeviceUtilities';
import {AppOnTop} from '../../common/services/AppOnTop';
import {CurrentSession} from './CurrentSession';
import {IStateService} from 'angular-ui-router';
import {StudentSessionMediator} from './StudentSessionMediator';
import {IDialogRouter} from '../../../3rdparty/common/layout/services/NgDialogRouter';

export class StudentSessionService {

  /*@ngInject*/
  constructor(private ngDialogRouter : IDialogRouter, private DeviceUtilities : IDeviceUtilities, private $q,
              private AppOnTop : AppOnTop, private CurrentSession : CurrentSession, private StudentSessionMediator : StudentSessionMediator) {
  }

  public leave() {
    return this.StudentSessionMediator.leave();
  }

  public join(classId) {
    // if (this.DeviceUtilities.isAndroid() && this.DeviceUtilities.isVersionLargerThan(5.1)) {
    //   return this.syncSessionWithPermissions(classId);
    // }

    return this.syncSession(classId);
  }

  // private syncSessionWithPermissions(classId) {
  //   return this.AppOnTop.hasPermission()
  //     .then((hasPermission) => hasPermission ? this.syncSession(classId) : this.requestPermission(classId));
  // }

  private syncSession(classId) {
    return this.CurrentSession.load(classId).then(currentSession => {
      this.StudentSessionMediator.subscribe(currentSession);
      this.StudentSessionMediator.sync(currentSession);
    }).catch(() => this.ngDialogRouter.go('validationMassage', {errorMassage: 'no_session'}));
  }

  private requestPermission(classId) {
    let deferred = this.$q.defer();
    this.ngDialogRouter.go('are-you-sure', {
      yes: () => this.AppOnTop.requestPermission()
        .then(() => this.syncSession(classId).then(deferred.resolve))
        .catch(() => this.requestPermission(classId).then(deferred.resolve))
      ,
      no: deferred.resolve,
      message: 'are_you_sure_approve_permission'
    });

    return deferred.promise;
  }
}
