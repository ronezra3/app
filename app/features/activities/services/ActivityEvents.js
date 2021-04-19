"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ActivityEvents = /** @class */ (function () {
    /*@ngInject*/
    function ActivityEvents(Localytics, lodash) {
        this.Localytics = Localytics;
        this.lodash = lodash;
    }
    ActivityEvents.prototype.tagSave = function (type, isNew, isContextual, specificData) {
        this.tagEvent('Saved', type, isNew, isContextual, specificData);
    };
    ActivityEvents.prototype.tagPublish = function (type, isNew, isContextual, specificData) {
        this.tagEvent('Publish', type, isNew, isContextual, specificData);
    };
    ActivityEvents.prototype.tagEvent = function (event, type, isNew, isContextual, specificData) {
        var baseEventData = {
            isContextual: isContextual,
            isNew: isNew
        };
        this.Localytics.tagEvent(type + " " + event, this.lodash.merge(baseEventData, specificData));
    };
    return ActivityEvents;
}());
exports.ActivityEvents = ActivityEvents;
//# sourceMappingURL=ActivityEvents.js.map