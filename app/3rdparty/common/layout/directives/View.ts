import {NO_HISTORY_STATES_ERROR} from '../../decorators/StateDecorator';
declare var navigator : any;

const template = `<div class="view" ng-transclude></div>`;

export function View() {
  return {
    restrict: 'E',
    transclude: true,
    replace: true,
    template: template,
    scope: {
      hardwareBackButtonEnabled: '=?'
    },
    /*@ngInject*/
    controller: function ($scope, HardwareBackButton, $state) {
      var deregisterBackButton = HardwareBackButton.push(function () {
        if (angular.isUndefined($scope.hardwareBackButtonEnabled) || $scope.hardwareBackButtonEnabled) {
          $state.back().catch((error : string) => {
            if (error === NO_HISTORY_STATES_ERROR && navigator && navigator.app) {
              navigator.app.exitApp();
            }
          });
        }
      });

      $scope.$on('$destroy', function () {
        deregisterBackButton();
      });
    }
  };
}
