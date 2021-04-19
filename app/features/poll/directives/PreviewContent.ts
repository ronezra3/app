class PollPreviewContentController {
  public isRequired;
  public activity;
  public form;

  /*@ngInject*/
  constructor(private PollValues, private Localytics) {
  }

  $onInit() {
    if (!this.activity.id) {
      this.activity.answers = [];
      for (var i = 0; i < this.PollValues.defaultAnswers; i++) {
        this.activity.answers.push({title: ''});
      }
    }
  }

  canDelete() {
    return this.activity.answers.length > this.PollValues.minAnswers;
  }

  canAddAnswers() {
    return this.activity.answers.length < this.PollValues.maxAnswers;
  }

  addAnswer() {
    this.Localytics.tagEvent('Poll Answer Added');
    return this.activity.answers.push({title: '', shouldFocus: true});
  }

  removeAnswerAt(answerIndex) {
    this.activity.answers.splice(answerIndex, 1);
  }
}

export class PollPreviewContent {
  controller = PollPreviewContentController;
  template = require('./../templates/preview-content.html');
  bindings : any = {
    isRequired: '<',
    form: '<',
    activity: '<'
  };
}
