"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*@ngInject*/
var ActivitiesRouter = /** @class */ (function () {
    function ActivitiesRouter(Activities, $state, $q, ENV, CurrentBookActivities, lodash, InAppBrowser, CurrentSession) {
        this.Activities = Activities;
        this.$state = $state;
        this.$q = $q;
        this.ENV = ENV;
        this.CurrentBookActivities = CurrentBookActivities;
        this.lodash = lodash;
        this.InAppBrowser = InAppBrowser;
        this.CurrentSession = CurrentSession;
    }
    ActivitiesRouter.prototype.syncWith = function (currentSession, previousSession, isTeacher) {
        if (!currentSession.currentActivity) {
            if (previousSession && previousSession.currentActivity) {
                return this.$state.back(true);
            }
            return this.$q.resolve();
        }
        var previousActivityEmpty = !previousSession || !previousSession.currentActivity;
        var currentActivityUpdate = (previousActivityEmpty
            || !this.lodash.isEqual(previousSession.currentActivity, currentSession.currentActivity));
        if (currentActivityUpdate) {
            return this.updateCurrent(currentSession, isTeacher);
        }
        return this.$q.resolve();
    };
    ActivitiesRouter.prototype.sync = function (currentSession, isTeacher) {
        if (!currentSession.currentActivity) {
            return this.$q.resolve();
        }
        return this.updateCurrent(currentSession, isTeacher);
    };
    ActivitiesRouter.prototype.unsubscribe = function () {
        var _this = this;
        this.lodash.each(this.ENV.teacher.activities, function (stages, activity) {
            _this.Activities.unSubscribe(activity);
        });
    };
    ActivitiesRouter.prototype.subscribe = function (session) {
        var _this = this;
        this.lodash.each(this.ENV.teacher.activities, function (stages, type) {
            _this.Activities.onPublished(type, function (activity) {
                session.currentActivity = { id: activity.id, type: type, phase: 'play' };
                _this.openPlay(type, activity.id);
            });
            _this.Activities.onShare(type, function (activity) {
                session.currentActivity = { id: activity.id, type: type, phase: 'results' };
                _this.openStudentResults(session.currentActivity);
            });
            _this.Activities.onFinish(type, function () {
                // The student might be in books or reader already only in assess
                // - this is the only activity that doesn't have a thank-you-page,
                // in case that the student submitted his assessment
                // before the teacher ended the assess he will be in reader \ books page.
                // ** this is just a temp solution until we will delete all the thank-you-pages **
                if (!_this.$state.includes('learn')) {
                    _this.$state.back(true);
                }
            });
        });
        // this.Activities.onFinish('url', this.InAppBrowser.close.bind(this.InAppBrowser));
    };
    ActivitiesRouter.prototype.open = function (type, mode, pageUrl) {
        var previewStage = mode + "-preview";
        if (pageUrl) {
            var bookActivity = this.CurrentBookActivities.findOneByTypeAndPage(type, pageUrl);
            if (bookActivity) {
                var stages = this.ENV.teacher.activities[type];
                var reportStageExists = stages && this.lodash.some(stages, function (stage) { return stage === 'report'; });
                var resultsStage = reportStageExists ? 'report' : mode + "-results";
                var stage = !bookActivity.published ? previewStage : resultsStage;
                return this.go(type, stage, pageUrl, bookActivity.activityId);
            }
        }
        return this.go(type, previewStage, pageUrl);
    };
    ActivitiesRouter.prototype.go = function (type, stage, pageUrl, activityId) {
        return this.$state.go(type + '-' + stage, {
            activityId: activityId,
            classId: this.$state.params['classId'],
            pageUrl: pageUrl,
            isPlaying: false
        });
    };
    ActivitiesRouter.prototype.openPlay = function (type, activityId) {
        return this.$state.go(type + '-play', {
            activityId: activityId,
            classId: this.CurrentSession.getInfo().classId
        }, { force: true });
    };
    ActivitiesRouter.prototype.openTeachResults = function (currentActivity, classId) {
        var isPlaying = currentActivity.phase === 'play';
        return this.$state.go(currentActivity.type + "-teach-results", {
            activityId: currentActivity.id,
            classId: classId,
            isPlaying: isPlaying,
            disableSharing: !isPlaying
        }, {
            force: true,
            replace: !this.$state.includes('teach')
        });
    };
    ActivitiesRouter.prototype.openStudentResults = function (currentActivity) {
        return this.$state.go(currentActivity.type + "-student-results", {
            activityId: currentActivity.id
        }, {
            force: true,
            replace: !this.$state.includes('learn')
        });
    };
    ActivitiesRouter.prototype.updateCurrent = function (currentSession, isTeacher) {
        if (currentSession.currentActivity.phase === 'play' && !isTeacher) {
            return this.openPlay(currentSession.currentActivity.type, currentSession.currentActivity.id);
        }
        return isTeacher ?
            this.openTeachResults(currentSession.currentActivity, currentSession.classId) :
            this.openStudentResults(currentSession.currentActivity);
    };
    return ActivitiesRouter;
}());
exports.ActivitiesRouter = ActivitiesRouter;
//# sourceMappingURL=ActivitiesRouter.js.map