"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*@ngInject*/
function ManageTabButton($state) {
    return {
        restrict: 'E',
        template: require('./../templates/manage-tab-button.html'),
        scope: {
            type: '@'
        },
        link: function (scope, element, attrs) {
            scope.click = function () {
                $state.go("manage." + scope.type, null, { replace: true });
            };
            scope.isDisabled = function () {
                return $state.is('manage.' + scope.type);
            };
            scope.isActive = function () {
                return $state.is('manage.' + scope.type);
            };
        }
    };
}
exports.ManageTabButton = ManageTabButton;
//# sourceMappingURL=ManageTabButton.js.map