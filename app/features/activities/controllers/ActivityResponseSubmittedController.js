"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*@ngInject*/
function ActivityResponseSubmittedController($scope, $stateParams) {
    $scope.type = $stateParams.type;
    var feedbackOptions = [1, 2, 3];
    $scope.randomFeedback = feedbackOptions[Math.floor(feedbackOptions.length * Math.random())];
}
exports.ActivityResponseSubmittedController = ActivityResponseSubmittedController;
//# sourceMappingURL=ActivityResponseSubmittedController.js.map