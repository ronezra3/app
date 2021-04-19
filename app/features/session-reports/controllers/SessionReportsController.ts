/*@ngInject*/
export function SessionReportsController($scope, $state, UsersStore, ClassesStore, Localytics) {
  $scope.classId = $state.params.classId;

  ClassesStore.get($scope.classId).then(function (classInfo) {
    $scope.classInfo = classInfo;
  });

  UsersStore.query({classId: $scope.classId}).then(function (members) {
    $scope.allMembers = members;
  });

  var selectedMonth;
  $scope.selectedDate = function (insertedDate) {
    if (angular.isDefined(insertedDate)) {
      selectedMonth = insertedDate;
      $scope.$broadcast('selectedDateChanged', selectedMonth);
    }
    return selectedMonth;
  };

  $scope.increaseMonth = function () {
    Localytics.tagEvent('Session Report Month Changed');

    $scope.selectedDate(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1));
  };

  $scope.decreaseMonth = function () {
    Localytics.tagEvent('Session Report Month Changed');

    $scope.selectedDate(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() - 1));
  };

  $scope.selectedDate(new Date());
}
