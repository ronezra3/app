/*@ngInject*/
export function AttentionController($scope, ClassesStore, $state, CurrentUser) {
  ClassesStore.get($state.params.classId).then(function (classInfo) {
    classInfo.getTeacher().then(function (teacher) {
      $scope.teacher = teacher;
    });
  });

  $scope.user = CurrentUser.get();
}
