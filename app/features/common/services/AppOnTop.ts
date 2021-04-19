import IQService = angular.IQService;
import IPromise = angular.IPromise;

export class AppOnTop {
  /*@ngInject*/
  constructor(private $q : IQService) {
  }

  public get() : IPromise<any> {
    let defer = this.$q.defer();
    appontop.getAppOnTop(defer.resolve, defer.reject);
    return defer.promise;
  }

  public hasPermission() : IPromise<any> {
    let defer = this.$q.defer();
    appontop.hasPermission(defer.resolve, defer.reject);
    return defer.promise;
  }

  public requestPermission() : IPromise<any> {
    let defer = this.$q.defer();
    appontop.requestPermission(defer.resolve, defer.reject);
    return defer.promise;
  }
}
