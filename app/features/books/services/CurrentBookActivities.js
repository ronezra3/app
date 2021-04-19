"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CurrentBookActivities = /** @class */ (function () {
    /*@ngInject*/
    function CurrentBookActivities(BookActivity, lodash) {
        this.BookActivity = BookActivity;
        this.lodash = lodash;
    }
    CurrentBookActivities.prototype.init = function (bookId, classId) {
        var _this = this;
        return this.BookActivity.query({ bookId: bookId, classId: classId }).$promise
            .then(function (bookActivities) {
            _this.bookActivities = bookActivities;
            _this.bookId = bookId;
        });
    };
    CurrentBookActivities.prototype.get = function () {
        return this.bookActivities;
    };
    CurrentBookActivities.prototype.getBookId = function () {
        return this.bookId;
    };
    CurrentBookActivities.prototype.add = function (activity) {
        this.bookActivities.push(activity);
    };
    CurrentBookActivities.prototype.remove = function (id) {
        this.lodash.remove(this.bookActivities, { activityId: id });
    };
    CurrentBookActivities.prototype.findOneByActivityId = function (id) {
        return this.lodash.find(this.bookActivities, { activityId: id });
    };
    CurrentBookActivities.prototype.findOneByTypeAndPage = function (type, pageUrl) {
        return this.lodash.find(this.bookActivities, {
            pageUrl: pageUrl.toString(),
            activityType: type
        });
    };
    CurrentBookActivities.prototype.clear = function () {
        this.bookActivities = undefined;
    };
    return CurrentBookActivities;
}());
exports.CurrentBookActivities = CurrentBookActivities;
//# sourceMappingURL=CurrentBookActivities.js.map