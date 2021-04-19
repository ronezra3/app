import {ActivityTeachPreviewController} from '../../activities/controllers/ActivityTeachPreviewController';
export class AssessPreviewController extends ActivityTeachPreviewController {

  /*@ngInject*/
  constructor(activity) {
    super(activity);

    if (!this.activity.questions) {
      this.activity.questions = [];
    }
  }

  public getSpecificData() {
    return {
      questionsCount: this.activity.questions.length,
      immediateFeedbackEnabled: !!this.activity.immediateFeedback,
      timeLimit: this.activity.time
    };
  }
}
