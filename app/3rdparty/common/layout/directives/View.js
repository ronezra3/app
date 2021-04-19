"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StateDecorator_1 = require("../../decorators/StateDecorator");
var template = "<div class=\"view\" ng-transclude></div>";
function View() {
    return {
        restrict: 'E',
        transclude: true,
        replace: true,
        template: template,
        scope: {
            hardwareBackButtonEnabled: '=?'
        },
        /*@ngInject*/
        controller: function ($scope, HardwareBackButton, $state) {
            var deregisterBackButton = HardwareBackButton.push(function () {
                if (angular.isUndefined($scope.hardwareBackButtonEnabled) || $scope.hardwareBackButtonEnabled) {
                    $state.back().catch(function (error) {
                        if (error === StateDecorator_1.NO_HISTORY_STATES_ERROR && navigator && navigator.app) {
                            navigator.app.exitApp();
                        }
                    });
                }
            });
            $scope.$on('$destroy', function () {
                deregisterBackButton();
            });
        }
    };
}
exports.View = View;
//# sourceMappingURL=View.js.map