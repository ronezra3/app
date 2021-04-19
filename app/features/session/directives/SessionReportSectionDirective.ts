export function SessionReportSection() {
  return {
    link: link,
    restrict: 'E',
    template: require('./../templates/sessionReportSection.html'),
    scope: {
      type: '@',
      activities: '=',
      classId: '='
    }
  };

  function link(scope, element, attrs) {
    scope.rightButtonClick = function () {
      scope.index++;
    };

    scope.leftButtonClick = function () {
      scope.index--;
    };

    scope.isFirst = function () {
      return scope.index < 1;
    };

    scope.isLast = function () {
      if (angular.isDefined(scope.activities)) {
        return scope.index >= scope.activities.length - 1;
      }
      return true;
    };
  }
}

