import { IBrowser } from '../../url/services/InAppBrowser';
import { CurrentBookActivities } from '../../books/services/CurrentBookActivities';
import { IStateServiceExtended } from '../../../3rdparty/common/decorators/StateDecorator';
import IQService = angular.IQService;
import { Activities } from './ActivitiesFactory';
import LoDashStatic = _.LoDashStatic;
import { CurrentSession } from '../../session/services/CurrentSession';
import { IDialogRouter } from '../../../3rdparty/common/layout/services/NgDialogRouter';

/*@ngInject*/
export class ActivitiesRouter {

  constructor(private ngDialogRouter: IDialogRouter, private Activities: Activities, private $state: IStateServiceExtended, private $q: IQService, private ENV,
    private CurrentBookActivities: CurrentBookActivities, private lodash: LoDashStatic,
    private InAppBrowser: IBrowser, private CurrentSession: CurrentSession) {

  }

  syncWith(currentSession, previousSession, isTeacher) {
    if (!currentSession.currentActivity) {
      if (previousSession && previousSession.currentActivity) {
        return this.$state.back(true);
      }

      return this.$q.resolve();
    }

    let previousActivityEmpty = !previousSession || !previousSession.currentActivity;
    let currentActivityUpdate = (previousActivityEmpty
      || !this.lodash.isEqual(previousSession.currentActivity, currentSession.currentActivity));

    if (currentActivityUpdate) {
      return this.updateCurrent(currentSession, isTeacher);
    }

    return this.$q.resolve();
  }

  sync(currentSession, isTeacher) {
    if (!currentSession.currentActivity && !isTeacher) {
      return this.$q.resolve();
    }
    if (!currentSession.currentActivity) {
      return this.$q.resolve();
    }

    return this.updateCurrent(currentSession, isTeacher);
  }

  unsubscribe() {
    this.lodash.each(this.ENV.teacher.activities, (stages, activity) => {
      this.Activities.unSubscribe(activity);
    });
  }

  subscribe(session) {
    
    this.lodash.each(this.ENV.teacher.activities, (stages, type) => {
      this.Activities.onPublished(type, (activity) => {
        session.currentActivity = { id: activity.id, type: type, phase: 'play' };
        this.openPlay(type, activity.id);
      });

      this.Activities.onShare(type, (activity) => {
        session.currentActivity = { id: activity.id, type: type, phase: 'results' };
        this.openStudentResults(session.currentActivity);
      });

      this.Activities.onFinish(type, () => {
        // The student might be in books or reader already only in assess
        // - this is the only activity that doesn't have a thank-you-page,
        // in case that the student submitted his assessment
        // before the teacher ended the assess he will be in reader \ books page.
        // ** this is just a temp solution until we will delete all the thank-you-pages **
        if (!this.$state.includes('learn')) {
          this.$state.back(true);
          this.ngDialogRouter.closeAll();
         
        } 
      });
    });

    // this.Activities.onFinish('url', this.InAppBrowser.close.bind(this.InAppBrowser));
  }

  open(type: string, mode, pageUrl?: string) {
    let previewStage = `${mode}-preview`;
    if (pageUrl) {
      let bookActivity = this.CurrentBookActivities.findOneByTypeAndPage(type, pageUrl);
      if (bookActivity) {
        let stages = this.ENV.teacher.activities[type];

        let reportStageExists = stages && this.lodash.some(stages, stage => stage === 'report');
        let resultsStage = reportStageExists ? 'report' : `${mode}-results`;

        let stage = !bookActivity.published ? previewStage : resultsStage;
        stage = type === "participant" ? previewStage : stage;
        return this.go(type, stage, pageUrl, bookActivity.activityId);
      }
    }

    return this.go(type, previewStage, pageUrl);
  }

  private go(type, stage, pageUrl?, activityId?) {
    
    return this.$state.go(type + '-' + stage, {
      activityId: activityId,
      classId: this.$state.params['classId'],
      pageUrl: pageUrl,
      isPlaying: false
    });
  }

  private openPlay(type, activityId) {
    return this.$state.go(type + '-play', {
      activityId: activityId,
      classId: this.CurrentSession.getInfo().classId
    },
      { force: true });
  }

  private openTeachResults(currentActivity, classId) {
    let isPlaying = currentActivity.phase === 'play';
    return this.$state.go(`${currentActivity.type}-teach-results`, {
      activityId: currentActivity.id,
      classId: classId,
      isPlaying: isPlaying,
      disableSharing: !isPlaying
    }, {
        force: true,
        replace: !this.$state.includes('teach')
      });
  }

  private openStudentResults(currentActivity) {
    this.ngDialogRouter.closeAll();
    return this.$state.go(`${currentActivity.type}-student-results`, {
      activityId: currentActivity.id
    }, {
        force: true,
        replace: !this.$state.includes('learn')
      });
  }

  private updateCurrent(currentSession, isTeacher) {
    if (currentSession.currentActivity.phase === 'play' && !isTeacher) {
      return this.openPlay(currentSession.currentActivity.type, currentSession.currentActivity.id);
    }

    return isTeacher ?
      this.openTeachResults(currentSession.currentActivity, currentSession.classId) :
      this.openStudentResults(currentSession.currentActivity);
  }
}
