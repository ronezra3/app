/*@ngInject*/
export function PinchToZoom(PinchToZoom) {
  return {
    link: link,
    restrict: 'A'
  };

  function link(scope, element, attrs) {
    PinchToZoom(element[0]);
  }
}
