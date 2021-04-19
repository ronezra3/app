"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UrlPlayController = /** @class */ (function () {
    /*@ngInject*/
    function UrlPlayController(Utilities, activity, IdeasValues) {
        this.Utilities = Utilities;
        this.activity = activity;
        this.IdeasValues = IdeasValues;
        this.charLimit = IdeasValues.maxChars;
    }
    UrlPlayController.prototype.associationChanged = function () {
        if (this.association.length > this.charLimit) {
            return this.association = this.lastValidAssociation;
        }
        this.lastValidAssociation = this.association;
    };
    return UrlPlayController;
}());
exports.UrlPlayController = UrlPlayController;
//# sourceMappingURL=UrlPlayController.js.map