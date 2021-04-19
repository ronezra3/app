import {ActivityMembersResolver} from '../../activities/services/MembersResolver';
export class ParticipantPlayResolver extends ActivityMembersResolver {
  chosenId;

  setChosenId(id) {
    this.chosenId = id;
  }
  
  getChosenId() {
    return this.chosenId;
  }
  
  getResolve() {
    let resolve = super.getResolve();
    resolve.classInfo = this.classInfo;
    resolve.isSubmitted = this.isSubmitted;

    return resolve;
  }

  /*@ngInject*/
  private classInfo(ClassesStore, $stateParams) {
    return ClassesStore.get($stateParams.classId);
  }

  /*@ngInject*/
  private isSubmitted(activity, $state, CurrentUser, $q) {
    if (angular.isDefined(activity.hasSubmitted) && activity.hasSubmitted(CurrentUser.get().id)) {
      $state.go('responseSubmitted', {
        type: activity.type
      });

      return $q.reject();
    }

    return false;
  }
}
