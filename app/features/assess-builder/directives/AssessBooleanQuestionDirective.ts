class AssessBooleanQuestionController {
  question;

  /*@ngInject*/
  constructor(private CurrentSession) {
  }

  isInSession() {
    return this.CurrentSession.isActive();
  }
}

export class AssessBooleanQuestion {
  template = require('./../templates/assess-boolean-question.html');
  controller = AssessBooleanQuestionController;
  bindings : any = {
    question: '<',
    immediateFeedback: '<',
  };
}
