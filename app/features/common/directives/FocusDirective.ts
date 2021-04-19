/*@ngInject*/
export function FocusOn($timeout) {
  return {
    restrict: 'A',
    scope: {focusOn: '@'},
    link: function (scope, element) {
      scope.$watch('focusOn', function (value) {
        if (value === "true") {
          $timeout(function () {
            element[0].focus();
          });
        }
      });
    }
  };
}
