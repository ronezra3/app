export function ClassMenuItem() {
  return {
    restrict: 'E',
    template: require('./../templates/class-menu-item.html'),
    replace: true,
    scope: {
      type: '@'
    }
  };
}
