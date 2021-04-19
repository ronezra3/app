import IAngularEvent = angular.IAngularEvent;

class ClickOnceButtonController {
  isDisabled = false;
  isValid;
  onClick;
  enableOnSuccess;
  success;
  isLoading;
  clicked;

  /*@ngInject*/
  constructor($scope, private ValidationHandler, private Utilities) {
    $scope.$watch('$ctrl.clicked', (value) => {
      if (value) {
        this.postClick(value);
      }
    });
  }


  click($event : IAngularEvent) {
    if (this.isValid) {
      var errorCode = this.isValid();
      if (errorCode) {
        return this.ValidationHandler.handle(errorCode);
      }
    }

    var promise = this.onClick({$event: $event});

    this.postClick(promise);
  }

  private postClick(promise) {
    this.isDisabled = true;
    if (!this.Utilities.isqPromise(promise)) {
      return;
    }

    this.isLoading = true;
    promise.then(() => {
      this.success = true;
      if (this.enableOnSuccess) {
        this.isDisabled = false;
      }
    }).catch((error) => {
      if (error) {
        this.ValidationHandler.handle(error);
      }

      this.isDisabled = false;
    }).finally(() => {
      this.isLoading = false;
    });
  }
}


export function ClickOnceButton() {
  return {
    restrict: 'E',
    template: `<button ng-class="{loading: $ctrl.isLoading, success: $ctrl.success}"
     ng-click="$ctrl.click($event)"
     ng-disabled="$ctrl.isDisabled || $ctrl.isDisabledExternal"
     ng-transclude></button>`,
    transclude: true,
    replace: true,
    scope: {},
    controllerAs: '$ctrl',
    bindToController: {
      onClick: '&',
      isValid: '&?',
      enableOnSuccess: '<?',
      clicked: '<',
      isDisabledExternal: '<isDisabled'
    },
    controller: ClickOnceButtonController
  };
}
