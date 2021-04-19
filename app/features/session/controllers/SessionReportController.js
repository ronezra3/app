"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SessionReportController = /** @class */ (function () {
    /*@ngInject*/
    function SessionReportController(lodash, activities, session, classInfo, books, members) {
        this.lodash = lodash;
        this.activities = activities;
        this.session = session;
        this.classInfo = classInfo;
        this.members = members;
        this.books = lodash.filter(books, function (book) { return lodash.some(session.books, { id: book.id }); });
    }
    SessionReportController.prototype.getBookPages = function (book) {
        return this.lodash.find(this.session.books, { id: book.id }).pages;
    };
    return SessionReportController;
}());
exports.SessionReportController = SessionReportController;
var template = "\n<view class=\"session-report gray-view flex-view\">\n  <navigation-bar>\n    <left-buttons>\n      <back-button></back-button>\n    </left-buttons>\n\n    <nav-bar-title>\n      <class-header-title class-info=\"$ctrl.classInfo\" show-details=\"true\"></class-header-title>\n      <span class=\"session-report-title\">{{'session-report' | translate}}</span>\n      <span class=\"session-report-session-time\">\n        {{($ctrl.session.createdAt || Date.now()) | amDateFormat:'MMMM DD,YYYY \u2022 h:mm a'}}- {{$ctrl.session.endedAt | amDateFormat:'h:mm a'}}\n      </span>\n    </nav-bar-title>\n\n    <right-buttons>\n      <button ng-click=\"\" ui-sref=\"attendance({classId: $ctrl.classInfo.id, sessionId: $ctrl.session.id})\">\n        <ng-include src=\"'images/panel/icons/attending-online.svg'\"></ng-include>\n        <span ng-if=\"$ctrl.members.length > 0\">\n          {{$ctrl.session.attended.length}}/{{$ctrl.members.length}} {{'attended' | translate}}\n        </span>\n      </button>\n    </right-buttons>\n  </navigation-bar>\n\n  <content scrollable=\"true\">\n\n    <div class=\"session-report-books narrow\">\n      <session-report-book-location class=\"session-reports-book-location\" ng-repeat=\"book in $ctrl.books\"\n                                    book=\"book\" pages=\"$ctrl.getBookPages(book)\">\n      </session-report-book-location>\n    </div>\n\n    <session-report-section class=\"narrow\" activities=\"$ctrl.activities.assess\" class-id=\"$ctrl.classInfo.id\"\n                            type=\"assess\"></session-report-section>\n\n    <div class=\"narrow session-report-minor-activities-wrapper wrap-panel\">\n      <session-report-section activities=\"$ctrl.activities.snapshot\"\n                              type=\"snapshot\"></session-report-section>\n      <session-report-section activities=\"$ctrl.activities.ideas\"\n                              type=\"ideas\"></session-report-section>\n      <session-report-section activities=\"$ctrl.activities.poll\"\n                              type=\"poll\"></session-report-section>\n    </div>\n\n  </content>\n</view>\n";
var SessionReportState = /** @class */ (function () {
    function SessionReportState() {
        this.url = '/report/:sessionId';
        this.template = template;
        this.controller = SessionReportController;
        this.controllerAs = '$ctrl';
        this.resolve = {
            /*@ngInject*/
            session: function ($stateParams, SessionProxy) { return SessionProxy.get($stateParams['sessionId']).$promise; },
            /*@ngInject*/
            classInfo: function (session, ClassesStore) { return ClassesStore.get(session.classId); },
            /*@ngInject*/
            members: function (session, UsersStore) { return UsersStore.query({ classId: session.classId }); },
            /*@ngInject*/
            books: function (session, BooksStore) { return BooksStore.query({ classId: session.classId }); },
            /*@ngInject*/
            activities: function (session, books, lodash, SessionReportValues, BookActivity, Activities) {
                var sessionActivities = lodash.where(session.activities, function (activity) {
                    return lodash.contains(SessionReportValues.reportedActivitiesTypes, activity.type);
                });
                if (!sessionActivities.length) {
                    return true;
                }
                return BookActivity.query({ activitiesIds: lodash.pluck(sessionActivities, 'id') }).$promise.then(function (bookActivities) {
                    var sessionActivitiesByType = lodash.groupBy(sessionActivities, 'type');
                    var activitiesByType = {};
                    lodash.forEach(sessionActivitiesByType, function (value, type) {
                        var ids = lodash.pluck(value, 'id');
                        Activities.query(type, ids).then(function (activities) {
                            lodash.each(activities, function (activity) {
                                var bookActivity = lodash.find(bookActivities, { activityId: activity.id });
                                if (bookActivity) {
                                    var book = lodash.find(books, { id: bookActivity.bookId });
                                    activity.bookInfo = { book: book };
                                    if (book.isSvg()) {
                                        activity.bookInfo.pageNumber = bookActivity.pageUrl;
                                    }
                                }
                            });
                            activitiesByType[type] = activities;
                        });
                    });
                    return activitiesByType;
                });
            }
        };
    }
    return SessionReportState;
}());
exports.SessionReportState = SessionReportState;
//# sourceMappingURL=SessionReportController.js.map