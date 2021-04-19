import IRootScopeService = angular.IRootScopeService;
import { LocallyStoredParameter } from '../storage/LocallyStoredParameter';
export class CurrentUser extends LocallyStoredParameter {
  private static LOADED_EVENT = 'currentUser-loaded';

  /*@ngInject*/
  constructor(LocalStorageFactory, private UsersProxy, private $rootScope: IRootScopeService) {
    super(LocalStorageFactory, 'currentUser1');
  }

  protected convertParam(user) {
    return user ? new this.UsersProxy(user) : user;
  }

  load() {
    return super.load().then(user => {
      if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        this.$rootScope.$broadcast(CurrentUser.LOADED_EVENT, user);
      }

      return user;
    });
  }

  set(user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
    let promise = super.set(user);
    this.$rootScope.$broadcast(CurrentUser.LOADED_EVENT, user);
    return promise;
  }

  onLoad(callback) {
    this.$rootScope.$on(CurrentUser.LOADED_EVENT, (event, data) => callback(data));
  }
}
