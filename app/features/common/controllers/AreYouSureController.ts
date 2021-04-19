import IPromise = angular.IPromise;

/*@ngInject*/
export class AreYouSureController {

  constructor(private $scope, private ngDialogRouter, private Utilities) {
  }

  no() {
    this.noExternal();
    this.close();
  }

  yes() : any {
    var promise = this.yesExternal();
    if (!this.Utilities.isqPromise(promise)) {
      return this.close();
    }

    return promise.then(() => {
      this.close();
    });
  }

  private noExternal() {
    if (this.$scope.no) {
      this.$scope.no();
    }
  }

  private yesExternal() : any {
    return this.$scope.yes();
  }

  private close() {
    this.ngDialogRouter.close('are-you-sure');
  }
}
