class AssessClosedQuestionController {
  questionService;
  question;
  immediateFeedback;

  /*@ngInject*/
  constructor(private CurrentSession, Utilities) {
    this.questionService = Utilities.getFactoryByName(`${this.question.type}Question`);
    this.questionService.initialize(this.question);
  }

  addAnswer() {
    this.questionService.addAnswer(this.question, {content: '', isNew: true});
  }

  isInSession() {
    return this.CurrentSession.isActive();
  }
}

export class AssessClosedQuestion {
  template = require('./../templates/assess-closed-question.html');
  controller = AssessClosedQuestionController;
  bindings : any = {
    question: '<',
    immediateFeedback: '<'
  };
}
