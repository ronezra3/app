"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GENERIC_ERROR = 'generic_error';
/*@ngInject*/
var ValidationHandler = /** @class */ (function () {
    function ValidationHandler(ngDialogRouter) {
        this.ngDialogRouter = ngDialogRouter;
    }
    ValidationHandler.prototype.handle = function (errorMassage) {
        if (errorMassage && typeof errorMassage !== 'string') {
            console.log('Error message must be a string');
            errorMassage = GENERIC_ERROR;
        }
        this.ngDialogRouter.go('validationMassage', {
            errorMassage: errorMassage || GENERIC_ERROR
        });
    };
    return ValidationHandler;
}());
exports.ValidationHandler = ValidationHandler;
//# sourceMappingURL=ValidationHandler.js.map