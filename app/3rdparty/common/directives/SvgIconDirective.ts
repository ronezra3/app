export function SvgIcon() {
  return {
    restrict: 'E',
    scope: {
      src: '@'
    },
    template: '<ng-include src="src"></ng-include>'
  };
}
