export function ClassHeaderTitle() {
  return {
    restrict: 'E',
    template: require('./../templates/class-header-title.html'),
    scope: {
      classInfo: '=',
      showDetails: '='
    }
  };
}
