"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ClickOnceButtonController = /** @class */ (function () {
    /*@ngInject*/
    function ClickOnceButtonController($scope, ValidationHandler, Utilities) {
        var _this = this;
        this.ValidationHandler = ValidationHandler;
        this.Utilities = Utilities;
        this.isDisabled = false;
        $scope.$watch('$ctrl.clicked', function (value) {
            if (value) {
                _this.postClick(value);
            }
        });
    }
    ClickOnceButtonController.prototype.click = function ($event) {
        if (this.isValid) {
            var errorCode = this.isValid();
            if (errorCode) {
                return this.ValidationHandler.handle(errorCode);
            }
        }
        var promise = this.onClick({ $event: $event });
        this.postClick(promise);
    };
    ClickOnceButtonController.prototype.postClick = function (promise) {
        var _this = this;
        this.isDisabled = true;
        if (!this.Utilities.isqPromise(promise)) {
            return;
        }
        this.isLoading = true;
        promise.then(function () {
            _this.success = true;
            if (_this.enableOnSuccess) {
                _this.isDisabled = false;
            }
        }).catch(function (error) {
            if (error) {
                _this.ValidationHandler.handle(error);
            }
            _this.isDisabled = false;
        }).finally(function () {
            _this.isLoading = false;
        });
    };
    return ClickOnceButtonController;
}());
function ClickOnceButton() {
    return {
        restrict: 'E',
        template: "<button ng-class=\"{loading: $ctrl.isLoading, success: $ctrl.success}\"\n     ng-click=\"$ctrl.click($event)\"\n     ng-disabled=\"$ctrl.isDisabled || $ctrl.isDisabledExternal\"\n     ng-transclude></button>",
        transclude: true,
        replace: true,
        scope: {},
        controllerAs: '$ctrl',
        bindToController: {
            onClick: '&',
            isValid: '&?',
            enableOnSuccess: '<?',
            clicked: '<',
            isDisabledExternal: '<isDisabled'
        },
        controller: ClickOnceButtonController
    };
}
exports.ClickOnceButton = ClickOnceButton;
//# sourceMappingURL=ClickOnceButtonDirective.js.map