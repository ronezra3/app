/*@ngInject*/
import {ActivityResolver} from './Resolver';
export class ActivityPlayResolver extends ActivityResolver {
  private isSubmitted;

  constructor(type) {
    super(type);

    /*@ngInject*/
    this.isSubmitted = (activity, $state, CurrentUser, $q, $timeout) => {
      if (angular.isDefined(activity.hasSubmitted) && activity.hasSubmitted(CurrentUser.get().id)) {
        $timeout(() => $state.go('responseSubmitted', {
          type: type
        }), 0);

        return $q.reject();
      }

      return false;
    };
  }

  getResolve() {
    let resolve = super.getResolve();
    resolve.isSubmitted = this.isSubmitted;

    return resolve;
  }
}
