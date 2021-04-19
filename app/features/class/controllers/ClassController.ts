import { TeacherSessionMediator } from '../../session/services/TeacherSessionMediator';
import { IStateServiceExtended } from '../../../3rdparty/common/decorators/StateDecorator';
import { Localytics } from '../../common/services/Localytics';
import { CurrentSession } from '../../session/services/CurrentSession';

export class ClassController {
  /*@ngInject*/
  constructor(private $state: IStateServiceExtended, public classInfo, private Localytics: Localytics,
    private TeacherSessionMediator: TeacherSessionMediator, private CurrentSession: CurrentSession) {
  }

  sessionStarted() {
    return this.CurrentSession.load(this.classInfo.id).then(session => {
      this.TeacherSessionMediator.subscribe(session);
      this.Localytics.tagEvent('Session Synced');
      return this.$state.go(`teach.reader.svg`, { bookId: 2, classId: this.classInfo.id, classCode: this.classInfo.code }).then(() =>
        this.TeacherSessionMediator.sync(session));
    }).catch(() =>
      this.CurrentSession.start(this.classInfo.id).then((session) => {
        this.Localytics.tagEvent('Session Started');
        this.TeacherSessionMediator.subscribe(session);
        return this.$state.go('sessionStarted', { classId: this.classInfo.id });
      }));
  }
}
