"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*@ngInject*/
function RequestedController($scope) {
    $scope.isRequestedVisibile = true;
    $scope.$on('rightSidebarStateChanged', function (event, state) {
        $scope.isRequestedVisibile = state;
    });
}
exports.RequestedController = RequestedController;
//# sourceMappingURL=RequestedController.js.map