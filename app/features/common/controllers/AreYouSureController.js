"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*@ngInject*/
var AreYouSureController = /** @class */ (function () {
    function AreYouSureController($scope, ngDialogRouter, Utilities) {
        this.$scope = $scope;
        this.ngDialogRouter = ngDialogRouter;
        this.Utilities = Utilities;
    }
    AreYouSureController.prototype.no = function () {
        this.noExternal();
        this.close();
    };
    AreYouSureController.prototype.yes = function () {
        var _this = this;
        var promise = this.yesExternal();
        if (!this.Utilities.isqPromise(promise)) {
            return this.close();
        }
        return promise.then(function () {
            _this.close();
        });
    };
    AreYouSureController.prototype.noExternal = function () {
        if (this.$scope.no) {
            this.$scope.no();
        }
    };
    AreYouSureController.prototype.yesExternal = function () {
        return this.$scope.yes();
    };
    AreYouSureController.prototype.close = function () {
        this.ngDialogRouter.close('are-you-sure');
    };
    return AreYouSureController;
}());
exports.AreYouSureController = AreYouSureController;
//# sourceMappingURL=AreYouSureController.js.map