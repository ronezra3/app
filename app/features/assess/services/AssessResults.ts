import {Activities} from '../../activities/services/ActivitiesFactory';
import IRootScopeService = angular.IRootScopeService;
import {CurrentSession} from '../../session/services/CurrentSession';
import LoDashStatic = _.LoDashStatic;
import {IStudentAssess} from './StudentAssessFactory';

export interface IAssessResults {
  onChange(callback) : void;
  get() : Array<IStudentAssess>;
}

class AssessResults {
  studentsAssesses : IStudentAssess[] = [];

  constructor(private lodash : LoDashStatic, private $rootScope : IRootScopeService, Activities : Activities,
              CurrentSession : CurrentSession, StudentAssess : IStudentAssess) {
    Activities.onSubmitted('assess', this.update.bind(this));
    this.studentsAssesses = CurrentSession.getAttendanceMgr().getAttending().map((id) => new StudentAssess({studentId: id}));
  }

  onChange(callback) {
    this.$rootScope.$on('studentAssessSubmitted', callback);
  }

  get() {
    return this.studentsAssesses;
  }

  private update(newStudentAssess) {
    let existingStudentAssess : any = this.lodash.find(this.studentsAssesses, {studentId: newStudentAssess.studentId});
    if (!existingStudentAssess) {
      return this.studentsAssesses.push(newStudentAssess);
    }

    existingStudentAssess.submitted = newStudentAssess.submitted;

    if (!existingStudentAssess.questions) {
      return existingStudentAssess.questions = newStudentAssess.questions;
    }

    this.lodash.each(newStudentAssess.questions, (newQuestion : any) => {
      let existingQuestion : any = this.lodash.find(existingStudentAssess.questions, {'_id': newQuestion._id});
      existingQuestion.status = newQuestion.status;
    });

    this.$rootScope.$emit('studentAssessSubmitted');
  }
}

/*@ngInject*/
export function AssessResultsFactory(lodash, $rootScope, Activities, CurrentSession, StudentAssess) {
  return () => new AssessResults(lodash, $rootScope, Activities, CurrentSession, StudentAssess);
}
