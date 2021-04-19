import {CurrentSession} from '../../session/services/CurrentSession';
/*@ngInject*/
export class MissingStudentsController {
  constructor(private CurrentSession : CurrentSession, public classInfo) {

  }

  getMissingCount() {
    return this.CurrentSession.getAttendanceMgr().getMissingCount();
  }
}
