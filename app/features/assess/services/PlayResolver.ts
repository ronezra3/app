import {ActivityMembersResolver} from '../../activities/services/MembersResolver';
export class AssessPlayResolver extends ActivityMembersResolver {

  getResolve() {
    let resolve = super.getResolve();
    resolve.studentAssess = this.studentAssess;
    resolve.isSubmitted = this.isSubmitted;

    return resolve;
  }

  /*@ngInject*/
  studentAssess(activity, StudentAssess, CurrentUser) {
    return StudentAssess.getByStudentAssess({
      assessId: activity.id,
      studentId: CurrentUser.get().id
    }).$promise;
  }

  /*@ngInject*/
  isSubmitted(studentAssess, $q) {
    return studentAssess.submitted ? $q.reject() : false;
  }
}
