"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StateChangedService = /** @class */ (function () {
    /*@ngInject*/
    function StateChangedService(lodash, $rootScope) {
        var _this = this;
        this.lodash = lodash;
        this.callbacks = [];
        this.stateChangeStart = function (event, destinationState, toParams) {
            var shouldProceed = _this.lodash.any(_this.callbacks, function (callback) { return callback(destinationState.name, toParams); });
            if (!shouldProceed) {
                event.preventDefault();
            }
        };
        $rootScope.$on('$stateChangeStart', this.stateChangeStart);
    }
    StateChangedService.prototype.onStateChange = function (callback) {
        this.callbacks.push(callback);
    };
    return StateChangedService;
}());
exports.StateChangedService = StateChangedService;
//# sourceMappingURL=stateChanged.service.js.map