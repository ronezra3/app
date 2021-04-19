"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*@ngInject*/
function AttentionController($scope, ClassesStore, $state, CurrentUser) {
    ClassesStore.get($state.params.classId).then(function (classInfo) {
        classInfo.getTeacher().then(function (teacher) {
            $scope.teacher = teacher;
        });
    });
    $scope.user = CurrentUser.get();
}
exports.AttentionController = AttentionController;
//# sourceMappingURL=AttentionController.js.map