class AssessPreviewContentController {
  public isRequired;
  public activity;
  public form;

  /*@ngInject*/
  constructor(private lodash) {
  }


  addQuestion(type) {
    this.activity.questions.push({type: type});
  }

  removeQuestion(question) {
    this.lodash.pull(this.activity.questions, question);
  }

  getQuestionIndex(question, index) {
    return question.index = index;
  }

  immediateFeedbackChanged(immediateFeedback) {
    this.activity.immediateFeedback = immediateFeedback;
  }

}

export class AssessPreviewContent {
  controller = AssessPreviewContentController;
  template = require('./../templates/preview-content.html');
  bindings : any = {
    isRequired: '<',
    form: '<',
    activity: '<'
  };
}
