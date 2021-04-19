export class ActivityResolver {
  private resolve : any = {};

  constructor(protected type) {
    // We must return a literal notation object here because
    // ui router expects the resolve function to be on the object itself and not it's prototype
    /*@ngInject*/
    this.resolve.activity = ($stateParams, Activities) => {
      var activityId = $stateParams.activityId;
      if (activityId) {
        return Activities.get(type, activityId).$promise;
      }

      return Activities.constructResource(type);
    };
  }

  getResolve() {
    return this.resolve;
  }
}
