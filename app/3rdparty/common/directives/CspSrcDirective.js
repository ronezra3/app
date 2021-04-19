"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*@ngInject*/
function CspSrc(Utilities, DeviceUtilities) {
    return {
        link: link,
        restrict: 'A',
        priority: 99
    };
    function link(scope, element, attrs) {
        attrs.$observe('cspSrc', function (origSrc) {
            if (DeviceUtilities.isChromeApp() || DeviceUtilities.isWindows()) {
                Utilities.getSrcFromCspSrc(origSrc)
                    .then(function (src) { return attrs.$set('src', src); })
                    .catch(function () { return attrs.$set('src', origSrc); });
            }
            else {
                attrs.$set('src', origSrc);
            }
            scope.$on('$destroy', function () {
                Utilities.destroyResource(attrs.src);
            });
        });
    }
}
exports.CspSrc = CspSrc;
//# sourceMappingURL=CspSrcDirective.js.map