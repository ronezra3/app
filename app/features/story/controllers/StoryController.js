"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StoryPlayController = /** @class */ (function () {
    /*@ngInject*/
    function StoryPlayController(Utilities, activity, StoryValues) {
        this.Utilities = Utilities;
        this.activity = activity;
        this.StoryValues = StoryValues;
        this.charLimit = StoryValues.maxChars;
    }
    StoryPlayController.prototype.associationChanged = function () {
        if (this.association.length > this.charLimit) {
            return this.association = this.lastValidAssociation;
        }
        this.lastValidAssociation = this.association;
    };
    return StoryPlayController;
}());
exports.StoryPlayController = StoryPlayController;
//# sourceMappingURL=StoryPlayController.js.map