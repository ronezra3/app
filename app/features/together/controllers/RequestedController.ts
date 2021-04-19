/*@ngInject*/
export function RequestedController($scope) {
  $scope.isRequestedVisibile = true;
  $scope.$on('rightSidebarStateChanged', function (event, state) {
    $scope.isRequestedVisibile = state;
  });
}
