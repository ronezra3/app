"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IdeasPlayController = /** @class */ (function () {
    /*@ngInject*/
    function IdeasPlayController(Utilities, activity, IdeasValues) {
        this.Utilities = Utilities;
        this.activity = activity;
        this.IdeasValues = IdeasValues;
        this.charLimit = IdeasValues.maxChars;
    }
    IdeasPlayController.prototype.associationChanged = function () {
        if (this.association.length > this.charLimit) {
            return this.association = this.lastValidAssociation;
        }
        this.lastValidAssociation = this.association;
    };
    return IdeasPlayController;
}());
exports.IdeasPlayController = IdeasPlayController;
//# sourceMappingURL=IdeasPlayController.js.map