/*@ngInject*/
export function ActivityResponseSubmittedController($scope, $stateParams) {
  $scope.type = $stateParams.type;
  const feedbackOptions = [1, 2, 3];
  $scope.randomFeedback = feedbackOptions[Math.floor(feedbackOptions.length * Math.random())];
    
}
