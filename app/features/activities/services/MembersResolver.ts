import {ActivityResolver} from '../../activities/services/Resolver';
export class ActivityMembersResolver extends ActivityResolver {
  getResolve() {
    let resolve = super.getResolve();
    resolve.members = this.members;

    return resolve;
  }

  /*@ngInject*/
  private members(UsersStore, $stateParams) {
    return UsersStore.query({classId: $stateParams.classId});
  }
}
