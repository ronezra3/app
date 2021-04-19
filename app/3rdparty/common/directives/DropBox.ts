/*@ngInject*/
export function DropBox() {
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    template: require('./../templates/drop_box.html')
  };
}
