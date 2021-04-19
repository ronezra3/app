const template = `<nav ng-transclude></nav>`;

export function SideBar() {
  return {
    restrict: 'E',
    transclude: true,
    template: template
  };
}
