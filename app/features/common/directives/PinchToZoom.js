"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*@ngInject*/
function PinchToZoom(PinchToZoom) {
    return {
        link: link,
        restrict: 'A'
    };
    function link(scope, element, attrs) {
        PinchToZoom(element[0]);
    }
}
exports.PinchToZoom = PinchToZoom;
//# sourceMappingURL=PinchToZoom.js.map