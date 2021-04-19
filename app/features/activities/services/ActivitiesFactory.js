"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Activities = /** @class */ (function () {
    /*@ngInject*/
    function Activities(Utilities, SocketIO, BookActivity, lodash, CurrentBook, CurrentBookActivities, Attention, Localytics, ClassesStore, $q, CurrentSession, CurrentUser) {
        this.Utilities = Utilities;
        this.SocketIO = SocketIO;
        this.BookActivity = BookActivity;
        this.lodash = lodash;
        this.CurrentBook = CurrentBook;
        this.CurrentBookActivities = CurrentBookActivities;
        this.Attention = Attention;
        this.Localytics = Localytics;
        this.ClassesStore = ClassesStore;
        this.$q = $q;
        this.CurrentSession = CurrentSession;
        this.CurrentUser = CurrentUser;
    }
    Activities.prototype.get = function (type, id) {
        return this.Utilities.getFactoryByName(type).get({ id: id });
    };
    Activities.prototype.constructResource = function (type, data) {
        try {
            var Factory = this.Utilities.getFactoryByName(type);
            return new Factory(data);
        }
        catch (e) {
            return null;
        }
    };
    Activities.prototype.save = function (type, activity, classId, isContextual) {
        var _this = this;
        if (!isContextual || angular.isDefined(activity.id)) {
            activity.publishedCount = activity.publishedCount ? ++activity.publishedCount : 1;
            return activity.$save();
        }
        var bookId = this.CurrentBook.info.id;
        return this.ClassesStore.getByBookId(bookId).then(function (classes) {
            var classIds = _this.lodash.pluck(classes, 'id');
            return new _this.BookActivity({
                bookId: bookId,
                pageUrl: _this.CurrentBook.pageUrl,
                activity: activity,
                classIds: classIds,
                activityType: type
            }).$save({ classId: classId })
                .then(function (bookActivity) {
                _this.CurrentBookActivities.add(bookActivity);
                activity.id = bookActivity.activityId;
                return activity;
            });
        });
    };
    Activities.prototype.publish = function (type, classId, activity, isContextual) {
        var _this = this;
        this.clearAttention();
        return this.save(type, activity, classId, isContextual).then(function () {
            var session = _this.CurrentSession.getInfo();
            session.currentActivity = {
                id: activity.id,
                type: type,
                phase: 'play'
            };
            session.activities.push({ id: activity.id, type: type });
            return session.$save().then(function () {
                var bookActivity = _this.CurrentBookActivities.findOneByActivityId(activity.id);
                if (bookActivity) {
                    bookActivity.published = true;
                    return bookActivity.$save().then(function () {
                        return _this.emit(type, 'publish', activity);
                    });
                }
                return _this.emit(type, 'publish', activity);
            });
        });
    };
    Activities.prototype.share = function (type, activity) {
        var _this = this;
        var session = this.CurrentSession.getInfo();
        session.currentActivity = {
            id: activity.id,
            type: type,
            phase: 'results'
        };
        this.clearAttention();
        return this.$q.all([session.$save(), activity.$save()]).then(function () {
            _this.emit(type, 'share', activity);
            _this.Localytics.tagEvent('Activity Results Shared', {
                type: type
            });
        });
    };
    Activities.prototype.finish = function (type, activity) {
        var _this = this;
        var session = this.CurrentSession.getInfo();
        session.currentActivity = null;
        return this.$q.all([session.$save(), activity.$save()]).then(function () {
            _this.emit(type, 'finish');
        });
    };
    Activities.prototype.submit = function (type, activity, response) {
        var _this = this;
        return activity.$submit(response).then(function () {
            response.userId = _this.CurrentUser.get().id;
            _this.emit(type, 'submit', response || activity);
        }).catch(function (err) {
            console.log(err);
        });
    };
    Activities.prototype.onPublished = function (type, callback) {
        var _this = this;
        return this.SocketIO.on(type + '.publish', function (eventObj) {
            callback(_this.constructResource(type, eventObj));
        });
    };
    Activities.prototype.onShare = function (type, callback) {
        var _this = this;
        return this.SocketIO.on(type + '.share', function (eventObj) {
            callback(_this.constructResource(type, eventObj));
        });
    };
    Activities.prototype.onSubmitted = function (type, callback) {
        return this.SocketIO.on(type + '.submit', callback);
    };
    Activities.prototype.onFinish = function (type, callback) {
        return this.SocketIO.on(type + '.finish', callback);
    };
    Activities.prototype.unSubscribe = function (type, event) {
        if (event) {
            this.SocketIO.removeAllListeners(type + '.' + event);
        }
        else {
            this.SocketIO.removeAllListeners(type + '.publish');
            this.SocketIO.removeAllListeners(type + '.results.publish');
            this.SocketIO.removeAllListeners(type + '.submit');
            this.SocketIO.removeAllListeners(type + '.finish');
        }
    };
    Activities.prototype.query = function (type, ids) {
        var factory = this.Utilities.getFactoryByName(type);
        return factory.query({ ids: ids }).$promise;
    };
    Activities.prototype.remove = function (activity) {
        var _this = this;
        var bookActivity = this.CurrentBookActivities.findOneByActivityId(activity.id);
        return bookActivity.$delete()
            .then(function () { return _this.CurrentBookActivities.remove(activity.id); });
    };
    Activities.prototype.reset = function (activity) {
        var bookActivity = this.CurrentBookActivities.findOneByActivityId(activity.id);
        var promises = [activity.$reset()];
        if (bookActivity) {
            bookActivity.published = false;
            promises.push(bookActivity.$save());
        }
        return this.$q.all(promises);
    };
    Activities.prototype.clearAttention = function () {
        var session = this.CurrentSession.getInfo();
        if (session.inAttention) {
            this.Attention.toggle(session);
        }
    };
    Activities.prototype.emit = function (type, event, activity) {
        console.log('emit');
        this.SocketIO.emit(this.CurrentSession.getInfo().id, type + "." + event, activity);
        return activity;
    };
    return Activities;
}());
exports.Activities = Activities;
//# sourceMappingURL=ActivitiesFactory.js.map