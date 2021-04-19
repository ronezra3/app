"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*@ngInject*/
function FocusOn($timeout) {
    return {
        restrict: 'A',
        scope: { focusOn: '@' },
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
exports.FocusOn = FocusOn;
//# sourceMappingURL=FocusDirective.js.map