"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*@ngInject*/
function SessionReportsScroll(SessionProxy, moment, SessionReportsValues, lodash, Localytics) {
    return {
        link: link,
        restrict: 'E',
        template: require('./../templates/session-reports-scroll.html'),
        scope: {
            classId: '@',
            membersCount: '=',
        }
    };
    function link(scope, element, attrs) {
        var endDate;
        var startDate;
        function selectedDateChanged(selectedDate) {
            scope.sessions = [];
            endDate = moment(selectedDate).endOf('month');
            startDate = moment(selectedDate).startOf('month');
        }
        scope.$on('selectedDateChanged', function (event, date) {
            selectedDateChanged(date);
            scope.isLoading = false;
            scope.noMoreSessions = false;
            scope.loadItems();
        });
        scope.loadMoreItems = function () {
            Localytics.tagEvent('Session Reports Scrolled');
            scope.loadItems();
        };
        scope.loadItems = function () {
            if (scope.noMoreSessions) {
                return;
            }
            scope.isLoading = true;
            SessionProxy.query(startDate, endDate, SessionReportsValues.reportsBulkSize, scope.classId)
                .then(function (sessions) {
                scope.isLoading = false;
                scope.noMoreSessions = sessions.length < SessionReportsValues.reportsBulkSize;
                scope.sessions = scope.sessions.concat(sessions);
                endDate = lodash(scope.sessions).chain().map(function (session) {
                    return moment(session.createdAt);
                }).min().value();
            });
        };
        selectedDateChanged(new Date());
        scope.loadItems();
    }
}
exports.SessionReportsScroll = SessionReportsScroll;
//# sourceMappingURL=SessionReportsScrollDirective.js.map